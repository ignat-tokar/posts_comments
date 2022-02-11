import {useState, useEffect, useCallback} from 'react';
import {NavLink} from 'react-router-dom';

import ListOfComment from '../components/ListOfComment';

function DetailPost(){

  const [post, setPost] = useState(null);
  const [update, setUpdate] = useState(true);
  const [postId] = useState(document.location.pathname.split('/t/')[1]);

  const getDataOfPost = useCallback (async ()=>{
    const response = await fetch('/api/posts',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const post = data.filter(post => post._id === postId);
    setPost(post[0]);
  }, [postId]);

  useEffect(()=>{
    if(update){
      getDataOfPost();
      setUpdate(false);
    }
  }, [update, getDataOfPost]);

  async function deleteHandler(event){
    setUpdate(true);
    await fetch(`/api/posts/delete/${event.target.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }  

  async function upvoteHandler(event){
    setUpdate(true);
    await fetch(`/api/posts/upvote/${event.target.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{post && post.title}</h2>
        <NavLink
          to="/posts"
          className="btn btn-primary mb-3"
        >Back to all posts</NavLink>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Link</th>
              <th scope="col">Upvotes</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {post && 
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td><a href={post.link}>{post.title}</a></td>
                <td>{post.upvotes}</td>
                <td>{
                  post.date.split('T')[1].split(':')[0] + ':' +
                  post.date.split('T')[1].split(':')[1] + ' (' +
                  post.date.split('T')[0] + ')'
                }</td>
                <td>
                  <button
                    id={post._id}
                    className="btn btn-primary mb-3"
                    onClick={upvoteHandler}
                    style={{marginRight: '1rem'}}             
                  >Upvote</button>                
                  <NavLink
                    to={`/posts/edit/t/${post._id}`}
                    className="btn btn-primary mb-3"
                    style={{marginRight: '1rem'}}             
                  >Edit</NavLink>
                  <NavLink
                    to="/posts"
                    className="btn btn-primary mb-3"
                    id={post._id}
                    onClick={deleteHandler}                 
                  >Delete</NavLink>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <ListOfComment />
      </div>
    </div>
  );
}

export default DetailPost;