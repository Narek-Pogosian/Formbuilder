import React from "react";

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-8 text-xl font-bold">{children}</h1>;
}

export default PageTitle;
