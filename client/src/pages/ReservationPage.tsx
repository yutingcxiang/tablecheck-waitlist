import { useState } from 'react';
import { Form } from '../components/Form';
import { ReservationInfo } from '../components/Reservation';
import { RestaurantInfo } from '../components/Restaurant';
import { Reservation } from '../types/common-types';
import CheckedInScreen from '../components/CheckIn/CheckedInScreen';
import { useWaitlist } from '../hooks/useWaitList';

export function ReservationPage() {
  const [reservation, setReservation] = useState<Reservation>();
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

  const setReservationInfo = (reservation: Reservation) => {
    setReservation(reservation);
  };

  const handleCheckIn = () => setIsCheckedIn(true);
  const handleCheckOut = () => setIsCheckedIn(false);

  useWaitlist();

  return (
    <div
      className="reservation-page-container"
      data-testid="reservation-page-container">
      <h1>Waitlist Manager</h1>
      <RestaurantInfo />
      {!isCheckedIn && !reservation && (
        <Form setReservationInfo={setReservationInfo} />
      )}
      {reservation && !isCheckedIn && (
        <ReservationInfo
          reservation={reservation}
          handleCheckIn={handleCheckIn}
        />
      )}
      {isCheckedIn && <CheckedInScreen handleCheckOut={handleCheckOut} />}
    </div>
  );
}

export default ReservationPage;
