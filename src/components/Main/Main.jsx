import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  isWeatherDataLoaded,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        isWeatherDataLoaded={isWeatherDataLoaded}
      />
      <section className="cards">
        <p className="cards__text">
          {!isWeatherDataLoaded
            ? `Loading weather data... `
            : `Today is ${weatherData?.temp[currentTemperatureUnit]}°${currentTemperatureUnit} / You might want to wear:`}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
