import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilesUploadComponent = () => {
  const [profileImg, setProfileImg] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [githublink, setGithubLink] = useState('');

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  useEffect(() => {
    console.log('Profile : ' + profileImg);
  }, [profileImg]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescChange = (e) => {
    setDesc(e.target.value);
  };

  const onGithubLinkChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.startsWith('https://github.com/')) {
      setGithubLink(inputValue);
    } else {
      alert('Enter Github URL');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImg', profileImg);
    console.log('***' + profileImg);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('githublink', githublink);
    axios.post('http://localhost:4000/api/user-profile', formData, {}).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Project Upload</h1>
      <div className="container-fluid row justify-content-center px-0">
        <form onSubmit={onSubmit} className="col-md-6">
          <div className="form-group">
            <legend>Image</legend>
            <input type="file" onChange={onFileChange} />
            <legend>Title</legend>
            <input
              type="text"
              className="border border-dark rounded p-3"
              name="title"
              value={title}
              onChange={onTitleChange}
            />
            <legend>Description</legend>
            <input
              type="text"
              className="border border-dark rounded p-3"
              name="desc"
              value={desc}
              onChange={onDescChange}
            />
            <legend>Github Link</legend>
            <input
              type="url"
              className="border border-dark rounded p-3"
              name="githublink"
              value={githublink}
              onChange={onGithubLinkChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilesUploadComponent;
