import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        size: 1320,
      },
    },
  },
});


export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <App />
        </ModalsProvider>
        <Notifications />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
