import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DashboardPage } from "./pages";

const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Toaster />
      <DashboardPage />
    </QueryClientProvider>
  );
};

export default App;
