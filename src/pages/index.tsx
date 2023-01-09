import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
// import {
//   BsFillPersonFill,
//   BsSpeedometer2,
//   BsFillBrushFill,
// } from "react-icons/bs";

const Home: NextPage = () => {
  const { status: sessionStatus } = useSession();

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

      <div className="text-center tracking-tight">
        <div className="mb-4 ">
          <h1 className="mb-4 text-5xl font-extrabold sm:text-[5rem]">
            Professional <br />
            <span className="text-red-500">Cover Letters</span>
            <br />
            Instantly
          </h1>
          <p className="text-xl sm:text-2xl">
            Tailored cover letters to make your application stands out in the
            crowd.
            <br />
            Generated instantly, powered by Artifical Intelligence.
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-x-4">
          <button className="text-bold rounded-xl border border-red-600 bg-red-600 py-2 px-4 text-2xl text-white hover:bg-red-500">
            <Link href="/create">Get Started</Link>
          </button>
          {sessionStatus === "unauthenticated" && (
            <div>
              <button
                onClick={() => signIn()}
                className="text-bold rounded-xl border border-red-600 bg-white py-2 px-4 text-2xl text-red-600 hover:bg-gray-200"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
        {/* <div className="mt-16 grid grid-cols-1 space-x-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-y-4 rounded-xl  bg-white p-4">
            <BsFillBrushFill className="text-7xl" />
            <h3 className="text-2xl font-bold">Personalized</h3>
            <p className="text-lg">
              Tailored cover letters to make your application stands out in the
              crowd.
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-4 rounded-xl  bg-white p-4">
            <BsSpeedometer2 className="text-7xl" />
            <h3 className="text-2xl font-bold">Instant</h3>
            <p className="text-lg">
              No more waiting for days to get a professionally written cover
              letter.
            </p>
            <p> Get it instantly.</p>
          </div>
          <div className="flex flex-col items-center gap-y-4 rounded-xl  bg-white p-4">
            <BsFillPersonFill className="text-7xl" />
            <h3 className="text-2xl font-bold">Your account</h3>
            <p className="text-lg">
              Sign-in to your account to access previosuly generated cover
              letters.
            </p>
            <p>Use your profile details for future cover letters.</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
