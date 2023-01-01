import { type NextPage } from "next";
import Head from "next/head";
import GenerateLetterForm from "~/components/forms/GenerateLetterForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cover Letter Generator</title>
        <meta
          name="description"
          content="Instant cover letters, powered by AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-300">
        <div className="container flex max-w-5xl flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-700 sm:text-[5rem]">
            Create <span className="text-red-500">Cover Letters</span> Instantly
          </h1>
          <GenerateLetterForm />
        </div>
      </main>
    </>
  );
};

export default Home;
