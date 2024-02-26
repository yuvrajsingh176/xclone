import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BsTwitterX } from "react-icons/bs";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaSlash,  } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoMdMail } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { LiaListSolid } from "react-icons/lia";
import { useCurrentUser } from "@/app/hooks/user";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/app/graphql/query/user";
import Link from "next/link";

interface TwitterLayoutProps {
    children:React.ReactNode
}
interface Twittersidebar {
    title: string;
  icon: React.ReactNode;
  link:string
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
const queryClient = useQueryClient();
    
  const { user } = useCurrentUser();
const sidebarMenuItems:Twittersidebar[]=useMemo(()=>  [
  {
    title: "Home",
    icon: <GoHomeFill />,
    link:"/"
  },
  {
    title: "Explore",
    icon: <CiSearch />,
    link:"/"

  },
  {
    title: "Notifications",

    icon: <IoNotificationsSharp />,
    link:"/"

  },
  {
    title: "Messages",

    icon: <IoMdMail />,
    link:"/"

  },
  {
    title: "Grok",

    icon: <FaSlash />,
    link:"/"

  },
  {
    title: "Lists",

    icon: <LiaListSolid />,
    link:"/"

  },
  {
    title: "Premium",

    icon: <BsTwitterX />,
    link:"/"

  },
  {
    title: "Profile",

    icon: <CgProfile />,
    link:`/${user?.id}`

  },
  {
    title: "More",

    icon: <CgMoreO />,
    link:"/"

  },
],[user?.id])






  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google token not found ");
      }

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      toast.success("Verified Success🎆🎇");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'current-user' });

 
    },
    [queryClient]
  );
    return (<div className="grid grid-cols-12 h-screen w-screen ">
        <div className="  col-span-2 sm:col-span-3   sm:px-4 flex sm:justify-end sm:pr-4">
         <div>
         <div className=" ml-2 text-3xl w-fit p-3 mr-6 transition-all hover:bg-gray-600  rounded-full  cursor-pointer h-fit">
            <BsTwitterX />
          </div>
          <div className=" text-xl ">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                >
                  <Link
                  className="flex my-1 justify-start transition-all w-fit items-center gap-4  hover:bg-gray-600 rounded-full px-5 py-2 cursor-pointer"
                    
                    href={item.link}>
                  <span className="text-3xl"> {item.icon}</span>
                  <span className="hidden sm:inline"> {item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className="bg-[#1D9BF0] sm:p-4 p-4 mt-2  text-sm font-bold text-white rounded-full w-3/4 sm:w-[90%]">
              <p>Post</p>
            </button>
          </div>
          <div className="flex  my-4 cursor-pointer   p-4 align-middle justify-around hover:bg-slate-500 items-center w-3/4 bg-slate-800 rounded-2xl">
            {user && user?.profileImageURL && (
               <Image
               className="rounded-full"
               src={user?.profileImageURL}
               alt="logo"
               height={40}
               width={40}
             />
           )}
            <div className="hidden sm:inline flex-col my-1">
              <p>{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
         </div>
        </div>
        <div className="col-span-10 sm:col-span-5 h-screen overflow-scroll scroll-hide container-snap     border-r-[1px] border-l-[1px] border-gray-600">
        {props.children}
        </div>
        {!user &&
          (
          
        <div className="hidden  sm:col-span-3">
            <div className=" p-5 bg-slate-700  rounded-lg">
              <h1 className="my-2 text-2xl">New to X?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
            </div>
          )
          
      }
</div>)
        ;
};
export default TwitterLayout;
