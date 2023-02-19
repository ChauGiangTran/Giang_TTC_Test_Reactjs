import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Home from './routes/Home';
import Blog from './routes/Blog';
const CreateBlog = lazy(() => import('./routes/CreateBlog'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/blog/:id" element={<Blog />}></Route>
          <Route exact path="/create_blog" element={<CreateBlog />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
