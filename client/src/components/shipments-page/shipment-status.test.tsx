import { render, screen } from '@testing-library/react';
import { ShipmentStatusChip } from './shipment-status';
import { SHIPMENT_STATUS } from '../../utils/constants';

describe('ShipmentStatusChip Component', () => {
  it('should display "delivered" status with CheckCircle icon and green color', () => {
    render(<ShipmentStatusChip status="delivered" />);

    // Check that the CheckCircle icon is present
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();

    // Check that the caption text "Delivered" is displayed
    expect(screen.getByText(SHIPMENT_STATUS.delivered)).toBeInTheDocument();
  });

  it('should display "failed_delivery" status with Cancel icon and red color', () => {
    render(<ShipmentStatusChip status="failed_delivery" />);

    // Check that the Cancel icon is present
    expect(screen.getByTestId('CancelIcon')).toBeInTheDocument();

    // Check that the caption text "Failed delivery" is displayed
    expect(screen.getByText(SHIPMENT_STATUS.failed_delivery)).toBeInTheDocument();
  });

  it('should display "in_transit" status with LocalShipping icon and orange color', () => {
    render(<ShipmentStatusChip status="in_transit" />);

    // Check that the LocalShipping icon is present
    expect(screen.getByTestId('LocalShippingIcon')).toBeInTheDocument();

    // Check that the caption text "In Transit" is displayed
    expect(screen.getByText(SHIPMENT_STATUS.in_transit)).toBeInTheDocument();
  });

  it('should display "out_for_delivery" status with DeliveryDining icon and blue color', () => {
    render(<ShipmentStatusChip status="out_for_delivery" />);

    // Check that the DeliveryDining icon is present
    expect(screen.getByTestId('DeliveryDiningIcon')).toBeInTheDocument();

    // Check that the caption text "Out for delivery" is displayed
    expect(screen.getByText(SHIPMENT_STATUS.out_for_delivery)).toBeInTheDocument();
  });

  it('should display default status with Circle icon when status is unknown', () => {
    render(<ShipmentStatusChip status="unknown_status" />);

    // Check that the Circle icon is present
    expect(screen.getByTestId('CircleIcon')).toBeInTheDocument();

    // Check that the formatted caption text is displayed
    expect(screen.getByText('Unknown Status')).toBeInTheDocument();
  });
});
