import style from "./Cards.module.css";

import Card from "../card/Card";

const Cards = ({ currentPage, itemsPerPage, catalogue }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBreeds = catalogue.slice(startIndex, endIndex);  

  return (
    <div className={style.cards}>
      {currentBreeds.map(({ id, image, name, weight, temperaments, temperament }) => {
        let tempFiltered = '';
        if (temperaments) {
          if (temperaments[0]['name']) tempFiltered = temperaments[0]['name'].split(',')[0];
        } else {
          if (temperament) tempFiltered = temperament.split(',')[0]
        }
        return (
        <Card
          key={id}
          id={id}
          image={image}
          name={name}
          temperament={tempFiltered}
          weight={weight.metric ? `${weight.metric} kg` : `${weight} kg`}
        />
        )
      }
      )}
    </div>
  );
};
export default Cards;
