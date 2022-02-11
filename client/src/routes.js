import {Routes, Route, Navigate} from 'react-router-dom';

import ListOfPost from './pages/ListOfPost';
import CreatePost from './pages/CreatePost';
import DetailPost from './pages/DetailPost';
import EditPost from './pages/EditPost';

function useRoutes() {
  return (
    <Routes>
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="/posts/detail/t/*" element={<DetailPost />} />
      <Route path="/posts/edit/t/*" element={<EditPost />} />
      <Route path="/posts" element={<ListOfPost />} />
      <Route path="/*" element={<Navigate to="/posts" />} />
    </Routes>
  );
}

export default useRoutes;