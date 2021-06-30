import { FormEventHandler, useRef, useState } from "react";

const ContactPage = (): JSX.Element => {
  const initialState = {
    message: "",
    feedback: {
      id: "",
      email: "",
      feedback: "",
    },
  };
  const [feedbackResult, setFeedbackResult] = useState(initialState);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const email = emailInputRef.current ? emailInputRef.current.value : "";
    const feedback = feedbackInputRef.current
      ? feedbackInputRef.current.value
      : "";
    const body: string = JSON.stringify({ email, feedback });
    const init: RequestInit = {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/feedback", init);
    const data = await response.json();
    setFeedbackResult(data);
  };

  return (
    <div>
      <h1>The Contact Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id={"email"} ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            name="feedback"
            id="feedback"
            cols={30}
            rows={5}
            ref={feedbackInputRef}
          />
        </div>
        <button>Submit</button>
      </form>
      {feedbackResult.message !== "" && (
        <div>
          <h2>message:{feedbackResult.message}</h2>
          <ul>
            <li>id:{feedbackResult.feedback.id}</li>
            <li>email:{feedbackResult.feedback.email}</li>
            <li>feedback:{feedbackResult.feedback.feedback}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default ContactPage;
