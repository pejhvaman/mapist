import styles from "./CityList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";

import PropTypes from "prop-types";
import { useCities } from "../contexts/CityContext";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Tap on the map to add the first city." />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => (
        <CityItem city={city} key={i} />
      ))}
    </ul>
  );
}

export default CityList;
