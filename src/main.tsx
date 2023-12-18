import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

export const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries : {
        staleTime: Infinity
      }
    }
  }
);

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root"),
);