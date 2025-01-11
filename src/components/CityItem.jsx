/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  console.log(city);
  const { cityName, emoji, date } = city;

  return (
    <li key={city.id} className={styles.cityItem}>
      <span className={styles.name}>{cityName}</span>
      <h3 className={styles.emoji}>{emoji}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
