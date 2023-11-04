const Section = ({ title, text, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </section>
  )
}
export default Section