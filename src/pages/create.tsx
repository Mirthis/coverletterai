import { type NextPage } from "next";
import Head from "next/head";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import GenerateLetterForm from "~/components/forms/GenerateLetterForm";
import PageTitle from "~/components/PageTitle";
import { env } from "~/env/client.mjs";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cover Letter Generator</title>
        <meta
          name="description"
          content="Instant cover letters, powered by AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle text={"New cover letter"} />
      <GoogleReCaptchaProvider
        reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <GenerateLetterForm />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Create;
