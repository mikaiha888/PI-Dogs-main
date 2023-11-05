import Nav from "../../modules/nav/Nav";
import Cards from "../../components/cards/Cards";
import Section from "../../modules/section/Section";

const Home = () => {
  return (
    <div>
      <header>
        <Nav />
      </header>

      <main>
        <Section
          title="Dog Guide"
          text="Conocer mejor a tu compañero de vida"
        >
          <img src="" alt="" />
        </Section>

        <Section
          title="Basic Guide"
          text="🐾No importa que raza sea, todos los perros merecen el mismo cuidado🐾"
        >
          <article></article>
        </Section>

        <Section
          title="Dogs"
          text="¡Te presentamos todas las razas registradas en el mundo!"
        >
        </Section>
      </main>

      {/* <footer>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <ul>
            <ButtonList link='http://localhost:5173/home' buttonName='Home' />
            <ButtonList link='http://localhost:5173/home' buttonName='Home' />
            <ButtonList link='http://localhost:5173/home' buttonName='Home' />
          </ul>
        </div>
      </footer> */}
    </div>
  );
};
export default Home;
