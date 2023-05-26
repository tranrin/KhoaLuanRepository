import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useRef } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../api/api";
import { getCommentRecipe } from "../../api/recipe.api";
import { Typography } from "@mui/material";

const Comments = ({ commentsUrl, currentUserId, CongThucId }) => {
  const connectionRef = useRef(null);
  const token = localStorage.getItem("token");
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments;
  const [loadComments, setLoadComments] = useState(null)
  // .filter(
  //   (backendComment) => backendComment.parentId === null,
  // );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentID === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  const addComment = (text, parentId, congThucId, UserId) => {
    //   if (!parentId) {
    //     // Nếu comment không có parentId, đây là comment cha.
    //     // Hiển thị comment cha trong phần tử HTML tương ứng với bài viết.
    //     const commentElement = createCommentElement(comment);
    //     const postCommentsElement = document.getElementById(`post-${comment.postId}-comments`);
    //     postCommentsElement.appendChild(commentElement);
    // } else {
    //     // Nếu comment có parentId, đây là comment con.
    //     // Xác định group tương ứng với comment con, và hiển thị comment con trong phần tử HTML tương ứng với comment cha.
    //     const commentElement = createCommentElement(comment);
    //     const parentCommentElement = document.getElementById(`comment-${comment.postId}-${comment.parentId}`);
    //     const parentCommentRepliesElement = parentCommentElement.querySelector(".comment-replies");
    //     parentCommentRepliesElement.appendChild(commentElement);
    // }
    //
    console.log(text, "value comment");
    // sendMessage({
    //  text: text,
    //  parentId: parentId,
    //  congThucId: congThucId,
    //  UserId: UserId
    // })
    createCommentApi(text, parentId).then((comment) => {
      // setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
  function createCommentElement(comment) {
    // Tạo phần tử HTML cho comment.
    const commentElement = document.createElement("div");
    commentElement.id = `comment-${comment.postId}-${comment.id}`;
    commentElement.className = "comment";
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-name">${comment.name}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <div class="comment-body">
            <p class="comment-message">${comment.message}</p>
        </div>
    `;

    return commentElement;
  }

  const handleSendMessage = () => {
    const message = {
      CongThucId:CongThucId,
      Content: "check comment",
      ParentId: null,
    }; // Your message content
    console.log("handleSendMessage");
  //  sendMessage(message);
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId,
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    console.log(token, "token");
    connectionRef.current = new HubConnectionBuilder()
      .withUrl(
        process.env.REACT_APP_URI_Local + "CommentChat",
        {
          //skipNegotiation: true,
          accessTokenFactory: () => {
            return token;
          },
        },

        //accessTokenFactory: () => token,
        // {
        //     headers: {
        //       'Authorization': `Bearer ${token}`
        //     }
        //   }
      )
      .build();

    connectionRef.current
      .start()
      .then((mesage) => {
        console.log(mesage, "Connected to SignalR server");
        // Perform any additional setup or event subscriptions here
      })
      .catch((error) => {
        console.error("Failed to connect to SignalR server: ", error);
      });
    connectionRef.current.on("ReceiveMessage", (data) => {
      setLoadComments(data);
      // Gọi hàm xử lý sự kiện truyền vào từ props
      let dataMessage = data;
      console.log(dataMessage, "dataMessage");
      // addComment(
      //   dataMessage.content,
      //   dataMessage.parentId,
      //   dataMessage.idCongThuc,
      //   dataMessage.idUser,
      // );

      console.log(data, "sended message");
    });

    return () => {
      connectionRef.current.stop(); // Clean up the connection when the component unmounts
    };
  }, [token]);


  useEffect(() => {
    console.log(CongThucId);
    getCommentRecipe(CongThucId).then((data) => {
      console.log(data.data, "data");
      setBackendComments(data.data);
    });
  }, [loadComments]);

  return (
    <div className="comments">
      {
(localStorage.getItem("token")) ?      <div>
<h3 className="comments-title">Comments</h3>
<div className="comment-form-title">Write comment</div>
<CommentForm submitLabel="Write"  dataComment={CongThucId} dataUseRef={connectionRef.current}/>
</div>  :
  <Typography color="#f42f2f" variant="h6" component="h2">
You must login to Comment
</Typography>
      }
       
   
     
      <div className="comments-container">
        {backendComments.map((rootComment) => {

        if(rootComment.parentID == 0)
      {    return(
          <Comment
           dataComment={CongThucId}
            loadComment ={connectionRef.current}
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            parentId={rootComment.id}
          />)}
          })}
      </div>
    </div>
  );
};

export default Comments;
