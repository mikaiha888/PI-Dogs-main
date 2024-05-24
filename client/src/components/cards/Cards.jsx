import style from "./Cards.module.css";

import Card from "../card/Card";

const Cards = ({ currentPage, itemsPerPage, catalogue }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBreeds = catalogue.slice(startIndex, endIndex);  

  return (
    <div className={style.cards}>
      {currentBreeds.map(({ id, image, name, temperament, weight }, index) => {
        return (
        <Card
          key={index}
          id={id}
          image={image}
          name={name}
          temperament={temperament?.name}
          weight={weight?.max
            ? `${weight?.min} - ${weight?.max} kg`
            : `${weight?.min} kg`}
        />
        )
      }
      )}
    </div>
  );
};
export default Cards;
