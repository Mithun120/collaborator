import axios from 'axios';
import { useEffect, useState } from 'react';
import Contact from './Contact';
import { NavLink } from 'react-router-dom';
const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/blog/blogget');
      setBlogs(response.data);
      // console.log(blogs)
    } catch (error) {
      console.error(error);
    }
  }; 

  return (<>
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.blogTitle}</h3>
          <p>{blog.blogDesc}</p>
          <img src={blog.blogImg} />
          {/* <p>Posted at: {new Date(blog.timestamp).toLocaleString()}</p> */}
          <p>Posted at: {new Date(blog.timestamp).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      ))}
    </div>
    <div>
      Looking for vox Solution ? 
      <NavLink to="/contact">Contact</NavLink>
    </div>
    </>
  );
};

export default Blog;
