export function Form() {
  return (
    <div className="waitlist-form" data-testid="waitlist-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" aria-label="Name" />
      </div>

      <div>
        <label htmlFor="name">Party Size:</label>
        <input
          type="text"
          id="party-size"
          name="party-size"
          aria-label="Party Size"
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
    </div>
  );
}

export default Form;
