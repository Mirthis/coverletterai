import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CoverLetterRequest from "~/components/CoverLetterRequest";
import { dateTimeFormatter } from "~/utils/formatters";
import { trpc } from "~/utils/trpc";

const Loader = ({
  outerBlocks,
  innerBlocks,
}: {
  outerBlocks: number;
  innerBlocks: number[];
}) => {
  const outer = new Array(outerBlocks).fill(0);

  return (
    <div>
      {outer.map((_, i) => (
        <div
          key={`loader-out-${i}`}
          className="mb-4 flex w-full animate-pulse flex-col space-y-4"
        >
          <div className=" bg-gray-400 p-4"></div>
          {new Array(innerBlocks[i]).fill(0).map((_, j) => (
            <div
              key={`loader-in-${i}-${j}`}
              className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 sm:grid-cols-[200px_1fr]"
            >
              <div className=" bg-gray-400 p-2"></div>
              <div className=" bg-gray-400 p-2"></div>
              <div></div>

              <div className="flex flex-col space-y-1">
                <div className=" bg-gray-400 p-2"></div>
                <div className=" bg-gray-400 p-2"></div>
                <div className=" bg-gray-400 p-2"></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const History: NextPage = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const { data: letter, isLoading } = trpc.coverLetters.single.useQuery(
    { id: Number(id || -1) },
    { enabled: !!id }
  );

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

      {isLoading && <Loader outerBlocks={2} innerBlocks={[1, 3]} />}

      {letter && (
        <div>
          <h2 className="mb mb-4 text-4xl">
            Cover Letter for {letter.jobTitle}
          </h2>
          <p>Created on: {dateTimeFormatter.format(letter.createdAt)} </p>
          <div className="grid grid-cols-[100px_1fr] gap-x-4 sm:grid-cols-[200px_1fr]">
            <p></p>
            <p>{letter.coverLetter}</p>
          </div>
          <CoverLetterRequest request={letter} />
        </div>
      )}
    </>
  );
};

export default History;
