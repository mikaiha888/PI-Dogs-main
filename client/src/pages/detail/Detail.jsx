

const Detail = ({ id, name, image, height, weight, temperament, life_span }) => {
    return (
      <div>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{temperament}</p>
        <p>{height}</p>
        <p>{weight}</p>
        <p>{life_span}</p>
      </div>
    );
}
export default Detail