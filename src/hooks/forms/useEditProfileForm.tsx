import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "~/utils/trpc";

const BIO_MIN_LENGTH = 10;
const BIO_MAX_LENGTH = 1000;

export const editProfileSchema = z.object({
  bio: z
    .string()
    .min(BIO_MIN_LENGTH, {
      message: `Bio  must be at least ${BIO_MIN_LENGTH} characters`,
    })
    .max(BIO_MAX_LENGTH, {
      message: `Bio can be maximum ${BIO_MAX_LENGTH} characters`,
    }),
});

export type EditProfileInputs = z.infer<typeof editProfileSchema>;

const useEditProfileForm = () => {
  const { register, handleSubmit, formState, reset } =
    useForm<EditProfileInputs>({
      mode: "onTouched",
      resolver: zodResolver(editProfileSchema),
    });

  const { data: response, mutate: updateProfile } =
    trpc.user.update.useMutation();

  const onSubmit = handleSubmit((data) => {
    updateProfile(data);
  });

  return {
    register,
    handleSubmit: onSubmit,
    formState,
    response,
    reset,
  };
};

export default useEditProfileForm;
