import { useState, useEffect } from "react";
import { db } from "firebase";
import { query, collection, onSnapshot, where } from "firebase/firestore"
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from 'react-icons/fi';

const Style = styled.div`
  & {
    background-color: ${props => props.theme.colors.gray[0]};
    padding: 1rem;
    color: ${props => props.theme.colors.white};
    box-shadow: inset 0 0 2.5rem rgba(0, 0, 0, .3);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .task {
    & {
      background-color: ${props => props.theme.colors.gray[1]};
      border-radius: ${props => props.theme.rounded.lg};
      padding: 1rem;
      box-shadow: 0px 1rem 1rem hsla(0, 0%, 9%, 1); 
      margin-bottom: 1rem;
    }
    dt {
      font-weight: 600;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 3em;
      margin-bottom: 1em; 
    }
    dd {
      & {
        display: flex;
        justify-content: space-between;
      }
      .status {
        color: ${props => props.theme.colors.gray[2]};
        .icon {
          display: inline-block;
          color: ${props => props.theme.colors.cyan[1]};
          font-size: 112%;
          margin-right: .3em;
          vertical-align: middle;
        }
      }
    }
  }
`;

function TaskFn(props) {
  const downloadSRT = evt => {
    evt.preventDefault();
    if (props.taskId) {
      const api = `${process.env.REACT_APP_API_DOMAIN}/download_subtitle/${props.taskId}`  
      const req = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'accessToken': props.token
          },
      };

      fetch(api, req)
        .then(res => res.text()
        )
        .then(data => {
          const filename = `${props.taskId}.srt`;
          const file = new Blob([data], {type: 'text/plain;charset=utf-8'});
          if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
          else {
            const $a = document.createElement("a"),
            url = URL.createObjectURL(file);
            $a.href = url;
            $a.download = filename;
            $a.click();
          }
        }).catch(e => console.log(e))
    }
  }
  return (
    <div className="fn">
      {/* 
      <Link 
        to="/editor" 
        state={{taskId: props.taskId}} 
        style={{marginRight: '.5rem'}}>Edit</Link>
      */}
      <a onClick={downloadSRT}>Download</a> 
    </div>
  )
}

export default function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const user = props.user;

  useEffect(() => {
    if (user && user.uid) {
      const q = query(collection(db, 'subtitles'), where('user_id', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let subArr = [];
        let existIds = [];
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        querySnapshot.forEach(doc => {
          const createTime = doc._document.createTime.timestamp.seconds
          const data = doc.data();
          const completed = Object.keys(data.subtitle_maps).length;
          const total = data.task_count;
          const done = (completed === total)
          subArr.push({
            createTime,
            completed,
            total,
            done,
            ...data,
            id: doc.id
          });
          existIds.push(doc.id);
        })
        subArr = subArr.sort((a, b) => b.createTime - a.createTime)
        //如果資料庫尚未有最新上傳的一筆資料，於任務佇列植入假 placeholder
        if (props.placeholder) {
          if (!existIds.includes(props.placeholder.id)) {
            subArr.unshift(props.placeholder);
            props.onProcessing(false);
          }else{
            props.onProcessing(true);
          }
        }else {
          props.onProcessing(null);
        }
        setTasks(subArr);
      });
      return () => {unsubscribe()};
    }
  }, [tasks])

  return (
    <Style id="tasks">
      { tasks.map(task => {
        return (
          <dl className="task" key={task.id}>
            <dt>{task.title}</dt>
            <dd>
              { 
                (!task.done) 
                ? <div className="status"><FiLoader className="icon _spinner"/>processing... ({task.completed.toString()}/{task.total.toString()})</div>
                : <TaskFn taskId={task.id} token={user.accessToken}/> 
              }
            </dd>
          </dl>
        )
      }) } 
    </Style> 
  )
}