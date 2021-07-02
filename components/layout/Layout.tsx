import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/NotificationContext";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification: any = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
