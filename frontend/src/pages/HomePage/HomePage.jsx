import React from 'react';
import Post from '../Post/Post.jsx';
import './HomePage.css'; // Assuming the CSS file for styling
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate() ; 
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1>MemoriesApp</h1>
        </div>
        <div className="nav-links">
          <a>Home</a>
          <a href="#">About</a>
        </div>
        <div className="profile">
          <span onClick={() => {
            navigate("/profile")
          }}>Username</span>
        </div>
      </nav>
      <Post />
    </div>
  );
}

export default HomePage;
