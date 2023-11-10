import style from "./Error.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Error = ({ error }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);

  if (!visible) {
    return null;
  }

  return (
    <div className={style.fetchError}>
      <p>{error}</p>
    </div>
  );
};
export default Error;
