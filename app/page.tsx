"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LiaListSolid } from "react-icons/lia";
import { FaSlash } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaImage } from "react-icons/fa";

import FeedCard from "@/Components/Feedcard";
import { CgMoreO } from "react-icons/cg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "./graphql/query/user";
import { useCurrentUser } from "./hooks/user";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "./hooks/tweet";
import { Tweet } from "@/app/gql/graphql";

interface Twittersidebar {
  title: string;
  icon: React.ReactNode;
}
const sideBarMenuItems: Twittersidebar[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title: "Explore",
    icon: <CiSearch />,
  },
  {
    title: "Notifications",

    icon: <IoNotificationsSharp />,
  },
  {
    title: "Messages",

    icon: <IoMdMail />,
  },
  {
    title: "Grok",

    icon: <FaSlash />,
  },
  {
    title: "Lists",

    icon: <LiaListSolid />,
  },
  {
    title: "Premium",

    icon: <BsTwitterX />,
  },
  {
    title: "Profile",

    icon: <CgProfile />,
  },
  {
    title: "More",

    icon: <CgMoreO />,
  },
];
interface T{
  getAllTweets:[]
}
export default function Home() {
  const { user } = useCurrentUser();
  const data = useGetAllTweets()
  const tweets = data.data?.getAllTweets;
  const {mutate } = useCreateTweet();
const [content,setContent]=useState('')

  const queryClient = useQueryClient();
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

  const handleClickImage = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();
  }, [])
  
  const handleCreateTweet = useCallback(() => {
    mutate({
      content: content,
    })
  },[content,mutate])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen ">
        <div className="   col-span-3   px-4 ml-12">
          <div className=" ml-2 text-3xl w-fit p-3 mr-6 transition-all hover:bg-gray-600  rounded-full  cursor-pointer h-fit">
            <BsTwitterX />
          </div>
          <div className=" text-xl ">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex my-1 justify-start transition-all w-fit items-center gap-4  hover:bg-gray-600 rounded-full px-5 py-2 cursor-pointer"
                  key={item.title}
                >
                  <span className="text-3xl"> {item.icon}</span>
                  <span> {item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-[#1D9BF0] p-4 mt-2  text-sm font-bold text-white rounded-full w-[90%]">
              <p>Post</p>
            </button>
          </div>
          <div className="flex my-4 cursor-pointer   p-4 align-middle justify-around hover:bg-slate-500 items-center w-3/4 bg-slate-800 rounded-2xl">
            {user && user.profileImageURL && (
               <Image
               className="rounded-full"
               src={user?.profileImageURL}
               alt="logo"
               height={40}
               width={40}
             />
           )}
            <div className="flex-col my-1">
              <p>{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
        </div>
        <div className="col-span-5 h-screen overflow-scroll scroll-hide container-snap     border-r-[1px] border-l-[1px] border-gray-600">
          <div>
            <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer">
              <div className="grid gap-3 grid-cols-12">
                <div className="col-span-1 ">
                {user && user.profileImageURL && (
               <Image
               className="rounded-full"
               src={user?.profileImageURL}
               alt="logo"
               height={40}
               width={40}
             />
           )}
                </div>
                <div className="col-span-11">
                  <textarea value={content} onChange={e=>setContent(e.target.value)}  name="Tweet" className="bg-transparent w-full text-xl px-3 border-b border-slate-700 outline-none" placeholder="What's happening?"  id="tweet"  rows={4}></textarea>
                  <div className="mt-2 flex justify-between items-center">
            <FaImage className="text-xl" onClick={handleClickImage}/>
                    <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold  text-sm py-2  px-4 rounded-full">
                      Tweet
</button>
              </div>
                </div>
           </div>
            </div>
         </div>
            {
            tweets?.map((tweet: Tweet) => tweet? <FeedCard key={tweet?.id} data={ tweet as Tweet } />:null)
          } 
       
        </div>
        {!user &&
          (
          
        <div className="col-span-3">
            <div className=" p-5 bg-slate-700  rounded-lg">
              <h1 className="my-2 text-2xl">New to X?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
            </div>
          )
          
      }
</div>
    </div>
  );
}
