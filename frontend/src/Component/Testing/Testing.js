import React, {useState} from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import imagess from '../../Asset/pexels-stein-egil-liland-3408744.jpg'
import { postStatus } from '../../Actions/postAction'
import {useDispatch} from 'react-redux'
import { Button } from '@material-ui/core';



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
    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        //   console.log(reader.result);
        setPostData({ ...postData,postImage: reader.result })
        };
        reader.onerror = function (error) {
        console.log('Error: ', error);
        };
    }

    const handleDrop = (dropped) => {
        console.log(dropped)
        getBase64(dropped[0])
    }
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
             <Dropzone
                onDrop={handleDrop}
                noClick
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
            <Button type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
        </form>
    )
  }

export default MyEditor

