type ReturnButtonProps = {
  handleNavigation: () => void;
};

export function ReturnButton({ handleNavigation }: ReturnButtonProps) {
  return (
    <button
      className="pure-button pure-button-rounded return-to-waitlist-button"
      aria-label="Return to Waitlist"
      data-testid="return-to-waitlist-button"
      onClick={handleNavigation}>
      Return to WaitList
    </button>
  );
}
