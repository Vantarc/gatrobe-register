import { CircularProgress } from "@mui/material";

export default function LoadingScreen(props) {
    return (<div style={{"position": "absolute", "background-color": "#000000e8", width:"100vw", height: "100vh", zIndex: 100}} >
        <CircularProgress style={{"height":"10vw", "width":"10vw", marginLeft:"45vw", marginTop: "calc(50vh - 5vw", color: "white"}}/>
    </div>)
}