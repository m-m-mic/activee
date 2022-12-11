import React from "react";
import {
  setAddressCityInput,
  setAddressHouseNumberInput,
  setAddressStreetInput,
  setAddressZipCodeInput,
} from "../scripts/validateProfileEditInput";

export function AddressPicker({ data, setData }) {
  return (
    <div className="profile-address-picker">
      <div>
        <input
          className="profile-input-street"
          placeholder="Straße"
          defaultValue={data.address.street}
          onChange={(e) => setAddressStreetInput(e.target.value, data, setData)}
        />
        <input
          className="profile-input-house-number"
          placeholder="Nr."
          defaultValue={data.address.house_number}
          onChange={(e) => setAddressHouseNumberInput(e.target.value, data, setData)}
        />
      </div>
      <div>
        <input
          className="profile-input-zip-code"
          placeholder="PLZ"
          defaultValue={data.address.zip_code}
          onChange={(e) => setAddressZipCodeInput(e.target.value, data, setData)}
        />
        <input
          className="profile-input-city"
          placeholder="Stadt"
          defaultValue={data.address.city}
          onChange={(e) => setAddressCityInput(e.target.value, data, setData)}
        />
      </div>
    </div>
  );
}
