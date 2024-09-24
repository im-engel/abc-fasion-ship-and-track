import { SHIPMENT_STATUS } from "../constants";

export const formatCarrier = (carrier: string) => {
    switch  (carrier) {
        case 'dhl':
            return 'DHL';
        case 'fedex':
            return 'FedEx';
        default:
            return formatText(carrier)
    }
  }

export const formatText = (text:string) => {
    return text.replace(/(^\w|_\w)/g, (match) => match.replace('_', ' ').toUpperCase());
}

export const getShipmentStatusOptions = () =>{
    const options = Object.entries(SHIPMENT_STATUS).map(([key, value]) => ({
        label: value as string,
        id: key
      })) 

    return [{id: 'all', label:'All'}, ...options].sort()
} ;