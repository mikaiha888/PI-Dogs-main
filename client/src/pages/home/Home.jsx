import style from "./Home.module.css";
import { useSelector } from "react-redux";

import Landing from "../landing/Landing";
import Form from "../../components/form/Form";
import ButtonNormal from "../../components/button-normal/ButtonNormal";

const Home = () => {
  const { newBreed } = useSelector((state) => state);

  return (
    <main className={style.main}>
      <Landing />

      <hr />

      <section className={style.intro}>
        <div className={style.container}>
          <div>
            <img src="../../../public/img/paw-img.png" alt="Paw" />
          </div>
          <div>
            <h2>Welcome</h2>
            <p>
              Descubre el mundo de las razas caninas de manera fácil y directa.
              Nuestra guía te ofrece información esencial sobre diversas razas
              de perros, desde su apariencia hasta su temperamento. <br />
              Si estás buscando detalles concisos para elegir el compañero
              peludo perfecto, ¡estás en el lugar adecuado! Explora y aprende
              sobre las razas de perros que capturan tu interés.
            </p>
            <ButtonNormal link={"/dogs"} buttonName={"View all dogs!"} />
          </div>
        </div>
      </section>

      <section className={style.dogForm}>
        <div className={style.container}>
          <div>
            <hr />
            <h3>¿No encontrás a tu perro?</h3>
            <p className={style.formText}>
              ¡Regristra sus datos para que los demás usuarios lo puedan
              encontrar!
            </p>
          </div>
          <Form />
        </div>
        {newBreed && (
          <div className={style.newBreed}>
            <img src={newBreed.image} alt={newBreed.name} />
            <h3>{newBreed.name}</h3>
            <p>{newBreed.temperament?.name}</p>
            <p>
              {newBreed.height?.max
                ? `${newBreed.height?.min} - ${newBreed.height?.max} cm`
                : `${newBreed.height?.min} cm`}
            </p>
            <p>
              {newBreed.weight?.max
                ? `${newBreed.weight?.min} - ${newBreed.weight?.max} kg`
                : `${newBreed.weight?.min} kg`}
            </p>
            <p>
              {newBreed.life_span?.max
                ? `${newBreed.life_span?.min} - ${newBreed.life_span?.max} years`
                : `${newBreed.life_span?.min} years`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
export default Home;
