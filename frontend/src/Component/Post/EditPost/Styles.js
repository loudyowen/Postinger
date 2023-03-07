import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
    input: {
        color: 'white'
    },
    // box: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: '60vw',
    //     maxHeight: '75vh',
    //     bgcolor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     overflowY: 'scroll'
    // },
    submit: {
        bottom: '0',
        position: 'sticky !important'
    },
    dropZone:{
        justifyContent: 'center',
        display: 'flex'
    },
    dropZoneOverlay:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none' ,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
}))

export default useStyles