"use client";
import TwitterLayout from "@/Components/Layout/TwitterLayout";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useGetUserById } from "../hooks/user";
import FeedCard from "@/Components/Feedcard";
import { Tweet } from "../gql/graphql";


interface Props {
  params: { id: number };
}
const UserProfilePage = ({ params: { id } }: Props) => {
    const {data} = useGetUserById(id.toString());
    console.log(data)
    return (
    <TwitterLayout>
      <div>
        <nav className="px-3 flex items-center py-3 gap-5">
          <FaArrowLeft className="text-2xl" />
          <div>
              <h1 className="font-medium text-2xl">{data?.getUserById?.firstName } {data?.getUserById?.lastName }</h1>
            <h1 className="font-medium text-1xl text-slate-500">{data?.getUserById?.tweets?.length} Tweets</h1>
          </div>
                </nav>
                <div className="border-b border-slate-600">

                <div className="flex p-3 justify-center items-center">
                 
                {data?.getUserById?.profileImageURL && (    <Image
                    src={data?.getUserById?.profileImageURL} alt="user-image" className="object-cover rounded-full" width={200} height={200}
                    />)}

                </div>
                <div className="flex justify-center items-center py-2">
            <h1 className="font-medium text-2xl">{data?.getUserById?.firstName } {data?.getUserById?.lastName }</h1>

                    </div>
                </div>

                <div>
                    {
                        data?.getUserById?.tweets?.map((tweet) => (
                            <FeedCard data={tweet as Tweet} key={tweet?.id} />
                        ))   
                    }
                </div>
      </div>
    </TwitterLayout>
  );
};



export default UserProfilePage;
