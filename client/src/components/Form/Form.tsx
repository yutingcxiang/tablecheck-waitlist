import { useState } from 'react';
import { createReservation } from '../../api/createReservation';
import { Reservation } from '../../types/common-types';

type FormProps = {
  setReservationInfo: (reservation: Reservation) => void;
};

export function Form({ setReservationInfo }: FormProps) {
  const [name, setName] = useState('');
  const [partySize, setPartySize] = useState(0);

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartySize(e.target.value === '' ? 0 : parseInt(e.target.value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reservation = await createReservation({
      name,
      party_size: partySize,
    });
    if (reservation) {
      setReservationInfo(reservation);
      clearForm();
    }
  };

  const clearForm = () => {
    setName('');
    setPartySize(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="waitlist-form"
      data-testid="waitlist-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          aria-label="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="name">Party Size:</label>
        <input
          type="number"
          id="party-size"
          name="party-size"
          aria-label="Party Size"
          min="1"
          max="10"
          value={partySize}
          onChange={handlePartySizeChange}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          aria-label="Join Waitlist"
          data-testid="join-waitlist-button">
          Join WaitList
        </button>
      </div>
    </form>
  );
}

export default Form;
