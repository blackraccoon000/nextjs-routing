import Link from "next/link";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const Button = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
