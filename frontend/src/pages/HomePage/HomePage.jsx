import React from 'react';
import Post from '../Post/Post.jsx';
import './HomePage.css'; // Assuming the CSS file for styling
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate() ; 
  const name = localStorage.getItem('currentUser') ;  
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <h1>MemoriesApp</h1>
        </div>
        <div className="nav-links">
          <span onClick={() => {
            navigate('/dashboard') ; 
          }}>Home</span>
          <span>About</span>
        </div>
        <div className="profile">
          <span style={{}} onClick={() => {
            navigate("/profile")
          }}>{name}</span>
          <button onClick={ () => {
            navigate("/") ; 
          }}>Logout</button>
        </div>
      </nav>
      <Post />
    </div>
  );
}

export default HomePage;
