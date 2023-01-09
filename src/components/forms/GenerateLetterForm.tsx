import { Switch } from "@headlessui/react";
import { useState } from "react";
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
  const [showHelp, setShowHelp] = useState(true);

  return (
    <div className={`w-full`}>
      <div className={`${showForm ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex space-x-2">
              <p className="text-sm">Show help</p>
              <Switch
                checked={showHelp}
                onChange={setShowHelp}
                className={`${showHelp ? "bg-blue-500" : "bg-blue-600"}
          relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${showHelp ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="grid w-full grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-[2fr_1fr]">
              <TextInput
                placeholder="Job Title"
                {...register("jobTitle")}
                error={errors.jobTitle}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  The <span className="font-bold">job title</span> will be used
                  to make the cover letter more specfic and relevant for the
                  position you are applying to.
                </p>
              </div>
              <TextAreaInput
                placeholder="Job Description"
                {...register("jobDescription")}
                error={errors.jobDescription}
                required={true}
                rows={5}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  The <span className="font-bold">job description</span> for the
                  job you are applying to. It can simply be a copy paste from a
                  job search site.
                </p>
              </div>
              <TextAreaInput
                placeholder="Company descripton (optional)"
                {...register("companyDetails")}
                error={errors.companyDetails}
                rows={5}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  The <span className="font-bold">compnay descriptin</span> will
                  be used to include contexctual information to your cover
                  letter.
                </p>
              </div>
              <TextAreaInput
                placeholder="About your experience (optional)"
                {...register("applicantDetails")}
                error={errors.applicantDetails}
                rows={5}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  Details on <span className="font-bold">your experience</span>{" "}
                  will help create a more tailored cover letter. This can
                  include years of experience, relevant specific skills or
                  professional certifications or and past work experiences and
                  roles.
                </p>
              </div>
              <TextInput
                placeholder="Full Name (optional)"
                {...register("fullName")}
                error={errors.fullName}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  Your <span className="font-bold">full name</span> may be used
                  in the text of the cover letter, but can be left blank.
                </p>
              </div>
              <TextInput
                placeholder="Company Name (optional)"
                {...register("companyName")}
                error={errors.companyName}
                generateLabel={false}
              />
              <div className={`${showHelp ? "visible" : "hidden"} sm:visible`}>
                <p className="text-sm">
                  The <span className="font-bold">company name</span> offering
                  the job may be used in the text of the cover letter, but can
                  be left blank.
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
      {isSubmitting && <CoverLetterResponseLoader />}
      {response && <CoverLetterResponse response={response.coverLetter} />}
      {!showForm && <CoverLetterRequest request={getValues()} />}
    </div>
  );
};

export default GenerateLetterForm;
