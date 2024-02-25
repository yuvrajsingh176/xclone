import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosStats } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { Tweet } from "@/app/gql/graphql";

interface FeedCardProps{
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="border border-l-0 border-r-0 border-b-0 border-gray-200 p-5 hover:bg-gray-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-1">
            {data .author?.profileImageURL && (
              <Image
                className=" rounded-full"
                src={data.author?.profileImageURL}
                alt="logo"
                height={50}
                width={50}
              />
            )}
          </div>
          <div className="col-span-11">
            <h5>{data.author?.firstName} {data.author?.lastName}</h5>
            <p>
         {data.content}
            </p>
            <div className="flex text-xl justify-between mt-3 w-[85%]">
              <button className="hover:text-[#1D9BF0] hover:rounded-full flex">
                <FaRegComment />
                <span className="text-sm ml-1"> 78</span>
              </button>
              <button>
                <FaRetweet />
              </button>{" "}
              <button>
                <CiHeart />
              </button>{" "}
              <button>
                <IoIosStats />
              </button>{" "}
              <button>
                <FaRegBookmark />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
