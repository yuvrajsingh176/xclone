import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosStats } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";

const FeedCard: React.FC = () => {
  return (
    <div>
      <div className="border border-l-0 border-r-0 border-b-0 border-gray-200 p-5 hover:bg-gray-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-1">
            <Image
              className=" rounded-full"
              src="https://th.bing.com/th?id=OIP._dQgVJsBnH9TmgOdlw9-NgHaDt&w=349&h=174&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="logo"
              height={50}
              width={50}
            />
          </div>
          <div className="col-span-11">
            <h5>Yuvraj Singh</h5>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&aposs standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
