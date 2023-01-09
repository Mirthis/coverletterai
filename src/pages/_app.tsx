import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Navbar from "~/components/NavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col items-center">
        <Navbar />
        <div className="container max-w-5xl justify-center  py-20 px-4">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
