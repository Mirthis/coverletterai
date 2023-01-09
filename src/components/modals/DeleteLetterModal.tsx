import React from "react";
import { Dialog } from "@headlessui/react";
import { BsExclamationTriangle } from "react-icons/bs";
import Modal from "./Modal";
import { trpc } from "~/utils/trpc";
import Spinner from "../ui/Spinner";

const DeleteLetterModal = ({
  open,
  setOpen,
  letterId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  letterId: number;
}) => {
  const utils = trpc.useContext();

  const { mutate: executeDelete, isLoading } =
    trpc.coverLetters.delete.useMutation({
      onSuccess: () => {
        utils.coverLetters.list.invalidate();
        setOpen(false);
      },
    });

  const deleteLetter = () => {
    executeDelete({ id: letterId });
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <BsExclamationTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Deactivate account
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {!isLoading && (
            <>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => deleteLetter()}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </>
          )}
          <div className="flex justify-center">
            {isLoading && <Spinner bgColor="gray-400" color="white" />}
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default DeleteLetterModal;
