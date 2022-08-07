import { createContext } from "react";

const initialAppState = {
  weather: null,
  unit: "C",
  city: "Jakarta",
  country: "ID",
  geoCoords: {
    lon: 106.8456,
    lat: -6.2088,
  },
};

function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "WEATHER":
      return { ...state, weather: payload };
    case "CITY":
      return { ...state, city: payload };
    case "COUNTRY":
      return { ...state, country: payload };
    case "UNIT":
      return { ...state, unit: payload };
    case "GEO_COORDS":
      return { ...state, geoCoords: payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export { appReducer, initialAppState };
export default AppContext;
