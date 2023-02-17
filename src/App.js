import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const Home = lazy(() => import('./routes/Home'));
const Blog = lazy(() => import('./routes/Blog'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/blog" element={<Blog />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
