import { Link } from "react-router-dom"

const ButtonNormal = ({ link, buttonName }) => {
  return (
    <Link to={link}>
        <button>
            {buttonName}
        </button>
    </Link>
  )
}
export default ButtonNormal