import axios from "axios";

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

export const fetchShipments = async (): Promise<Shipment[] | null> => {
    try {
        const response = await axios.get(`${process.env.API_BASEURL}shipments`, {
            auth: {
                username: process.env.API_USERNAME!,
                password: process.env.API_PASSWORD!
            }
        });

        const {data} = response.data
        console.log('ENGEL', data)
        return data;
    } catch (error) {
        console.error('Error fetching shipments:', error);
        return null;
    }
};