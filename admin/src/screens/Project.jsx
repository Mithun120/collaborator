import React from 'react'
import { useState } from 'react';
import FilesUploadComponent from '../Data/files-upload-component';
import Fileupdate from "../Data/fileupdate"
import UserProfileList from "../Data/UserProfileList"
const Project = () => {
  const [option, setOption] = useState(0);
  const [profile, setProfile] = useState({});
  return (
    <>
    <div className="App">
      {(option === 0) ? <FilesUploadComponent /> : <Fileupdate profile={profile} setOption={setOption} />}
      <UserProfileList setOption={setOption} setProfile={setProfile} />
    </div>
    </>
  )
}

export default Project