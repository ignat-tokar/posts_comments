import {useState} from 'react';
import {NavLink} from 'react-router-dom';

function CreatePost() {

  const [form, setForm] = useState({
    title: '',
    description: ''
  });

  function inputHandler(event){
    setForm({
      ...form,
      [event.target.name]: [event.target.value]
    })
  }

  async function createHandler(event){

    const body = JSON.stringify({...form});

    await fetch('/api/posts/create', {
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
        <h2 className="card-title">Creating new Post</h2>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
          >Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Please enter a title of post here"
            name="title"
            value={form.title}
            onChange={inputHandler}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
          >Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={form.description}
            onChange={inputHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <NavLink
            to="/posts"
            className="btn btn-primary mb-3"
            onClick={createHandler}
            style={{marginRight: '2rem'}}
          >Create</NavLink>
          <NavLink
            to="/posts"
            className="btn btn-primary mb-3"
          >Cancel</NavLink>
        </div>           
      </div>
    </div>
  );
}

export default CreatePost;