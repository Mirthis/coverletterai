import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "~/utils/trpc";

const FULL_NAME_MIN_LENGTH = 2;
const FULL_NAME_MAX_LENGTH = 30;
const COMPANY_NAME_MIN_LENGTH = 2;
const COMPANY_NAME_MAX_LENGTH = 20;
const JOB_TITLE_MIN_LENGTH = 5;
const JOB_TITLE_MAX_LENGTH = 30;
const JD_MIN_LENGTH = 20;
const JD_MAX_LENGTH = 10000;

export const generateLetterSchema = z.object({
  fullName: z.union([
    z
      .string()
      .min(FULL_NAME_MIN_LENGTH, {
        message: `First name must be at least ${FULL_NAME_MIN_LENGTH} characters`,
      })
      .max(FULL_NAME_MAX_LENGTH, {
        message: `Author name can be maximum ${FULL_NAME_MAX_LENGTH} characters`,
      }),
    z.string().length(0),
    z.null(),
  ]),
  companyName: z.union([
    z
      .string()
      .min(COMPANY_NAME_MIN_LENGTH, {
        message: `Company name must be at least ${COMPANY_NAME_MIN_LENGTH} characters`,
      })
      .max(COMPANY_NAME_MAX_LENGTH, {
        message: `Company name can be maximum ${COMPANY_NAME_MAX_LENGTH} characters`,
      }),
    z.string().length(0),
    z.null(),
  ]),
  jobTitle: z
    .string()
    .min(JOB_TITLE_MIN_LENGTH, {
      message: `Job title must be at least ${JOB_TITLE_MIN_LENGTH} characters`,
    })
    .max(JOB_TITLE_MAX_LENGTH, {
      message: `Job title can be maximum ${JOB_TITLE_MAX_LENGTH} characters`,
    }),
  jobDescription: z
    .string()
    .min(JD_MIN_LENGTH, {
      message: `Job description must be at least ${JD_MIN_LENGTH} characters`,
    })
    .max(JD_MAX_LENGTH, {
      message: `Job description can be maximum ${JD_MAX_LENGTH} characters`,
    }),
  companyDetails: z.union([
    z
      .string()
      .min(JD_MIN_LENGTH, {
        message: `About you must be at least ${JD_MIN_LENGTH} characters`,
      })
      .max(JD_MAX_LENGTH, {
        message: `Job you can be maximum ${JD_MAX_LENGTH} characters`,
      }),
    z.string().length(0),
    z.null(),
  ]),
  applicantDetails: z.union([
    z
      .string()
      .min(JD_MIN_LENGTH, {
        message: `About you must be at least ${JD_MIN_LENGTH} characters`,
      })
      .max(JD_MAX_LENGTH, {
        message: `Job you can be maximum ${JD_MAX_LENGTH} characters`,
      }),
    z.string().length(0),
    z.null(),
  ]),
  // .min(JD_MIN_LENGTH, {
  //   message: `About you must be at least ${JD_MIN_LENGTH} characters`,
  // })
  // .max(JD_MAX_LENGTH, {
  //   message: `Job you can be maximum ${JD_MAX_LENGTH} characters`,
  // })
});

export type GenereLatterInputs = z.infer<typeof generateLetterSchema>;

const useGenerateLetter = () => {
  const { register, handleSubmit, formState, getValues } =
    useForm<GenereLatterInputs>({
      mode: "onTouched",
      resolver: zodResolver(generateLetterSchema),
    });

  const { data: response, mutateAsync: generateLetter } =
    trpc.coverLetters.generate.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await generateLetter(data);
  });

  return {
    register,
    handleSubmit: onSubmit,
    formState,
    response,
    getValues,
  };
};

export default useGenerateLetter;
