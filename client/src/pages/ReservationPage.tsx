import { useState } from 'react';
import { Form } from '../components/Form';
import { ReservationInfo } from '../components/Reservation';
import { RestaurantInfo } from '../components/Restaurant';
import { Reservation } from '../types/common-types';
import CheckInButton from '../components/CheckIn/CheckInButton';
import CheckedInScreen from '../components/CheckIn/CheckedInScreen';

export function ReservationPage() {
  const [reservation, setReservation] = useState<Reservation>();
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);

  const setReservationInfo = (reservation: Reservation) => {
    setReservation(reservation);
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  return (
    <div
      className="reservation-page-container"
      data-testid="reservation-page-container">
      <h1>Waitlist Manager</h1>
      <RestaurantInfo />
      {!isCheckedIn && !reservation && (
        <Form setReservationInfo={setReservationInfo} />
      )}
      {reservation && !isCheckedIn && <ReservationInfo id={reservation?.id} />}
      {reservation && !isCheckedIn && (
        <CheckInButton
          reservation={reservation}
          handleCheckIn={handleCheckIn}
        />
      )}
      {isCheckedIn && <CheckedInScreen />}
    </div>
  );
}

export default ReservationPage;
