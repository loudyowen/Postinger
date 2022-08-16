import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
    container: {
      alignItems: 'center'
    },
    paper: {
        width: '50%',
        height: '70%',
        margin: 'auto',
        padding: theme.spacing(2)
    },
    form: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
      },
}))