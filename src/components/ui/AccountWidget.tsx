import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { Fragment } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import Link from "next/link";

const AccountWidget = () => {
  const { status: sessionStatus, data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {sessionStatus === "unauthenticated" && (
        <button
          className="rounded-xl font-bold text-red-600  no-underline transition hover:bg-gray-300"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
      {sessionStatus === "authenticated" && (
        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
              <div className="relative">
                {session.user?.image ? (
                  <Image
                    src={session.user?.image}
                    width="40"
                    height="40"
                    className="h-10 w-10 rounded-full"
                    alt="avatar"
                  />
                ) : (
                  <RxAvatar className="h-10 w-10 text-gray-600" />
                )}
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/profile">
                        <button
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <RxAvatar className="mr-2 h-5 w-5" />
                          Profile
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => signOut()}
                      >
                        <BiLogOutCircle className="mr-2 h-5 w-5" />
                        Sing-out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
};

export default AccountWidget;
