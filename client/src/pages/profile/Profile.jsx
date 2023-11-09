import style from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={style.profile}>
      <div className={style.profileIntroContainer}>
        <h2>The Dog Guide</h2>
        <p>
          En nuestra página web, te ofrecemos una experiencia completa para
          aprender sobre diversas razas de perros y ayudarte a entender mejor a
          tu peludo amigo. Ya sea que estés buscando un nuevo compañero canino o
          simplemente quieras aprender más sobre las diferentes razas, estamos
          aquí para ayudarte.
        </p>
      </div>
      <div className={style.profileInfoContainer}>
          <h3>¿Qué ofrecemos?</h3>
        <div>
          <h4>Información Detallada</h4>
          <p>
            Tenemos una base de datos con información detallada sobre diversas
            razas de perros. Te proporcionamos datos precisos y confiables para
            que tomes decisiones informadas.
          </p>
        </div>
        <div>
          <h4>Fotos Originales</h4>
          <p>
            Explora nuestra galería de fotos adorables de perros de todas las
            razas. ¡Nada mejor que ver a estos encantadores caninos en acción
            para entender sus personalidades únicas!
          </p>
        </div>
        <div>
          <h4>Herramientas de Filtrado</h4>
          <p>
            ¿Buscas una raza específica? <br /> Utiliza nuestras herramientas de filtrado te ayudará a encontrar a tu mejor compañero perruno que se adapte perfectamente a tu estilo de vida.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
