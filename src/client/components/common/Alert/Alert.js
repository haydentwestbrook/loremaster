import React from "react";

const Alert = props => {
  const { success, message, show } = props;
  if (show)
    return (
      <div className={"alert " + (success ? "alert-success" : "alert-danger")}>
        {message}
      </div>
    );
  return null;
};

export default Alert;
