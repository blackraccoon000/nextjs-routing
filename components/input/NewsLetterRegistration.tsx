import classes from "./NewsLetterRegistration.module.css";
import { FormEventHandler, useContext, useRef } from "react";
import NotificationContext from "../../store/NotificationContext";
import {
  errorNewsData,
  ntfCtxShowError,
  ntfCtxShowPending,
  ntfCtxShowSuccess,
  pendingNewsData,
  successNewsData,
} from "../../helpers/ctxUtilites";

const NewsletterRegistration = (): JSX.Element => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;

    ntfCtxShowPending(notificationCtx, pendingNewsData);

    const body = JSON.stringify({ email: enteredEmail });
    const init: RequestInit = {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/newsletter", init);
    const data = await response.json();

    if (response.ok) {
      ntfCtxShowSuccess(notificationCtx, successNewsData);
    } else {
      ntfCtxShowError(notificationCtx, errorNewsData(data));
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
