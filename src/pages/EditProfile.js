import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { EditControls } from "../components/EditControls";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "../assets/svgs/edit_icon_white.svg";
import { VerticalButton } from "../components/VerticalButton";
import { HorizontalButton } from "../components/HorizontalButton";
import { TimeTable } from "../components/TimeTable";

export function EditProfile() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  useEffect(() => {
    getAccountInfo();
    document.title = "Dein Profil - activee";
  }, []);
  const getAccountInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:1337/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data));
  };
  const updateAccountInfo = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(accountInfo),
    };
    console.log(accountInfo);
    fetch("http://localhost:1337/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data))
      .then(() => navigate("/profile"));
  };
  const handleSportRemoval = (sport) => {
    let sportArray = accountInfo.sports;
    for (let i = 0; i < sportArray.length; i++) {
      if (sportArray[i].value === sport) {
        sportArray.splice(i, 1);
      }
    }
    setAccountInfo({ ...accountInfo, sports: sportArray });
  };
  const handleGenderChange = (gender) => {
    let genderArray = accountInfo.genders;
    if (genderArray.includes(gender)) {
      for (let i = 0; i < genderArray.length; i++) {
        if (genderArray[i] === gender) {
          genderArray.splice(i, 1);
        }
      }
    } else {
      genderArray.push(gender);
    }
    setAccountInfo({ ...accountInfo, genders: genderArray });
  };
  const handleTransportChange = (means) => {
    let transportArray = accountInfo.transport;
    if (transportArray.includes(means)) {
      for (let i = 0; i < transportArray.length; i++) {
        if (transportArray[i] === means) {
          transportArray.splice(i, 1);
        }
      }
    } else {
      transportArray.push(means);
    }
    setAccountInfo({ ...accountInfo, transport: transportArray });
  };
  if (!accountInfo) {
    return null;
  }
  if (cookies.userToken) {
    return (
      <>
        <EditControls onConfirmClick={() => updateAccountInfo()} />
        <div className="profile-user-info">
          <img className="profile-user-picture" src={AccountIcon} alt="Profile" />
          <span className="profile-user-credentials">
            <div className="profile-user-name">
              <input
                value={accountInfo.first_name}
                onChange={(e) => setAccountInfo({ ...accountInfo, first_name: e.target.value })}
              />
              <input
                value={accountInfo.last_name}
                onChange={(e) => setAccountInfo({ ...accountInfo, last_name: e.target.value })}
              />
            </div>
            <div className="profile-user-email">{accountInfo.email}</div>
          </span>
        </div>
        {cookies.userType === "organisation" && <div className="profile-club-name"> {accountInfo.club} </div>}
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">
              <input type="date" value={accountInfo.birthday} onChange={(e) => setAccountInfo({ birthday: e.target.value })} />
            </span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">
                <input type="tel" value={accountInfo.phone_number} />
              </span>
            </div>
          )}
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Adresse</span>
            <span className="profile-general-info-data">
              <input
                value={accountInfo.address.street}
                onChange={(e) => setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, street: e.target.value } })}
              />
              <input
                type="number"
                value={accountInfo.address.house_number}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, house_number: Number(e.target.value) } })
                }
              />
              <br />
              <input
                type="number"
                value={accountInfo.address.zip_code}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, zip_code: Number(e.target.value) } })
                }
              />
              <input
                value={accountInfo.address.city}
                onChange={(e) => setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, city: e.target.value } })}
              />
            </span>
          </div>
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              {accountInfo.languages.map((item, key) => (
                <div key={key}>{item}</div>
              ))}
              <img className="profile-general-info-language-icon" src={GermanIcon} alt="language icon" />
            </span>
          </div>
        </div>
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <div className="profile-gender-selection">
              <VerticalButton
                onClick={() => handleGenderChange("female")}
                iconUrl={EditIcon}
                isChecked={accountInfo.genders.includes("female")}>
                Weiblich
              </VerticalButton>
              <VerticalButton
                onClick={() => handleGenderChange("male")}
                iconUrl={EditIcon}
                isChecked={accountInfo.genders.includes("male")}>
                Männlich
              </VerticalButton>
              <VerticalButton
                onClick={() => handleGenderChange("mix")}
                iconUrl={EditIcon}
                isChecked={accountInfo.genders.includes("mix")}>
                Mix
              </VerticalButton>
            </div>
            <h3>Sportarten</h3>
            <div className="profile-sports-selection">
              {accountInfo.sports.map((item, key) => (
                <HorizontalButton onClick={() => handleSportRemoval(item.value)} editMode iconUrl={EditIcon} key={key}>
                  {item.name}
                </HorizontalButton>
              ))}
            </div>
            <h3>Anfahrt</h3>
            <div className="profile-transport-selection">
              <VerticalButton
                onClick={() => handleTransportChange("on_foot")}
                iconUrl={EditIcon}
                isChecked={accountInfo.transport.includes("on_foot")}>
                zu Fuß
              </VerticalButton>
              <VerticalButton
                onClick={() => handleTransportChange("bicycle")}
                iconUrl={EditIcon}
                isChecked={accountInfo.transport.includes("bicycle")}>
                Rad
              </VerticalButton>
              <VerticalButton
                onClick={() => handleTransportChange("car")}
                iconUrl={EditIcon}
                isChecked={accountInfo.transport.includes("car")}>
                Auto
              </VerticalButton>
              <VerticalButton
                onClick={() => handleTransportChange("bus")}
                iconUrl={EditIcon}
                isChecked={accountInfo.transport.includes("bus")}>
                Bus
              </VerticalButton>
              <VerticalButton
                onClick={() => handleTransportChange("train")}
                iconUrl={EditIcon}
                isChecked={accountInfo.transport.includes("train")}>
                Bahn
              </VerticalButton>
            </div>
            <div className="profile-general-info">
              <div className="profile-general-info-container">
                <span className="profile-general-info-name">Distanz</span>
                <span className="profile-general-info-data">
                  <input
                    type="number"
                    value={accountInfo.distance}
                    onChange={(e) => setAccountInfo({ ...accountInfo, distance: Number(e.target.value) })}
                  />{" "}
                  km
                </span>
              </div>
            </div>
            <h3>Zeiten</h3>
            <TimeTable timeValues={accountInfo.times}></TimeTable>
            {accountInfo.children_accounts && <h2>Unterprofile</h2>}
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
