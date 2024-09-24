import { TableBody } from "@mui/material"
import { FC, PropsWithChildren } from "react"

export const TableContents:FC<PropsWithChildren> = ({children}) => {

    return (
        <TableBody>
            {children}
        </TableBody>
    )
}