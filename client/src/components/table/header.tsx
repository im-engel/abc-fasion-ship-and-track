import { TableCell, TableHead, TableRow } from "@mui/material"
import { HeaderCellProps } from "./types"
import { FC } from "react"

interface TableHeaderProps {
    headers: HeaderCellProps[]
}

export const TableHeader:FC<TableHeaderProps> = ({headers}) => {

    return (
        <TableHead>
            <TableRow>
                {
                    headers.map(header => <TableCell>{header.name}</TableCell>)
                }
            </TableRow>
        </TableHead>
    )
}