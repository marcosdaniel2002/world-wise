import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const isLoading = false;
  const [currentCity, setCurrentCity] = useState({});
  const [cities, setCitiesList] = useLocalStorageState(
    [
      {
        cityName: "Guayaquil",
        country: "Ecuador",
        emoji: "🇪🇨",
        date: "2023-12-12T02:12:12.235Z",
        notes: "I live here!",
        position: { lat: "-2.1420493965653913", lng: "-79.89927291870119" },
        id: 1702347147782,
      },
    ],
    "citiesList"
  );

  function getCity(id) {
    if (+id === currentCity.id) return;
    const data = cities.find((city) => city.id == id);
    setCurrentCity(data);
  }

  function createCity(newCity) {
    setCitiesList((cities) => [...cities, { ...newCity, id: Date.now() }]);
  }

  function deleteCity(id) {
    setCitiesList((cities) => cities.filter((city) => city.id !== id));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
