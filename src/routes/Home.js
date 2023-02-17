import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Home() {
  return (
    <div>
      Welcome to the world of Geeks! <Link to="/blog">Blog</Link>
      <Button>hello</Button>
      <Button variant="warning">Warning</Button>{' '}
    </div>
  );
}

export default Home;
