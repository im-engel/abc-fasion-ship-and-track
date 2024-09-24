import { Info } from "@mui/icons-material";
import { FC } from "react";

export const InfoMessage:FC<{message: string}> = ({message}) => (
    <div style={{margin:'50px', display:'flex', gap: '10px', color: 'blue', justifyContent:'center'}}>
        <Info style={{fontSize:'20px', marginTop:'auto', marginBottom:'auto'}}/>
        <div style={{fontSize:'20px', marginTop:'auto', marginBottom:'auto'}}>{message}</div>
    </div>
)