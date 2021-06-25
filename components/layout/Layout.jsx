import { Fragment } from "react";
import PropTypes from "prop-types";
import MainHeader from "./MainHeader";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
