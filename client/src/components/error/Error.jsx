import style from "./Error.module.css";
import { useState, useEffect } from "react";

const Error = ({ error }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
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
