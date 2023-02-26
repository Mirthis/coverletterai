import React, { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal";
import { trpc } from "~/utils/trpc";
import Spinner from "../ui/Spinner";
import { BiEditAlt } from "react-icons/bi";
import useEditProfileForm from "~/hooks/forms/useEditProfileForm";
import TextAreaInput from "../forms/TextAreaInput";
import type { User } from "@prisma/client";

const EditProfileModal = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined | null;
}) => {
  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
    reset,
  } = useEditProfileForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setOpen(false);
      utils.user.get.invalidate();
    }
  }, [isSubmitSuccessful, setOpen, reset, utils.user.get]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mb-4 items-center gap-x-2 sm:flex">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <BiEditAlt
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>
              </div>

              <div className={`w-full`}>
                <TextAreaInput
                  placeholder="Your experience"
                  {...register("bio")}
                  error={errors.bio}
                  generateLabel={false}
                  defaultValue={user?.bio || ""}
                  rows={5}
                />
                <div className="mt-2">
                  <p className="text-sm">
                    Details on{" "}
                    <span className="font-bold">your experience</span> will help
                    create a more tailored cover letter. This can include years
                    of experience, relevant specific skills or professional
                    certifications or and past work experiences and roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {!isSubmitting && (
              <>
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={isSubmitting || !isValid}
                >
                  Save
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
              {isSubmitting && (
                <Spinner bgColor="gray-400" color="white" text="Saving..." />
              )}
            </div>
          </div>
        </form>
      </Dialog.Panel>
    </Modal>
  );
};

export default EditProfileModal;
