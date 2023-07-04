import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../style/card.css"
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
<div >
     <ul> {userProfiles.map((userProfile) => (
              <li key={userProfile._id}>
                {console.log(userProfile.profileImg)}
<div className="card">
  
      <div className="card-image">
        <img src={userProfile.profileImg} alt="Card" />
        {/* <img src="https://www.pexels.com/search/desktop%20backgrounds/"></img> */}
      </div>
      <div className="card-content">
        <h3 className="card-title">{userProfile.title}</h3>
        <p className="card-description">{userProfile.desc}</p>
        <a href={userProfile.githublink}>Site Link</a>
      </div>
    </div>
    </li>
        ))}
        </ul>
    </div>
    
  );
};


export default Project;