import React, { createContext, useEffect, useState } from "react";

export type Context = {
  notification: null | NotificationData;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
};

export type NotificationData = {
  title: string;
  message: string;
  status: string;
};

const NotificationContext: React.Context<Context> = createContext<Context>({
  notification: null,
  showNotification: (notificationData: NotificationData) => {
    console.log(notificationData); // Unused回避
  },
  hideNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    useState<null | NotificationData>(null);
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: NotificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context: Context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
