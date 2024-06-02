import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import { UserContext } from '../../../UserContext.jsx';
import axiosInstance from '../../axios';
import './Post.css' ; 

const BackendURL = 'http://localhost:5000';  // Replace with the actual backend URL

const  Post = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [picturePath, setPicturePath] = useState();
  const [images, setImages] = useState([]);
  const locate = useLocation() ; 
  const [currentUser , setCurrentUser] = useState('') ; 

  const route = locate.pathname.split('/')[1] ; 

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('description', description);
      formData.append('picturePath', picturePath); // Append the file object
  
      const response = await axiosInstance().post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' ,// Ensure proper content type for file upload
        }
      });
      if (response) {
        console.log("Image uploaded successfully");
        fetchImages() ;
        setLocation('') ;
        setDescription('') ;
        setPicturePath() ;
      } else {
        console.log("Error uploading image");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  const handleDelete = async(post_id) => {
    try {
      const deletepost = await axiosInstance().delete(`/delete-post/${post_id}`) ;

      if(deletepost){
        console.log("Post deleted successfully") ;
        fetchImages() ; 
      }
      else{
        console.log("Error deleting post") ;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const fetchImages = async () => {
    try {
      let response = null;
      if (route === 'profile') {
        response = await axiosInstance().get(`/get-userspost`);
      } else {
        response = await axiosInstance().get(`/get-posts`);
      }
      setImages(response.data.posts);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('CurrentUsername'); 
    setCurrentUser(userFromLocalStorage);

    fetchImages();
  }, [locate.pathname]);

  return (
    <div>
      <div className='formContainer'>
      <h1 style={{fontFamily: 'sans-serif' , marginRight: 75}}>Whats on your mind </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      <input
        type="file"
        placeholder="PicturePath"
        accept='file'
        onChange={(e) => setPicturePath(e.target.files[0])} // Updated to capture file data
      />
        <button style={{backgroundColor : '#1b1b1b' , fontWeight : 'bolder', fontFamily: 'sans-serif'}} type="submit">Post</button>
      </form>
      </div>

      <div className='imagesContainer'>
        
        {images.length > 0 ? 
            images.map((image , index) => (
            <div className='imageContainer' key={index}>
              <div style={{justifyContent : 'space-between' , display: 'flex'}}>
              <p><span style={{ fontWeight: 'bold' }}>Name : </span>{image.username}</p>
              {currentUser === image.username && <button onClick={() => {
                  handleDelete(image._id) ; 
                }}>Delete Post</button>}
              </div>
                <img className='images' src={`${BackendURL}/assets/${image.picturePath}`} alt={image.name} />
                <p><span style={{ fontWeight: 'bold' }}>Location:</span> {image.location}</p>
                <p><span style={{ fontWeight: 'bold' }}>Description:</span> {image.description}</p>
            </div>
            )) :
            <p>No images uploaded</p>
        }
        </div>
    </div>
  );
}

export default Post;
