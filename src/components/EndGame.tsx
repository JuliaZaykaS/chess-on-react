import React, { FC } from "react";

interface EndGameProps {
  text: string;
  type: string;
}

export const EndGame: FC<EndGameProps> = ({ text, type }) => {
  let styles;
  if (type === "win") {
    styles = "winMessage";
  } else if (type === "lose") {
    styles = "loseMessage";
  } else if (type === "check") {
    styles = "checkMessage";
  }
  return <div className={["message", styles].join(" ")}>{text}</div>;
};
