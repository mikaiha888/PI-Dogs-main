import { useSelector } from "react-redux";

import Card from "../card/Card";

const Cards = () => {
  const { allBreeds } = useSelector((state) => state);

  return (
    <div>
      {allBreeds.map(({ id, image, name, weight, temperament }) => (
        <Card
          key={id}
          id={id}
          image={image}
          name={name}
          weight={weight.metric}
          temperament={temperament}
        />
      ))}
    </div>
  );
};
export default Cards;
