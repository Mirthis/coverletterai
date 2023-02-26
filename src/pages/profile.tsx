import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import DeleteProfileModal from "~/components/modals/DeleteProfileModal";
import { trpc } from "~/utils/trpc";
import EditProfileModal from "~/components/modals/EditProfileModal";
import PageTitle from "~/components/PageTitle";

const ProfilePage: NextPage = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: user } = trpc.user.get.useQuery();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  return (
    <div>
      <DeleteProfileModal open={deleteModalOpen} setOpen={setDeleteModalOpen} />
      <EditProfileModal
        open={editModalOpen}
        setOpen={setEditModalOpen}
        user={user}
      />
      <div className="flex justify-between space-x-4 sm:justify-start">
        <PageTitle text={"Your profile"} />
        <button
          onClick={() => setEditModalOpen(true)}
          className="rounded-xl  px-2 hover:bg-blue-100"
        >
          <div className=" flex items-center gap-2 text-blue-600">
            <BiEditAlt className="text-2xl" />
            Edit
          </div>
        </button>
      </div>
      {user && (
        <div className="grid grid-cols-[100px_1fr] gap-4">
          <div>Experience</div>
          <div>{user.bio || "No experience yet"}</div>
          <div></div>
          <div>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex gap-x-2 rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
            >
              <RiDeleteBin6Line className="text-2xl text-white" />
              Delete profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
