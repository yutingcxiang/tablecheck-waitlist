export function Info() {
  return (
    <div className="info">
      <div className="description" data-testid="description">
        Welcome to Bob's Burgers.
      </div>
      <div className="total-capacity" data-testid="total-capacity">
        Total Capacity: 10
      </div>
      <div className="current-capacity" data-testid="current-capacity">
        Current Capacity: 10
      </div>
      <div className="availale-capacity" data-testid="availale-capacity">
        Available Seats: 10
      </div>
    </div>
  );
}

export default Info;
