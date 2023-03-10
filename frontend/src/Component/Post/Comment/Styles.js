import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    input: {
        color: 'white'
    },
    info: {
        position: 'absolute',
        color: 'white',
        textAlign: 'center',
        fontSize: '2rem !important',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    imageCommentSm: {
        height: '75vh', 
        maxWidth: '100%'
    },
    imageCommentXs: {
        height: '40vh', 
        maxWidth: '100%'
    }
}))