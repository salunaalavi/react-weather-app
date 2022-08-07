import React, { useContext } from "react";
import AppContext from "../api/context/appContext";
import Card from "./Card";
import Loader from "./Loader";

function Highlights() {
  const {
    app: { weather },
  } = useContext(AppContext);

  if (!weather) {
    return <Loader />;
  }
  const { current } = weather;
  const formatter = Intl.DateTimeFormat([], {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    timeZone: weather.timezone,
  });
  return (
    <>
      <div className="highlight-container">
        <Card className="h-card">
          <div className="h-title">Kelembaban</div>
          <div className="hl-value">
            <h1>{current.humidity}</h1>
            <span>%</span>
          </div>
        </Card>
        <Card className="h-card">
          <div className="h-title">Kecepatan Angin</div>
          <div className="hl-value">
            <h1>{current.wind_speed.toFixed(1)}</h1>
            <span>m/s</span>
          </div>
        </Card>
        <Card className="h-card sun">
          <div className="sun-info">
            <div>
              Terbit: {"\u00a0"}
              <span>{formatter.format(new Date(current.sunrise * 1000))}</span>
            </div>
          </div>
          <div className="sun-info">
            <div>
              Terbenam: {"\u00a0"}
              <span>{formatter.format(new Date(current.sunset * 1000))}</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Highlights;
