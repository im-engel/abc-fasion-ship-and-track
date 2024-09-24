import express, {Request, Response} from "express";
import { errorResponse } from "../utils/error";
import { fetchShipments } from "../service/shipments";

export const getShipmentRoutes = () => {
    const router = express.Router();
    router.get("/delayed-shipments", getAllAppointmentsController);
    router.get("/carriers", getAllCarriers);

    return router;
}

const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const {query} = req
        const {carrier, status:shipmentStatus} = query
        
        const shipments = await fetchShipments();
        if (!shipments) {
            return errorResponse(res, 'Error fetching shipment data')
        }

        
        res.json({ data: shipments.filter(shipments => (carrier === 'all' || carrier === shipments.carrier) && (shipmentStatus === 'all' || shipmentStatus === shipments.status)) });
    } catch (error) {
        return errorResponse(res, `Error fetching shipments: ${error}`)
    }
}

const getAllCarriers = async (req: Request, res: Response) => {
    try {
        const shipments = await fetchShipments();
        if (!shipments) {
            return errorResponse(res, 'Error fetching shipment data')
        }
        
        res.json({ data: [...new Set(shipments?.map(shipments => shipments.carrier) || [])].sort() });
    } catch (error) {
        return errorResponse(res, `Error fetching shipments: ${error}`)
    }
}
