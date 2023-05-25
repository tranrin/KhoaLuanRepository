import { Height } from "@material-ui/icons";
import CommentForm from "./CommentForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StyledEngineProvider } from '@mui/material/styles';

const Comment = ({
  dataComment,
  loadComment,
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId ,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.ID;
  const createdAt = new Date(comment.dateCreate).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        {comment.image ? <img style={{
          width:"50px",
          height:"50px",
          borderRadius:"50%"

        }} src={process.env.REACT_APP_URI_Local + comment.image}></img> :    <AccountCircleIcon  /> }
    
     
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.screenName}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.content}</div>}
        {isEditing && (
          <CommentForm
          parentId={parentId}
          dataComment={dataComment}
          dataUseRef={loadComment}
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }>
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }>
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
          parentId={parentId}
          dataComment={dataComment}
          dataUseRef={loadComment}

            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={parentId}
                replies={[]}
                currentUserId={currentUserId}
                dataComment={dataComment}
                loadComment ={loadComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
