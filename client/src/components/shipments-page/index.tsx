import { useQuery } from "@tanstack/react-query"
import { shipmentHeaders } from "./columns"
import { getCarriers, getShipments } from "../../api/shipments"
import { DataTable } from "../table"
import { TableCell, TableRow } from "@mui/material"
import { formatCarrier, getShipmentStatusOptions } from "../../utils/shared/functions"
import { ShipmentStatusChip } from "./shipment-status"
import { ErrorMessage } from "../error-message"
import { useEffect, useState } from "react"
import { Combobox, OptionProps } from "../combobox"
import { InfoMessage } from "../info-message"

interface Customer {
    name: string
    address: string
    city: string
    country: string
    lat: number
    long: number
}

export interface Shipment {
    id: string
    start: Date
    end?: Date
    carrier: string
    status: string
    customer: Customer
  }


  export const ShipmentsPage = () => {
    const shipmentStatuses = getShipmentStatusOptions()

    const [selectedShipmentStatus, setSelectedShipmentStatus] = useState(shipmentStatuses[0])
    const [selectCarrier, setSelectedCarrier] = useState<OptionProps>({id:'all', label:'All'})

    const {data: shipments, isLoading: isShipmentLoading, error: shipmentError} = useQuery({
        queryKey: ['shipment', selectCarrier.id, selectedShipmentStatus.id],
        queryFn: getShipments
    })

    const {data: carriersList, isLoading: isCarriersLoading, error: carriersError} = useQuery({
        queryKey: ['carriers'],
        queryFn: getCarriers
    })

    useEffect(()=> {
        if(carriersList) {
            setSelectedCarrier(carriersList[0])
        }
    }, [carriersList])

    if (shipmentError || carriersError) {
        const errMessage = shipmentError?.message || carriersError?.message || ''
        return (
            <ErrorMessage message={errMessage} />
        )
    }

    return ( 
    <>
        {!isCarriersLoading &&
            <div style={{marginLeft:'20px', marginTop:'20px', fontSize:'20px', display:"flex", flexDirection:'column', gap:'10px'}}>
                <div>Filters:</div>
                <div style={{ fontSize:'16px', display:"flex", flexDirection:'row', gap:'15px'}}>
                    <Combobox options={shipmentStatuses} onOptionChange={setSelectedShipmentStatus} label="Shipment Status" />
                    <Combobox options={carriersList || []} onOptionChange={setSelectedCarrier} label="Shipment Status" />
                </div>
            </div>
        } 
        <DataTable headers={shipmentHeaders} isLoading={isShipmentLoading || isCarriersLoading}>
            {
                shipments && shipments.map(shipment => (
                    <TableRow key={shipment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                         <TableCell component="th" scope="row" sx={{color:'red'}}>
                            <ShipmentStatusChip status={shipment.status} />
                        </TableCell>
                        <TableCell>
                            {formatCarrier(shipment.carrier)}
                        </TableCell>
                        <TableCell>
                            {new Date(shipment.start).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            {shipment.end ? new Date(shipment.end).toLocaleDateString() : ''}
                        </TableCell>
                        <TableCell >
                            {shipment.customer.name}
                        </TableCell>
                        <TableCell >
                            {`${shipment.customer.address} ${shipment.customer.city} ${shipment.customer.country}`}
                        </TableCell>
                    </TableRow>
                ))
            }
        </DataTable>
        {shipments && !isShipmentLoading && !isCarriersLoading && shipments.length === 0 && <InfoMessage message="No data"/>}
    </>
    )
  }