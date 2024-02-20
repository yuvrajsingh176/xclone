"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { BsTwitterX } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LiaListSolid } from "react-icons/lia";
import { FaSlash } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Inter } from "next/font/google";
import { BiLogoTumblr } from "react-icons/bi";
import FeedCard from "@/Components/Feedcard";
import { CgMoreO } from "react-icons/cg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserTokenQuery } from "./graphql/query/user";

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

export default function Home() {
  const handleGoogleWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified with success🎉");
      console.log("jaishreeram", verifyGoogleToken);
      if (verifyGoogleToken) {
        window.localStorage.setItem("token", verifyGoogleToken);
      }
    },
    []
  );
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
          <div className="flex my-4 cursor-pointer   p-4 align-middle justify-between items-center">
            <Image
              className="rounded-full"
              src="https://th.bing.com/th?id=OIP._dQgVJsBnH9TmgOdlw9-NgHaDt&w=349&h=174&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="logo"
              height={50}
              width={50}
            />
            <div className="flex-col my-1">
              <p>Yuvraj Singh</p>
              <p className="text-sm">@yyuvrajssingh</p>
            </div>
            <p className="text-white font-bold">...</p>
          </div>
        </div>
        <div className="col-span-5 h-screen overflow-scroll scroll-hide container-snap     border-r-[1px] border-l-[1px] border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className=" p-5 bg-slate-700  rounded-lg">
            <h1 className="my-2 text-2xl">New to X?</h1>
            <GoogleLogin onSuccess={handleGoogleWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
