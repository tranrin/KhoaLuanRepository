import { useState } from "react";
import Alert from '@mui/material/Alert';
import { useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const CommentForm = ({
  parentId = null,
  dataUseRef,
  dataComment,
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const connectionRef = useRef(dataUseRef);
  const sendMessage = (message) => {
    console.log(parentId,"parentId")
    console.log(dataUseRef,"dataUseRefvao")
    //console.log(message)
    if (dataUseRef._connectionState === "Connected") {
      console.log({  CongThucId:dataComment,
        Content: text,
        ParentId: null,
        UserId: null},"vao ket noi1")
      dataUseRef
        .invoke("SendOffersToUser",{  
          CongThucId:Number(dataComment),
          Content: text,
          ParentId: parentId,
          UserId: null})
        .then((data) => {console.log(data)})
        .catch((error) => {
          console.error("Failed to send message: ", error);
        });
    }
  };
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    if(localStorage.getItem('token')){
      event.preventDefault();
     // handleSubmit('a');

      const message = {
        CongThucId:dataComment,
        Content: text,
        ParentId: null,
        UserId: null
      };
      console.log(message)
      sendMessage(message)

    }else{
      event.preventDefault();
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      
    }
  
    setText("");
  };
   return (  
 
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button> 
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  
 
  )
 
};

export default CommentForm;
