type ReservationMissingProps = {
  handleNavigation: () => void;
};

const ReservationMissing = ({ handleNavigation }: ReservationMissingProps) => {
  return (
    <div className="reservation-missing">
      <h3>Reservation Not Found</h3>
      <div>
        <button
          className="pure-button pure-button-rounded join-waitlist-button"
          aria-label="Return to Waitlist"
          data-testid="return-to-waitlist-button"
          onClick={handleNavigation}>
          Return to WaitList
        </button>
      </div>
    </div>
  );
};

export default ReservationMissing;
