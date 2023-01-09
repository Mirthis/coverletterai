import { type NextPage } from "next";
import Head from "next/head";
import GenerateLetterForm from "~/components/forms/GenerateLetterForm";
import PageTitle from "~/components/PageTitle";

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
      <GenerateLetterForm />
    </>
  );
};

export default Create;
