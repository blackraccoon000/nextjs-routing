import classes from "./ErrorAlert.module.css";
import PropTypes from "prop-types";
import { ReactNode } from "react";

const ErrorAlert = ({ children }: { children: ReactNode }) => (
  <div className={classes.alert}>{children}</div>
);
ErrorAlert.propTypes = {
  children: PropTypes.node,
};

export default ErrorAlert;
