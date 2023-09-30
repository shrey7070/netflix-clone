import { FC } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles: FC = () => {
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-center text-white">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-16">
          <div>
            <div className="group flex-row  mx-auto">
              <div
                className="rounded-md flex items-center justify-center border-2 border-transparent
              group-hover:cursor-pointer group-hover:border-white overflow-hidden
              "
              >
                <Image
                  width={100}
                  height={100}
                  src="/images/profile_blue.jpg"
                  alt="profile"
                />
              </div>
              <div className="mt-4 text-gray-400 text-center group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;