import { useState } from 'react';
import { Form } from '../components/Form';
import { ReservationInfo } from '../components/Reservation';
import { RestaurantInfo } from '../components/Restaurant';
import { Reservation } from '../types/common-types';

export function ReservationPage() {
  const [reservation, setReservation] = useState<Reservation>();

  const setReservationInfo = (reservation: Reservation) => {
    setReservation(reservation)
  }

  return (
    <div className="reservation-page-container">
      <h1>Waitlist Manager</h1>
      <RestaurantInfo />
      <Form setReservationInfo={setReservationInfo} />
      <ReservationInfo id={reservation?.id} />
    </div>
  );
}

export default ReservationPage;
