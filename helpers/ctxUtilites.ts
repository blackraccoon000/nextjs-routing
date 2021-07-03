import { Context } from "../store/NotificationContext";

type Data = {
  title: string;
  message: string;
  status: string;
};

export const pendingNewsData: Data = {
  title: "Signing up...",
  message: "Registering for newsletter",
  status: "pending",
};
export const successNewsData: Data = {
  title: "Success!",
  message: "Successfully Registered for newsletter",
  status: "success",
};

export const errorNewsData = (error?: any): Data => ({
  title: "Error!",
  message: error?.message || "something went wrong!!",
  status: "error",
});

export const pendingCommentData: Data = {
  title: "Signing up...",
  message: "Registering for Comments",
  status: "pending",
};
export const successCommentData: Data = {
  title: "Success!",
  message: "Successfully Registered for Comments",
  status: "success",
};

export const errorCommentData = (error?: any): Data => ({
  title: "Error!",
  message: error?.message || "something went wrong!!",
  status: "error",
});

/**
 *
 * @param context
 * @param data
 */
export const ntfCtxShowPending = (context: Context, data: Data): void => {
  context.showNotification(data);
};

/**
 *
 * @param context
 * @param data
 */
export const ntfCtxShowSuccess = (context: Context, data: Data): void => {
  context.showNotification(data);
};

/**
 *
 * @param context
 * @param data
 */
export const ntfCtxShowError = (context: Context, data: Data): void => {
  context.showNotification(data);
};
