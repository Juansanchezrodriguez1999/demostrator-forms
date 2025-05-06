import "@/styles/globals.css";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Auth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Cargando...</div>;
  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? <Auth><Component {...pageProps} /></Auth> : <Component {...pageProps} />}
    </SessionProvider>
  );
}