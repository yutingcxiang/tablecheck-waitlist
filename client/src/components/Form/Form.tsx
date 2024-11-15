import { useState } from 'react';
import { createReservation } from '../../api/createReservation';
import { Reservation } from '../../types/common-types';

type FormProps = {
  setReservationInfo: (reservation: Reservation) => void;
};

export function Form({ setReservationInfo }: FormProps) {
  const [name, setName] = useState('');
  const [partySize, setPartySize] = useState('');

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartySize(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reservation = await createReservation({
      name: name,
      party_size: parseInt(partySize),
    });
    if (reservation) {
      setReservationInfo(reservation);
      clearForm();
    }
  };

  const clearForm = () => {
    setName('');
    setPartySize('');
  };

  return (
    <div>
      <div className="instructions">
        <div>Unfortunately we are at full capacity right now.</div>
        <div>Please enter your info below to join our waitlist.</div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="waitlist-form pure-form pure-form-stacked"
        data-testid="waitlist-form"
        >
        <fieldset>
          <legend>Contact Information:</legend>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              aria-label="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>

          <label htmlFor="party-size">
            Party Size:
            <input
              type="number"
              id="party-size"
              name="party-size"
              aria-label="Party Size"
              min="1"
              max="10"
              value={partySize || ''}
              onChange={handlePartySizeChange}
              required
            />
          </label>

          <div>
            <button
              className="pure-button pure-button-rounded pure-button-primary join-waitlist-button"
              type="submit"
              aria-label="Join Waitlist"
              data-testid="join-waitlist-button">
              Join WaitList
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
