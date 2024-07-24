import Todos from "@/components/Todos";
import { fetchTasks } from "@/actions/todoActions";
import Image from "next/image";

const Home = async () => {
  const todos = await fetchTasks();
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-300 w-full">
      <div className="flex w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-center w-1/2 h-1/2 p-8 bg-white shadow-lg rounded sticky top-20">
          <Image
            src="https://images.unsplash.com/photo-1681949098615-448f733a782c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Inspiring"
            width={870}
            height={320}
            className="rounded"
          />
          <h1 className="mt-8 text-4xl font-bold text-gray-800">Get Inspired!</h1>
          <p className="mt-2 text-md text-gray-600">
            &quot;The secret of getting ahead is getting started. Your to-do list is your
            path to productivity. Start now and achieve greatness{'\u{1F60A}'}&quot;
          </p>
        </div>
        <div className="flex flex-col w-1/2 h-full pt-20">
            <Todos todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default Home;
