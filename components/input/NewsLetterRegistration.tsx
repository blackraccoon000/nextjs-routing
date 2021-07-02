import classes from "./NewsLetterRegistration.module.css";
import { FormEventHandler, useContext, useRef } from "react";
import NotificationContext from "../../store/NotificationContext";

const NewsletterRegistration = (): JSX.Element => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    const body = JSON.stringify({ email: enteredEmail });
    const init: RequestInit = {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await fetch("/api/newsletter", init)
        .then((response) => response)
        .catch((reason) => {
          console.log("1:", reason);
          return Promise.reject(reason);
        })
        .then((response) => {
          if (response.ok) {
            notificationCtx.showNotification({
              title: "Success!",
              message: "Successfully Registered for newsletter",
              status: "success",
            });
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message || "something went wrong!");
          });
        })
        .then((data) => console.log("client catch:", data))
        .catch((reason) => {
          console.log("2:", reason);
          return Promise.reject(reason);
        });
    } catch (error) {
      console.log("Error:", error);
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "something went wrong!",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
