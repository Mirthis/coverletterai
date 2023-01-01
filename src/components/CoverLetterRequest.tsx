import type { GenereLatterInputs } from "~/hooks/forms/useGenerateLetterForm";

const CoverLetterRequest = ({
  request: { jobDescription, fullName, companyName },
}: {
  request: GenereLatterInputs;
}) => {
  return (
    <div className="my-4">
      <h2 className="mb mb-4 text-4xl">Your Request</h2>
      <div className="grid grid-cols-[100px_1fr] gap-x-4 sm:grid-cols-[200px_1fr]">
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
        {fullName && (
          <>
            <div className="text-right font-bold">Full name</div>
            <div>{fullName}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoverLetterRequest;
