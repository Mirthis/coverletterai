import useGenerateLetter from "~/hooks/forms/useGenerateLetterForm";
import CoverLetterRequest from "../CoverLetterRequest";
import CoverLetterResponse from "../CoverLetterResponse";
import CoverLetterResponseLoader from "../CoverLetterResponseLoader";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

const GenerateLetterForm = () => {
  const {
    register,
    handleSubmit,
    response,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useGenerateLetter();

  const showForm = !isSubmitting && !response;

  return (
    <div className={`w-full`}>
      <div className={`${showForm ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <TextAreaInput
              placeholder="Job Description"
              {...register("jobDescription")}
              error={errors.jobDescription}
              required={true}
              rows={5}
              generateLabel={false}
            />
            <TextInput
              placeholder="Full Name (optional)"
              {...register("fullName")}
              error={errors.fullName}
              generateLabel={false}
            />
            <TextInput
              placeholder="Company Name (optional)"
              {...register("companyName")}
              error={errors.companyName}
              generateLabel={false}
            />
            <button
              type="submit"
              className="text-bold rounded-xl bg-red-600 py-2 px-4 text-white hover:bg-red-500 disabled:bg-gray-600"
              disabled={isSubmitting || !isValid}
            >
              Create Cover Letter
            </button>
          </div>
        </form>
      </div>
      {isSubmitting && <CoverLetterResponseLoader />}
      {response && <CoverLetterResponse response={response} />}
      {!showForm && <CoverLetterRequest request={getValues()} />}
    </div>
  );
};

export default GenerateLetterForm;
