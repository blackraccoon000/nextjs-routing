import classes from "./LogisticsItem.module.css";
import PropTypes from "prop-types";

function LogisticsItem({ icon: Icon, children }) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span>{children}</span>
    </li>
  );
}

LogisticsItem.propTypes = {
  icon: PropTypes.func,
  children: PropTypes.node,
};

export default LogisticsItem;
