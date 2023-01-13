import "../assets/css/Disclaimers.css";
import WarningIconBlack from "../assets/svgs/warning_icon_black.svg";

/**
 * Kleiner Caution Disclaimer für Inputs
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function CautionDisclaimer({ children }) {
  return (
    <div className="caution-disclaimer">
      <img src={WarningIconBlack} alt="Caution" />
      <span>{children}</span>
    </div>
  );
}
