import { makeStyles } from "@material-ui/core/styles";
import { padding } from "@mui/system";

export default makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
    paper: {
        width: '50%',
        height: '70%',
        margin: 'auto',
        padding: theme.spacing(2)
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
}))