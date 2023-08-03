import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './files-upload-component.css';

const DomainUpload = () => {
    const [domainImg, setDomainImg] = useState('');
    const [title, setTitle] = useState('');

    const onFileChange = (e) => {
        setDomainImg(e.target.files[0]);
    };

    useEffect(() => {
      console.log("Profile : " + domainImg);
    }, [domainImg]);


    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('DomainImg', domainImg);
        console.log("***" + domainImg);
        formData.append('title', title);
        axios.post("http://localhost:4000/dapi/domainpost", formData, {}).then(res => {
            console.log(res);
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Domain Upload</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="domainImg">Image</label>
                                    <input type="file" className="form-control-file" id="domainImg" onChange={onFileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={title} onChange={onTitleChange} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomainUpload;
