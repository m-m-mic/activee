import React from "react";
import "../assets/css/AddressPicker.css";
import {
  setAddressCityInput,
  setAddressHouseNumberInput,
  setAddressStreetInput,
  setAddressZipCodeInput,
} from "../scripts/handleInputs";

/**
 * Address-Picker, wird auf ModifyActivity.js und EditProfile.js eingesetzt.
 * @param data
 * @param setData
 * @param validation
 * @param setValidation
 * @param isActivity
 * @returns {JSX.Element}
 * @constructor
 */
export function AddressPicker({ data, setData, validation, setValidation, isActivity = false }) {
  return (
    <div className="address-picker">
      <div>
        <input
          className={validation.street ? "input-street" : "input-street warning"}
          placeholder="Straße"
          defaultValue={data.address.street}
          onChange={(e) => setAddressStreetInput(e.target.value, data, setData, validation, setValidation, isActivity)}
        />
        <input
          className={validation.house_number ? "input-house-number" : "input-house-number warning"}
          placeholder="Nr."
          defaultValue={data.address.house_number}
          onChange={(e) => setAddressHouseNumberInput(e.target.value, data, setData, validation, setValidation, isActivity)}
        />
      </div>
      <div>
        <input
          className={validation.zip_code ? "input-zip-code" : "input-zip-code warning"}
          placeholder="PLZ"
          defaultValue={data.address.zip_code}
          onChange={(e) => setAddressZipCodeInput(e.target.value, data, setData, validation, setValidation, isActivity)}
        />
        <input
          className={validation.city ? "input-city" : "input-city warning"}
          placeholder="Stadt"
          defaultValue={data.address.city}
          onChange={(e) => setAddressCityInput(e.target.value, data, setData, validation, setValidation, isActivity)}
        />
      </div>
    </div>
  );
}
