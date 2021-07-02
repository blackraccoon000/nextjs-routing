import React, { createContext, useState } from "react";

export type Context = {
  notification: null;
  showNotification: (notificationData: any) => void;
  hideNotification: () => void;
};

export type NotificationData = {
  title: string;
  message: string;
  status: string;
};

const NotificationContext: React.Context<Context> = createContext({
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
  const [activeNotification, setActiveNotification] = useState<any>(null);
  const showNotificationHandler = (notificationData: any) => {
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
