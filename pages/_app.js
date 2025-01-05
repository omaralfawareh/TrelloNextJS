import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { AuthContextProvider } from "@/store/auth-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider initialUser={pageProps.user}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
