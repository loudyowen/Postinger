import React, {useState} from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import imagess from '../../Asset/pexels-stein-egil-liland-3408744.jpg'
import { postStatus } from '../../Actions/postAction'
import {useDispatch} from 'react-redux'
import { Button } from '@material-ui/core';
import Resizer from "react-image-file-resizer";





function MyEditor() {
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        postText: 'for testing purposes',
        postImage: imagess
    })


    const user = JSON.parse(localStorage.getItem('profile'))
    const uId = user.userData.id
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(postStatus({...postData,uId}))
    }
    // const getBase64 = (file) => {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //     //   console.log(reader.result);
    //     setPostData({ ...postData,postImage: reader.result })
    //     };
    //     reader.onerror = function (error) {
    //     console.log('Error: ', error);
    //     };
    // }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

    // const onChange = async (event) => {
    //     try {
    //       const file = event.target.files[0];
    //       const image = await resizeFile(file);
    //       console.log(image);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    const handleDrop = async (dropped) => {
        try {
            // const file = dropped.target.files[0];
            console.log(dropped)
            const file = dropped[0]
            const image = await resizeFile(file);
            console.log(image);
          } catch (err) {
            console.log(err);
          }
    }
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
             <Dropzone
                onDrop={handleDrop}

                // noClick
                noKeyboard
                style={{ width: '250px', height: '250px' }}
                >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                    <AvatarEditor width={250} height={250} image={postData.postImage} />
                    <input {...getInputProps()} />
                </div>
                )}
            </Dropzone>
            {/* <Button type='submit' color='primary' variant="contained" fullWidth>Submit</Button> */}
        </form>
    )
  }

export default MyEditor

