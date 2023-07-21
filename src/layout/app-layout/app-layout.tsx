import React, { FC, ReactElement } from "react";

interface AppLayout {
  headerChildren: ReactElement;
  children: ReactElement;
  showSection: boolean;
}

export const AppLayout: FC<AppLayout> = ({ headerChildren, children, showSection }) => {
  return (
    <main className="h-screen bg-black">
      <header
        className={`app-header flex flex-row justify-center align-center transition-all ease-in-out duration-300 ${
          showSection ? "h-1/5" : "h-full"
        }`}
      >
        {headerChildren}
      </header>
      <section
        className={`overflow-y-scroll transition-all ease-in-out duration-300 ${
          showSection ? "h-4/5" : "h-0"
        }`}
      >
        {children}
      </section>
    </main>
  );
};
