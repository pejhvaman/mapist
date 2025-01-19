/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("something went wrong😡");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = async function (cityId) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${cityId}`);
      if (!res.ok) throw new Error("something went wrong😡");
      const data = await res.json();
      // console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext is been used in outside of its provider!");
  return value;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
