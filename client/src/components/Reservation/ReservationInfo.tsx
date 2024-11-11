import { useEffect, useState } from 'react';
import { showReservation } from '../../api/showReservation';
import { Reservation } from '../../types/common-types';

type ReservationInfoProps = {
  id?: number;
};

export function ReservationInfo({ id }: ReservationInfoProps) {
  const [data, setData] = useState<Reservation>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = showReservation({ id: id });
          setData(await response);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [id]);

  const ReservationDetails = ({
    reservation,
  }: {
    reservation: Reservation;
  }) => {
    return (
      <div className="reservation-info">
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

  const ReservationMissing = () => {
    return (
      <div className="reservation-missing">
        <h3>Reservation Not Found</h3>
      </div>
    );
  };

  return data && data.id ? (
    <ReservationDetails reservation={data} />
  ) : (
    <ReservationMissing />
  );
}

export default ReservationInfo;
