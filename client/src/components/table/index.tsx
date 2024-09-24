import { Paper, Table, TableContainer } from "@mui/material"
import { HeaderCellProps } from "./types"
import { FC, PropsWithChildren } from "react"
import { TableHeader } from "./header"
import { TableContents } from "./body"
import { LoadingIndicator } from "../loading-indicator"

interface DTableProps extends PropsWithChildren {
    headers: HeaderCellProps[]
    isLoading: boolean
}

export const DataTable:FC<DTableProps> = ({headers, isLoading, children}) => {

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <TableContainer  component={Paper}>
            <Table sx={{margin:'20px'}}>
                <TableHeader headers={headers} />
                <TableContents>{children}</TableContents>
            </Table>
        </TableContainer>
    )
}