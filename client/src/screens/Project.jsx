import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Project = (props) => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/api/user-profiles') 
      .then((res) => {
        const userProfiles = res.data;
        setUserProfiles(userProfiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
   

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {userProfiles.map((userProfile) => (
          <li key={userProfile._id}>
            {console.log(userProfile.profileImg)}
            <img src={userProfile.profileImg} alt={userProfile.title} />
            <h3>{userProfile.title}</h3>
            <p>{userProfile.desc}</p>
            <a href={userProfile.githublink}>Site Link</a>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;

