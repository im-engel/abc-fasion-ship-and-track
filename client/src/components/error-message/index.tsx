import { ReportProblem } from "@mui/icons-material";
import { FC } from "react";

export const ErrorMessage:FC<{message:string}> = ({message}) => (
    <div style={{margin:'50px', display:'flex', gap: '10px', color: 'red', justifyContent:'center'}}>
        <ReportProblem style={{fontSize:'50px', marginTop:'auto', marginBottom:'auto'}}/>
        <div style={{fontSize:'50px', marginTop:'auto', marginBottom:'auto'}}>{message || 'Error encountered'}</div>
    </div>
)