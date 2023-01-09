import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dateFormatter } from "~/utils/formatters";
import { trpc } from "~/utils/trpc";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteLetterModal from "~/components/modals/DeleteLetterModal";
import PageTitle from "~/components/PageTitle";

const TableLoading = () => {
  return (
    <div className="flex w-full animate-pulse flex-col gap-y-2">
      <div className="bg-gray-400 p-4"></div>
      <div className="bg-gray-400 p-4"></div>
      <div className="bg-gray-400 p-4"></div>
      <div className="bg-gray-400 p-4"></div>
    </div>
  );
};

const History: NextPage = () => {
  const { status: sessionStatus } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const { data: list, isLoading } = trpc.coverLetters.list.useQuery(undefined, {
    enabled: sessionStatus === "authenticated",
  });

  const showCoverLetter = (id: number) => {
    router.push(`/letters/${id}`);
  };

  const openDeleteModal = (id: number) => {
    setModalOpen(true);
    setModalId(id);
  };

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
      <PageTitle text={"Your cover letters"} />

      <DeleteLetterModal
        open={modalOpen}
        setOpen={setModalOpen}
        letterId={modalId}
      />

      {isLoading && <TableLoading />}

      {!isLoading && (!list || list.length === 0) && (
        <p>You have no cover letters yet.</p>
      )}

      {list && list.length > 0 && (
        <div>
          <p className="mb-2 font-bold">
            Showing {list.length} of {list.length} cover letters
          </p>
          <div>
            <table className="w-full px-4 text-left">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Job Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list?.map((l) => (
                  <tr key={l.id} className=" hover:bg-gray-300">
                    <td onClick={() => showCoverLetter(l.id)}>
                      {dateFormatter.format(l.createdAt)}
                    </td>
                    <td onClick={() => showCoverLetter(l.id)}>{l.jobTitle}</td>
                    <td>
                      <button onClick={() => openDeleteModal(l.id)}>
                        <RiDeleteBin6Line className="text-2xl text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default History;
