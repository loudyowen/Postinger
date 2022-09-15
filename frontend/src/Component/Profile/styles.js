import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
        '& .MuiInputLabel-outlined': {
          color: 'white'
        }
      },
    container: {
      alignItems: 'center'
    },
    paper: {
      width: '90%',
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      margin: 'auto',
      padding: theme.spacing(2),
      textAlign: 'center'
    },
    filebase: {
        padding: '15%'
      },
    Input: {
      color: 'white'
    }
}))