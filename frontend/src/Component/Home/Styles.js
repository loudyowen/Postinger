import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    Container: {
        width: '100%',
        height: '100%'
    },
    Post:{
        display: 'flex',
        flexDirection: 'column-reverse'
    }
}))