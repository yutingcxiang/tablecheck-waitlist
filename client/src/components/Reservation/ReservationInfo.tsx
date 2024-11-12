import { useEffect, useState } from 'react';
import { showReservation } from '../../api/showReservation';
import { Reservation } from '../../types/common-types';
import { editReservation } from '../../api/editReservation';
import { deleteReservation } from '../../api/deleteReservation';
import {
  CHECKIN_GRACE_PERIOD,
  RESERVATION_POLLING_INTERVAL,
  SERVICE_TIME,
} from '../../constants';
import ReservationMissing from './ReservationMissing';
import ReservationDetails from './ReservationDetails';

type ReservationInfoProps = {
  reservation: Reservation | undefined;
  handleCheckIn: () => void;
  handleCheckOut: () => void;
};

export function ReservationInfo({
  reservation,
  handleCheckIn,
  handleCheckOut,
}: ReservationInfoProps) {
  const [data, setData] = useState<Reservation | undefined>(reservation);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const checkIn = async () => {
    // Sets position to be -1 to indicated checked in
    if (data) {
      await editReservation({
        id: data.id,
        position: -1,
      });

      setIsCheckedIn(true);
    }
  };

  const checkOut = async () => {
    // Removes reservation from waitlist
    if (data) {
      await deleteReservation({
        id: data.id,
      });

      setIsCheckedIn(false);
      setData(undefined);
      handleCheckOut();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          const response = showReservation({ id: data.id });
          setData(await response);
        } catch (error) {
          clearInterval(interval);
          console.log(error);
        }
      }
    };

    // Polls for reservation data every second
    const interval = setInterval(() => {
      if (data && data.id) {
        fetchData();
      } else {
        clearInterval(interval);
      }
    }, RESERVATION_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (isCheckedIn && data) {
      handleCheckIn();

      // Calculates service time for party
      const totalServiceTime = data.party_size * SERVICE_TIME;

      // Deletes reservation after party has been serviced
      setTimeout(async () => {
        await deleteReservation({
          id: data.id,
        });
      }, totalServiceTime);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedIn, data]);

  useEffect(() => {
    // Enables check in button if party is first in line
    const isReadyForCheckin = data?.position === 0;
    if (isReadyForCheckin) {
      setIsEnabled(true);
    }

    // Deletes reservation if party does not check in within grace period
    if (data && data.id && !isCheckedIn) {
      setTimeout(async () => {
        await deleteReservation({
          id: data.id,
        });
      }, CHECKIN_GRACE_PERIOD);
    }
  }, [data, isCheckedIn]);

  return (
    <div
      className="reservation-info-section"
      data-testid="reservation-info-section">
      {data && data.id ? (
        <ReservationDetails reservation={data} />
      ) : (
        <ReservationMissing handleNavigation={handleCheckOut} />
      )}
      {data && data.id && !isCheckedIn && (
        <div className="grid-container">
          <button
            className="pure-button pure-button-rounded pure-button-primary check-in-button"
            aria-label="Check In"
            data-testid="check-in-button"
            disabled={!isEnabled}
            onClick={checkIn}>
            Check In
          </button>

          <button
            className="pure-button pure-button-rounded check-in-button"
            aria-label="Leave Waitlist"
            data-testid="leave-waitlist"
            onClick={checkOut}>
            Leave Waitlist
          </button>
        </div>
      )}
    </div>
  );
}

export default ReservationInfo;
