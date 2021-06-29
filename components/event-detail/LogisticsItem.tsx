import classes from "./LogisticsItem.module.css";
import PropTypes from "prop-types";
import React from "react";

function LogisticsItem({
  icon: Icon,
  children,
}: {
  icon: () => JSX.Element;
  children: React.ReactNode;
}): JSX.Element {
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
