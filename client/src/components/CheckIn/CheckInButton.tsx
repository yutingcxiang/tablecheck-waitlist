import { useEffect, useState } from 'react';
import { deleteReservation } from '../../api/deleteReservation';
import { Reservation } from '../../types/common-types';

type CheckInButtonProps = {
  reservation: Reservation;
};

export function CheckInButton({ reservation }: CheckInButtonProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnClick = async () => {
    deleteReservation({
      id: reservation.id,
    });
  };

  useEffect(() => {
    setIsEnabled(reservation.position === 1);
  }, [reservation.position]);

  return (
    <div>
      <button
        aria-label="Check In"
        data-testid="check-in-button"
        disabled={!isEnabled}
        onClick={handleOnClick}>
        Check In
      </button>
    </div>
  );
}

export default CheckInButton;
