import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './userlist.css';

const UserProfileList = (props) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const {setOption, setProfile}=props

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

  const handleDelete = (userId) => {
    const updatedProfiles = userProfiles.filter(
      (profile) => profile._id !== userId
    );
    setUserProfiles(updatedProfiles);
    axios
      .delete(`http://localhost:4000/api/${userId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handleUpdate = (userProfile) => {

    // axios
    //   .put(`http://localhost:4000/api/${userId}`, {
    //     profileImg: "new-profile-img",
    //     title: "new-title",
    //     desc: "new-desc",
    //     githublink: "new-github-link"
    //   }) 
    //   .then((response) => {
    //     console.log(response.data.message);
    //     const updatedProfiles = userProfiles.map((profile) => {
    //       if (profile._id === userId) {
    //         return {
    //           ...profile,
    //           profileImg: "new-profile-img",
    //           title: "new-title",
    //           desc: "new-desc",
    //           githublink: "new-github-link"
    //         };
    //       }
    //       return profile;
    //     });
        // setUserProfiles(updatedProfiles);
        setOption(1);
        setProfile(userProfile);
      // })
      // .catch((error) => {
      //   console.log(error.response.data.error);
      // });
  }; 
    

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
            <a href={userProfile.githublink}>Github Link</a>
            <div className="button-container">
              <button className="update-button" onClick={() => handleUpdate(userProfile)}>
                Update
              </button>
              <button className="delete-button" onClick={() => handleDelete(userProfile._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileList