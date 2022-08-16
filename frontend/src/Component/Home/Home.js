import React,{useState, useEffect} from 'react'
import { 
    Container,
    Grow,
    Grid
} from '@material-ui/core';


import { useDispatch } from "react-redux";

// import { getPosts } from "../../actions/posts";



function Home() {
    const [currentId, setCurrentId] = useState(null);
    // const styles = useStyles();
    const dispatch = useDispatch();


    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[currentId, dispatch]) 
 return (
    <h1>
        HOME PAGE
    </h1>
    // <Grow in>
    //     <Container>
    //         <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
    //             <Grid item xs={12} sm={4}>
    //                 {/* <Form currentId={currentId} setCurrentId={setCurrentId}/> */}
    //             </Grid>
    //             <Grid item xs={12} sm={7}>
    //                 {/* <Posts setCurrentId={setCurrentId} /> */}
    //             </Grid>
    //         </Grid>
    //     </Container>
    // </Grow>
  )
}

export default Home