import axios from "axios";
import { Shipment } from "../components/shipments-page";
import { formatCarrier } from "../utils/shared/functions";
import { OptionProps } from "../components/combobox";

export const getShipments = async ({queryKey}: {queryKey:string[]}) => {
  const [_, carrier, status] = queryKey;
  
  const response = await axios.get(
      "http://localhost:8080/api/delayed-shipments",
      {
        params: {
          carrier,
          status
        },
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    
    const {data} = response.data
    return data as Shipment[];
}

export const getCarriers = async () => {
  const response = await axios.get(
      "http://localhost:8080/api/carriers",
      {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const {data} = response.data
    const carriers = (data ?? []).map((carrier:string) => ({id: carrier, label: formatCarrier(carrier)})).sort()
    return [{id:'all', label: 'All'}, ...carriers] as OptionProps[];
}