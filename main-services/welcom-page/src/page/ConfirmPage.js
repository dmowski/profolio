import React from "react";
import Confirm from "../component/Confirm";

export default function ConfirmPage() {
  return (
    <div
      style={{
        border: "3px dotted tomato",
        width: "500px",
        padding: "20px",
      }}
    >
      <h3>Confirm page</h3>
      <Confirm />
    </div>
  );
}
