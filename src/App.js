import { useEffect, useReducer } from "react";
import CityInput from "./components/CityInput";
import Weather from "./components/Weather";
import AppContext, { appReducer, initialAppState } from "./api/context/appContext";
import "./App.css";
import geoCoords from "./api/config/geoCoords";
import getWeather, {
  getCityCoords,
  getCityName,
} from "./api/store/weather";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import Hourly from "./components/Hourly";

function App() {
  const [app, dispatchApp] = useReducer(appReducer, initialAppState);
  useEffect(() => {
    (async () => {
      const { longitude: lon, latitude: lat } = await geoCoords();
      if (lon && lat) {
        const { name, country } = await getCityName(lon, lat);
        dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
        dispatchApp({ type: "CITY", payload: name });
        dispatchApp({ type: "COUNTRY", payload: country });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { lon, lat, country } = await getCityCoords(app.city);
      dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
      dispatchApp({ type: "COUNTRY", payload: country });
    })();
  }, [app.city]);

  useEffect(() => {
    (async () => {
      const data = await getWeather(app.geoCoords.lon, app.geoCoords.lat);
      dispatchApp({ type: "WEATHER", payload: data });
    })();
  }, [app.geoCoords.lat, app.geoCoords.lon]);
  
  const activeElement = { background: "#1a1a1a", color: "#fff" };
  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <section className="container">
        <div className="col-left">
          <CityInput />
          <Weather />
        </div>
        <div className="col-right">
          <div className="right-header">
            <h2 className="heading">Hari Ini</h2>
            <div className="units">
              <span
                style={
                  app.unit === "C"
                    ? activeElement
                    : null
                }
                onClick={() => {
                  dispatchApp({ type: "UNIT", payload: "C" });
                }}
              >
                °C
              </span>
              <span
                onClick={() => {
                  dispatchApp({ type: "UNIT", payload: "F" });
                }}
                style={
                  app.unit === "F"
                    ? activeElement
                    : null
                }
              >
                °F
              </span>
            </div>
          </div>
          <Hourly />
          <h2 className="heading">Rangkuman Hari Ini</h2>
          <Highlights />
          <h2 className="heading">Minggu Ini</h2>
          <Forecast />
        </div>
      </section>
    </AppContext.Provider>
  );
}

export default App;
