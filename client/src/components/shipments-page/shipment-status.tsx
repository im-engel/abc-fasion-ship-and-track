import { FC } from "react"
import { SHIPMENT_STATUS } from "../../utils/constants"
import { Cancel, CheckCircle, Circle, DeliveryDining, LocalShipping } from "@mui/icons-material"
import { formatText } from "../../utils/shared/functions"

interface ShipmentStatusProps {
    status:string
}

export const ShipmentStatusChip:FC<ShipmentStatusProps> = ({status}) => {

    const caption = SHIPMENT_STATUS[status as keyof typeof SHIPMENT_STATUS] 
    switch (caption) {
        case SHIPMENT_STATUS.delivered:
            return (
                <div style={{display:'flex', gap: '10px', color: 'green'}}>
                    <CheckCircle />
                    <div style={{marginTop: 'auto', marginBottom: 'auto'}}>{caption}</div>
                </div>
            )
        case SHIPMENT_STATUS.failed_delivery:
            return (
                <div style={{display:'flex', gap: '10px', color: 'red'}}>
                    <Cancel />
                    <div>{caption}</div>
                </div>
            )
        case SHIPMENT_STATUS.in_transit:
            return (
                <div style={{display:'flex', gap: '10px', color: 'orange'}}>
                    <LocalShipping />
                    <div>{caption}</div>
                </div>
            )
        case SHIPMENT_STATUS.out_for_delivery:
            return (
                <div style={{display:'flex', gap: '10px', color: 'blue'}}>
                    <DeliveryDining />
                    <div>{caption}</div>
                </div>
            )
        default:
            return (
                <div style={{display:'flex', gap: '10px'}}>
                    <Circle />
                    <div>{formatText(status)}</div>
                </div>
            )
    }
}