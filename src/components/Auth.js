import React, { useState } from "react";
import FormStatus from "./FormStatus";
import FormField from "./FormField";
import SectionButton from "./SectionButton";
import { Link } from "./../util/router.js";
import "./Auth.scss";

function Auth(props) {
  // State for all inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Whether to show errors
  // We set to true if they submit and there are errors.
  // We only show errors after they submit because
  // it's annoying to see errors while typing.
  const [showErrors, setShowErrors] = useState(false);

  // Error array we'll populate
  let errors = [];

  // Function for fetching error for a field
  const getError = field => {
    return errors.find(e => e.field === field);
  };

  // Function to see if field is empty
  const isEmpty = val => val.trim() === "";

  // Add error if email empty
  if (["signin", "signup"].includes(props.mode)) {
    if (isEmpty(email)) {
      errors.push({
        field: "email",
        message: "Please enter an email"
      });
    }
  }

  // Add error if password empty
  if (["signin", "signup"].includes(props.mode)) {
    if (isEmpty(password)) {
      errors.push({
        field: "password",
        message: "Please enter a password"
      });
    }
  }

  // Add error if confirmPass empty or
  // if it doesn't match pass.
  // Only for signup view.
  if (["signup"].includes(props.mode)) {
    if (isEmpty(confirmPass)) {
      errors.push({
        field: "confirmPass",
        message: "Please confirm password"
      });
    } else if (password !== confirmPass) {
      errors.push({
        field: "confirmPass",
        message: `This doesn't match your password`
      });
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    // If field errors then show them
    if (errors.length) {
      setShowErrors(true);
    } else {
      // Otherwise call onSubmit with email/pass
      if (props.onSubmit) {
        props.onSubmit({
          email,
          password
        });
      }
    }
  };

  return (
    <div className="Auth">
      {props.status && props.status.message && (
        <FormStatus type={props.status.type} message={props.status.message} />
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {["signup", "signin"].includes(props.mode) && (
          <FormField
            value={email}
            type="email"
            placeholder="Email"
            error={showErrors && getError("email")}
            onChange={value => setEmail(value)}
          />
        )}

        {["signup", "signin"].includes(props.mode) && (
          <FormField
            value={password}
            type="password"
            placeholder="Password"
            error={showErrors && getError("password")}
            onChange={value => setPassword(value)}
          />
        )}

        {["signup"].includes(props.mode) && (
          <FormField
            value={confirmPass}
            type="password"
            placeholder="Confirm Password"
            error={showErrors && getError("confirmPass")}
            onChange={value => setConfirmPass(value)}
          />
        )}

        <div className="field">
          <p className="control ">
            <SectionButton
              parentColor={props.parentColor}
              size="medium"
              fullWidth={true}
              state={
                props.status && props.status.type === "pending"
                  ? "loading"
                  : "normal"
              }
            >
              {props.buttonText}
            </SectionButton>
          </p>
        </div>

        {["signup", "signin"].includes(props.mode) && (
          <div className="Auth__bottom-link has-text-centered">
            {props.mode === "signup" && (
              <>
                Have an account already?
                <Link to="/signin">Sign in</Link>
              </>
            )}

            {props.mode === "signin" && (
              <>
                <Link to="/signup">Create an account</Link>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default Auth;
