import {useState} from 'react';
import {NavLink} from 'react-router-dom';

function AddNewComment(setUpdate){

  const [form, setForm] = useState({
    author: '',
    content: ''
  });
  const [postId] = useState(
    document.location.pathname.split('/t/')[1]
  );

  function inputHandler(event){
    setForm({
      ...form,
      [event.target.name]: [event.target.value]
    });
  }

  async function addHandler(){
    const postId = document.location.pathname.split('/t/')[1];
    const body = JSON.stringify({...form, postId: postId});
    setUpdate.setUpdate(true);
    await fetch('/api/comments',{
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" style={{marginBottom: '0.5rem'}}>New comment</h5>
        <div className="mb-3">
          <label
            htmlFor="author"
            className="form-label"
          >Author name:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Please enter a name of author here"
            name="author"
            value={form.author}
            onChange={inputHandler}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="content"
            className="form-label"
          >Text of comment:</label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            name="content"
            value={form.content}
            onChange={inputHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <NavLink
            to={`/posts/detail/t/${postId}`}
            className="btn btn-primary mb-3"
            onClick={addHandler}
            style={{marginRight: '2rem'}}
          >Add</NavLink>
        </div>           
      </div>
    </div>
  );
}

export default AddNewComment;