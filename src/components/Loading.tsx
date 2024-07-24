import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <AiOutlineLoading3Quarters className="animate-spin text-6xl text-gray-700" />
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
