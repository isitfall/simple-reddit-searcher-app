import React, { ReactElement, FC } from "react";

interface Container {
  children: ReactElement;
}

export const Container: FC<Container> = ({ children }) => (
  <div className="p-5 flex flex-col items-center">{children}</div>
);
