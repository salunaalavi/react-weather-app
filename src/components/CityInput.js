import { useContext, useRef } from "react";
import AppContext from "../api/context/appContext";
import { getCityName } from "../api/store/weather";
import geoCoords from "../api/config/geoCoords";

function CityInput() {
  const input = useRef();
  const {
    dispatchApp,
  } = useContext(AppContext);
  let time;
  return (
    <div className="input-group">
      <span
        onClick={async () => {
          const coords = await geoCoords();
          dispatchApp({
            type: "GEO_COORDS",
            payload: { lon: coords.longitude, lat: coords.latitude },
          });
          const { country, name } = await getCityName(
            coords.longitude,
            coords.latitude
          );
          dispatchApp({ type: "COUNTRY", payload: country });
          dispatchApp({ type: "CITY", payload: name });
          input.current.value = "Jakarta";
        }}
      >
        <i
          className="fa-solid fa-location-crosshairs location-icon"
        ></i>
      </span>
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        ref={input}
        placeholder="Cari"
        onInput={(e) => {
          const value = e.target.value;
          clearTimeout(time);
          time = setTimeout(() => {
            dispatchApp({ type: "CITY", payload: value });
          }, 500);
        }}
      />
    </div>
  );
}

export default CityInput;
