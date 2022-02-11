import {useState, useEffect, useCallback} from 'react';
import {NavLink} from 'react-router-dom';

import AddNewComment from './AddNewComment';

function ListOfComment(){

  const [comments, setComments] = useState(null);
  const [update, setUpdate] = useState(true);
  const [postId] = useState(
    document.location.pathname.split('/t/')[1]
  );

  const getListOfComment = useCallback(async ()=>{
    const response = await fetch('/api/comments',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const comments = data.filter(comment => comment.postId === postId);
    setComments(comments);
  },[postId]);

  useEffect(()=>{
    if(update){
      getListOfComment();
      setUpdate(false);
    }
  },[update, getListOfComment]);

  async function deleteHandler(event){
    setUpdate(true);
    await fetch(`/api/comments/delete/${event.target.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">List of comments</h2>    
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Author</th>
                <th scope="col">Text</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.map((comment, index)=>{
                return (
                  <tr key={comment._id}>
                    <th scope="row">{++index}</th>
                    <td>{comment.author}</td>
                    <td>{comment.content}</td>
                    <td>{
                      comment.date.split('T')[1].split(':')[0] + ':' +
                      comment.date.split('T')[1].split(':')[1] + ' (' +
                      comment.date.split('T')[0] + ')'
                    }</td>
                    <td>
                      <NavLink
                        to={`/posts/detail/t/${postId}`}
                        className="btn btn-primary mb-3"
                        id={comment._id}
                        onClick={deleteHandler}                 
                      >Delete</NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>      
        </div>
      </div>
      <AddNewComment setUpdate={setUpdate} />
    </>
  );
}

export default ListOfComment;