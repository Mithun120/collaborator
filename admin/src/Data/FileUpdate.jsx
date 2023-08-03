import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './files-upload-component.css';

const Fileupdate = (props) => {
    const [profileImg, setProfileImg] = useState(props.profile.profileImg);
    const [title, setTitle] = useState(props.profile.title);
    const [desc, setDesc] = useState(props.profile.desc);
    const [githublink, setGithubLink] = useState(props.profile.githublink);

    // const onFileChange = (e) => {
    //   console.log(e.target.files[0]);
    //     setProfileImg(e.target.files[0]);
    //     console.log(profileImg+"***");
    // };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      console.log(file.name);
      setProfileImg(file);
    };
    
    useEffect(() => {
      console.log("Profile : "+profileImg);
    }, [profileImg]);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onDescChange = (e) => {
        setDesc(e.target.value);
    };

    const onGithubLinkChange = (e) => {
        setGithubLink(e.target.value);
    };

    const handleUpdate = async (event) => {
      // event.preventDefault();
      console.log(props.profile);
      try {
        const formData = new FormData();
        formData.append("profileImg", profileImg);
        console.log("***" + profileImg);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("githublink", githublink);
        const response = await axios.put(
          `http://localhost:4000/api/${props.profile._id}`,
          formData,
          {}
        );
        console.log("Response"+response.data.message);
        const updatedProfiles = userProfiles.map((profile) => {
          if (profile._id === props.profile._id) {
            return {
              ...profile,
              profileImg: profileImg ? URL.createObjectURL(profileImg) : null,
              title: title,
              desc: desc,
              githublink: githublink,
            };
          }
          return profile;
        });
        // setUserProfiles(updatedProfiles);
        props.setOption(0);
      } catch (error) {
        console.log(
          error.response?.data?.error ||
            error.message ||
            "An error occurred while updating the profile"
        );
      }
    };

    

    return (
        <div className="container">
            <div className="container-fluid row justify-content-center px-0">
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <legend>Image</legend>
                        <input type="file" onChange={onFileChange} />
                        <legend>Title</legend>
                        <input type="text" className="border border-dark rounded p-3" name="title" value={title} onChange={onTitleChange} />
                        <legend>Description</legend>
                        <input type="text" className="border border-dark rounded p-3" name="desc" value={desc} onChange={onDescChange} />
                        <legend>Github Link</legend>
                        <input type="url" className="border border-dark rounded p-3" name="githublink" value={githublink} onChange={onGithubLinkChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Fileupdate;
