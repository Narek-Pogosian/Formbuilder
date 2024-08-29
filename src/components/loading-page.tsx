import { Loader } from "lucide-react";
import React from "react";

function LoadingPage() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}

export default LoadingPage;
