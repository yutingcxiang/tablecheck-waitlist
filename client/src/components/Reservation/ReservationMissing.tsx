import { ReturnButton } from '../Button';

type ReservationMissingProps = {
  handleNavigation: () => void;
};

const ReservationMissing = ({ handleNavigation }: ReservationMissingProps) => {
  return (
    <div className="reservation-missing">
      <h3>Reservation Not Found</h3>
      <div>
        <ReturnButton handleNavigation={handleNavigation} />
      </div>
    </div>
  );
};

export default ReservationMissing;
