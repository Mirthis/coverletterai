import type {} from "next";
import type { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import { FaGoogle, FaTwitter } from "react-icons/fa";

const SigninPage = ({ providers }: { providers: Provider }) => {
  const signInWrapper = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/" });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center gap-y-4">
          {Object.values(providers).map((provider) => {
            if (provider.id === "google") {
              return (
                <div key="google">
                  <button
                    onClick={() => signInWrapper(provider.id)}
                    className="flex items-center gap-x-4 rounded-xl bg-red-600 px-4 py-4 text-xl font-bold text-white"
                  >
                    <FaGoogle />
                    Sign in with Google
                  </button>
                </div>
              );
            }
            if (provider.id === "twitter") {
              return (
                <div key="twitter">
                  <button
                    onClick={() => signInWrapper(provider.id)}
                    className="flex items-center gap-x-4 rounded-xl bg-blue-500 px-4 py-4 text-xl font-bold text-white"
                  >
                    <FaTwitter />
                    Sign in with Twitter
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

export default SigninPage;
