const Section = ({ title, text, children, className }) => {
  return (
    <section className={className}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        {children}
      </div>
    </section>
  );
};
export default Section;