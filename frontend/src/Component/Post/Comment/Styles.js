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
    // box: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: '60vw',
    //     height: '75vh',
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    // }
}))