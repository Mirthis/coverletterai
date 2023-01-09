import useEditProfileForm from "~/hooks/forms/useEditProfileForm";
import TextInput from "./TextInput";

const EditProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useEditProfileForm();

  return (
    <div className={`w-full`}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-[2fr_1fr]">
            <TextInput
              placeholder="Bio"
              {...register("bio")}
              error={errors.bio}
              generateLabel={true}
            />
            <div>
              <p className="text-sm">
                Details on <span className="font-bold">your experience</span>{" "}
                will help create a more tailored cover letter. This can include
                years of experience, relevant specific skills or professional
                certifications or and past work experiences and roles.
              </p>
            </div>

            <button
              type="submit"
              className="text-bold rounded-xl bg-red-600 py-2 px-4 text-white hover:bg-red-500 disabled:bg-gray-600"
              disabled={isSubmitting || !isValid}
            >
              Create Cover Letter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
