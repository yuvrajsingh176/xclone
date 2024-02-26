"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FaImage } from "react-icons/fa";
import FeedCard from "@/Components/Feedcard";
import { useCurrentUser } from "./hooks/user";
import { useCreateTweet, useGetAllTweets } from "./hooks/tweet";
import { Tweet } from "@/app/gql/graphql";
import TwitterLayout from "@/Components/Layout/TwitterLayout";
interface T{
  getAllTweets:[]
}

export default function Home() {
  const data = useGetAllTweets()
  const tweets = data.data?.getAllTweets;
  const {mutate } = useCreateTweet();
const [content,setContent]=useState('')

  const userdata = useCurrentUser();
  const user=userdata.data?.getCurrentUser

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
      <TwitterLayout>
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
       
</TwitterLayout>
    </div>
  );
}
