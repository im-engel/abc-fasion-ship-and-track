/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShipmentsPage } from '.';
import * as api from '../../api/shipments';
import { OptionProps } from '../combobox';

// Mock the necessary modules
jest.mock('../../api/shipments');

const queryClient = new QueryClient();

describe('ShipmentsPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ShipmentsPage />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Filters:/)).toBeInTheDocument();
    });

    it('shows loading indicators when fetching data', () => {
        (api.getCarriers as jest.Mock).mockImplementation(() => new Promise(() => {})); // Cast to jest.Mock
        (api.getShipments as jest.Mock).mockImplementation(() => new Promise(() => {})); // Cast to jest.Mock

        render(
            <QueryClientProvider client={queryClient}>
                <ShipmentsPage />
            </QueryClientProvider>
        );

        expect(screen.getByText(/Filters:/)).toBeInTheDocument();
        // You might need to adjust based on how loading is represented in your UI
        expect(screen.getByText(/Loading.../)).toBeInTheDocument(); // Adjust as necessary
    });

    it('displays an error message when fetching shipments fails', async () => {
        (api.getCarriers as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch carriers'));
        (api.getShipments as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch shipments'));

        render(
            <QueryClientProvider client={queryClient}>
                <ShipmentsPage />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch carriers/)).toBeInTheDocument();
        });
    });

    it('renders carriers and shipments correctly when data is fetched', async () => {
        const mockCarriers: OptionProps[] = [{ id: 'carrier1', label: 'Carrier 1' }];
        const mockShipments = [{
            id: 'shipment1',
            start: new Date(),
            carrier: 'Carrier 1',
            status: 'In Transit',
            customer: {
                name: 'John Doe',
                address: '123 Main St',
                city: 'Springfield',
                country: 'USA',
                lat: 0,
                long: 0
            }
        }];

        (api.getCarriers as jest.Mock).mockResolvedValueOnce(mockCarriers);
        (api.getShipments as jest.Mock).mockResolvedValueOnce(mockShipments);

        render(
            <QueryClientProvider client={queryClient}>
                <ShipmentsPage />
            </QueryClientProvider>
        );

        // Wait for the data to be rendered
        await waitFor(() => {
            expect(screen.getByText(/Carrier 1/)).toBeInTheDocument();
            expect(screen.getByText(/John Doe/)).toBeInTheDocument();
            expect(screen.getByText(/In Transit/)).toBeInTheDocument();
        });
    });

    it('displays a message when there are no shipments', async () => {
        const mockCarriers: OptionProps[] = [{ id: 'carrier1', label: 'Carrier 1' }];
        (api.getCarriers as jest.Mock).mockResolvedValueOnce(mockCarriers);
        (api.getShipments as jest.Mock).mockResolvedValueOnce([]);

        render(
            <QueryClientProvider client={queryClient}>
                <ShipmentsPage />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/No data/)).toBeInTheDocument();
        });
    });
});
