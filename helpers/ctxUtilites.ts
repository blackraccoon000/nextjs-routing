import { Context } from "../store/NotificationContext";

type Data = {
  title: string;
  message: string;
  status: string;
};

const pendingData: Data = {
  title: "Signing up...",
  message: "Registering for newsletter",
  status: "pending",
};
const successData: Data = {
  title: "Success!",
  message: "Successfully Registered for newsletter",
  status: "success",
};

const errorData = (error: any): Data => ({
  title: "Error!",
  message: error.message || "something went wrong!",
  status: "error",
});

/**
 *
 * @param context
 * @param data
 */
export const ntfCtxShowPending = (
  context: Context,
  data: Data = pendingData
): void => {
  context.showNotification(data);
};

/**
 *
 * @param context
 * @param data
 */
export const ntfCtxShowSuccess = (
  context: Context,
  data: Data = successData
): void => {
  context.showNotification(data);
};

/**
 *
 * @param context
 * @param error
 * @param data
 */
export const ntfCtxShowError = (
  context: Context,
  error: any,
  data: Data = errorData(error)
): void => {
  context.showNotification(data);
};
