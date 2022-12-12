import React from "react";
import {
  setAddressCityInput,
  setAddressHouseNumberInput,
  setAddressStreetInput,
  setAddressZipCodeInput,
} from "../scripts/validateProfileEditInput";

export function AddressPicker({ data, setData, validation, setValidation }) {
  return (
    <div className="profile-address-picker">
      <div>
        <input
          className={validation.street ? "profile-input-street" : "profile-input-street warning"}
          placeholder="Straße"
          defaultValue={data.address.street}
          onChange={(e) => setAddressStreetInput(e.target.value, data, setData, validation, setValidation)}
        />
        <input
          className={validation.house_number ? "profile-input-house-number" : "profile-input-house-number warning"}
          placeholder="Nr."
          defaultValue={data.address.house_number}
          onChange={(e) => setAddressHouseNumberInput(e.target.value, data, setData, validation, setValidation)}
        />
      </div>
      <div>
        <input
          className={validation.zip_code ? "profile-input-zip-code" : "profile-input-zip-code warning"}
          placeholder="PLZ"
          defaultValue={data.address.zip_code}
          onChange={(e) => setAddressZipCodeInput(e.target.value, data, setData, validation, setValidation)}
        />
        <input
          className={validation.city ? "profile-input-city" : "profile-input-city warning"}
          placeholder="Stadt"
          defaultValue={data.address.city}
          onChange={(e) => setAddressCityInput(e.target.value, data, setData, validation, setValidation)}
        />
      </div>
    </div>
  );
}
