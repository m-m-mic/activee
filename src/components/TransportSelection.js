import React from "react";
import { VerticalButton } from "./VerticalButton";
import { handleTransportChange } from "../scripts/handlePreferenceChange";
import { backendUrl } from "../index";

export function TransportSelection({ data, setData, isEditMode }) {
  if (isEditMode) {
    return (
      <div className="profile-transport-selection">
        <VerticalButton
          onClick={() => handleTransportChange("on_foot", data, setData)}
          iconUrl={`${backendUrl}/icons/transport/on_foot_icon.svg`}
          isChecked={data.transport.includes("on_foot")}>
          zu Fuß
        </VerticalButton>
        <VerticalButton
          onClick={() => handleTransportChange("bicycle", data, setData)}
          iconUrl={`${backendUrl}/icons/transport/bicycle_icon.svg`}
          isChecked={data.transport.includes("bicycle")}>
          Rad
        </VerticalButton>
        <VerticalButton
          onClick={() => handleTransportChange("car", data, setData)}
          iconUrl={`${backendUrl}/icons/transport/car_icon.svg`}
          isChecked={data.transport.includes("car")}>
          Auto
        </VerticalButton>
        <VerticalButton
          onClick={() => handleTransportChange("bus", data, setData)}
          iconUrl={`${backendUrl}/icons/transport/bus_icon.svg`}
          isChecked={data.transport.includes("bus")}>
          Bus
        </VerticalButton>
        <VerticalButton
          onClick={() => handleTransportChange("train", data, setData)}
          iconUrl={`${backendUrl}/icons/transport/train_icon.svg`}
          isChecked={data.transport.includes("train")}>
          Bahn
        </VerticalButton>
      </div>
    );
  } else {
    return (
      <div className="profile-transport-selection">
        <VerticalButton iconUrl={`${backendUrl}/icons/transport/on_foot_icon.svg`} isChecked={data.transport.includes("on_foot")}>
          zu Fuß
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/transport/bicycle_icon.svg`} isChecked={data.transport.includes("bicycle")}>
          Rad
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/transport/car_icon.svg`} isChecked={data.transport.includes("car")}>
          Auto
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/transport/bus_icon.svg`} isChecked={data.transport.includes("bus")}>
          Bus
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/transport/train_icon.svg`} isChecked={data.transport.includes("train")}>
          Bahn
        </VerticalButton>
      </div>
    );
  }
}
