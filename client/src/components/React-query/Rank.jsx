import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import RankingTable from "../Top";

function Rank() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RankingTable />
    </QueryClientProvider>
  );
}

export default Rank;
