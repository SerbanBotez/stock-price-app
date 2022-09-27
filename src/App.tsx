import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardPage } from "./pages";

const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <DashboardPage />
    </QueryClientProvider>
  );
};

export default App;
