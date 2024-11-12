import { ReturnButton } from "../Button";

type CheckedInScreenProps = {
  handleNavigation: () => void;
};

export function CheckedInScreen({ handleNavigation }: CheckedInScreenProps) {
  return (
    <div className="checkedin-screen">
      <h3>Successfully Checked In</h3>
      <div>Please enjoy your meal!</div>
      <ReturnButton handleNavigation={handleNavigation} />
    </div>
  );
}

export default CheckedInScreen;
