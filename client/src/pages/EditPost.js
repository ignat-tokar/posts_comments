import {useState, useEffect, useCallback} from 'react';
import {NavLink} from 'react-router-dom';

function EditPost(){

  const [form, setForm] = useState({
    title: '',
    description: ''
  });
  const [update, setUpdate] = useState(true);
  const [postId] = useState(
    document.location.pathname.split('/t/')[1]
  );

  const getFormForGroup = useCallback(async () => {
    const response = await fetch(`/api/posts`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const editingPost = data.filter(post => post._id === postId);
    setForm(editingPost[0]);
  }, [postId]);

  useEffect(()=>{
    if(update){
      getFormForGroup();
      setUpdate(false);
    }
  }, [update, getFormForGroup]);

  function inputHandler(event){
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function saveHandler(){
    const body = JSON.stringify({...form});
    await fetch(`/api/posts/edit/${postId}`,{
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
        <h2 className="card-title">Edit post "{form.title}"</h2>
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
            to={`/posts/detail/t/${postId}`}
            className="btn btn-primary mb-3"
            onClick={saveHandler}
            style={{marginRight: '2rem'}}
          >Save</NavLink>
          <NavLink
            to="/posts"
            className="btn btn-primary mb-3"
          >Cancel</NavLink>
        </div>           
      </div>
    </div>
  );
}

export default EditPost;