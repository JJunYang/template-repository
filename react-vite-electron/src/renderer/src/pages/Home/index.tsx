import React from 'react';
import { Outlet } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <div id="sidebar">
        <h1>React Router</h1>
        <a href={`/sub`}>Sub</a>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
