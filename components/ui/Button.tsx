import Link from "next/link";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

type Props = { children: React.ReactNode; link?: string; onClick?: () => void };

const Button = ({ children, link, onClick }: Props) => {
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
