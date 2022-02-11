import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

function ListOfPost(){

  const [update, setUpdate] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(()=>{
    if(update){
      getListOfPost();
      setUpdate(false);
    }
  }, [update]);

  async function getListOfPost(){
    const response = await fetch('api/posts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    await setPosts(data);
  }

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
        <h2 className="card-title">List of Posts</h2>    
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Link</th>
              <th scope="col">Upvotes</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.map((post, index)=>{
              return (
                <tr key={post._id}>
                  <th scope="row">{++index}</th>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td><a href={post.link}>{post.title}</a></td>
                  <td>{post.upvotes || "None"}</td>
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
              );
            })}
          </tbody>
        </table>
        <NavLink
          to="/posts/create"
          className="btn btn-primary mb-3"
        >Create new post</NavLink>
      </div>
    </div>
  );
}

export default ListOfPost;