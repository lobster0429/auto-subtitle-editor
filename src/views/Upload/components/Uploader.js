import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiUploadCloud, FiLoader} from 'react-icons/fi';

const Styled = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.gray[1]};
  }
  form {
    box-sizing: border-box;
    width: 85%;
    padding: 0 6rem;
  }
  .note {
    font-weight: 600;
    margin-bottom: .25rem;
    color: ${props => props.theme.colors.gray[4]};
  }
  .uploader {
    display: flex;
  }
  .url {
    margin-right: .25rem;
    flex: 0 0 calc(100% - 8rem);
  }
  .button {
    flex: 0 0 8rem;
  } 
`

export default function Uploader(props) {
  const p = (props.isProcessing !== null && !props.isProcessing);
  const [disabled, setDisabled] = useState(p);
  const [url, setUrl] = useState('');
  const api = `${process.env.REACT_APP_API_DOMAIN}/post_youtube`;

  useEffect(() => {
    const p = (props.isProcessing !== null && !props.isProcessing);
    setDisabled(p);
    if (!p) setUrl('');
  }, [props.isProcessing])

  function submit(evt) {
    evt.preventDefault();
    if (url === '') return false;
    setDisabled(true);
    const req = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'accessToken': props.token
        },
        body: JSON.stringify({url: url})
    };

    fetch(api, req)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'ok') {
          props.onUploaded({
            title: data.title,
            id: data.doc_id,
            completed: 0,
            total: 0,
            done: false,
          })
        }
      })
      .catch(e => {
        setDisabled(false);
      })
  }

  function changeURL(evt) {
    setUrl(evt.target.value);
  }

  return (
    <Styled id="uploader">
      <form onSubmit = {submit}>
        <p className="note">Just a single step</p>
        <div className="uploader">
          <input disabled={disabled} placeholder="Paste your Youtube video URL right here." className="url" type="text" value={ url } onChange={ changeURL }/>
          <button disabled={disabled} className="button _primary" type="submit">
            { 
              (disabled) 
                ? <><FiLoader className="icon _spinner"/>Processing...</> 
                : <><FiUploadCloud className="icon"/>Upload URL</> 
            }
          </button>
        </div>
      </form>
    </Styled>
  )
}