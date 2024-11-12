import { Reservation } from '../../types/common-types';

const ReservationDetails = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div className="reservation-details" data-testid="reservation-details">
      <h3>Reservation Details:</h3>
      <div className="reservation-name">
        <span className="label">Name:</span> {reservation.name ?? ''}
      </div>
      <div className="reservation-party-size">
        <span className="label">Party Size:</span> {reservation.party_size ?? 0}
      </div>
      <div className="reservation-position">
        <span className="label">Position:</span> {reservation.position ?? 'N/A'}
      </div>
    </div>
  );
};

export default ReservationDetails;
