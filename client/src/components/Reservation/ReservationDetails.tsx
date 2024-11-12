import { Reservation } from "../../types/common-types";

const ReservationDetails = ({
    reservation,
  }: {
    reservation: Reservation;
  }) => {
    return (
      <div className="reservation-details" data-testid="reservation-details">
        <h3>Reservation Details:</h3>
        <div className="reservation-name">Name: {reservation.name ?? ''}</div>
        <div className="reservation-party-size">
          Party Size: {reservation.party_size ?? 0}
        </div>
        <div className="reservation-position">
          Position: {reservation.position ?? 'N/A'}
        </div>
      </div>
    );
  };

  export default ReservationDetails