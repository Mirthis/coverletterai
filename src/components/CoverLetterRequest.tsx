import { Transition } from "@headlessui/react";
import { useState } from "react";
import type { GenereLatterInputs } from "~/hooks/forms/useGenerateLetterForm";

const CoverLetterRequest = ({
  request: {
    jobTitle,
    jobDescription,
    fullName,
    companyName,
    applicantDetails,
    companyDetails,
  },
}: {
  request: GenereLatterInputs;
}) => {
  const [showRequest, setShowRequest] = useState<boolean>(false);

  return (
    <div className="my-4">
      <div className="flex justify-between">
        <h2 className="mb mb-4 text-4xl">Your Request</h2>
        <button
          onClick={() => setShowRequest((value) => !value)}
          className="text-red-500"
        >
          {showRequest ? "Hide" : "Show"}
        </button>
      </div>
      <Transition
        show={showRequest}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-[100px_1fr] gap-x-4 sm:grid-cols-[200px_1fr]">
          <div className="text-right font-bold">Job Title</div>
          <div>{jobTitle}</div>
          <div className="text-right font-bold">Job Description</div>
          <div>{jobDescription}</div>
          {companyName && (
            <>
              <div className="flex-shrink-0 text-right font-bold">
                Company Name
              </div>
              <div>{companyName}</div>
            </>
          )}
          {companyDetails && (
            <>
              <div className="text-right font-bold">Company Details</div>
              <div>{companyDetails}</div>
            </>
          )}
          {fullName && (
            <>
              <div className="text-right font-bold">Full name</div>
              <div>{fullName}</div>
            </>
          )}
          {applicantDetails && (
            <>
              <div className="text-right font-semibold">Applicant Details</div>
              <div>{applicantDetails}</div>
            </>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default CoverLetterRequest;
