import ButtonNormal from "../../components/button-normal/ButtonNormal"
const Landing = () => {
  return (
    <div>
        <h1>Welcome!</h1>
        <ButtonNormal link={'/home'} buttonName={'Start'} />
    </div>
  )
}
export default Landing