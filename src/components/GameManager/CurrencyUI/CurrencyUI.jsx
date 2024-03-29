// Imports
import "./currencyUI.css";

// Libraries import
import formatNumberString from "../../../libraries/formatNumberString.js";

export default function CurrencyUI({ props }) {

    return (
        <div className="component currencyUI">
            <h2>{formatNumberString(props.gold)} Gold</h2>
        </div>
    );
}