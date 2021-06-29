import classes from "./ErrorAlert.module.css";
import PropTypes from "prop-types";

const ErrorAlert = ({ children }) => (
  <div className={classes.alert}>{children}</div>
);
ErrorAlert.propTypes = {
  children: PropTypes.node,
};

export default ErrorAlert;
