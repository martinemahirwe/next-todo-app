"use client";
import Todos from "@/components/Todos";
import { fetchTasks } from "@/actions/todoActions";
import { useQuery, useIsFetching } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const {data:session, status} = useSession();
  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async()=>{
      const res = await fetchTasks(session?.user?.email || "")
      return res
    }
  });

  if (isError) return <div>Error: {error.message}</div>;

    if (status === 'loading') return <div>Please wait....</div>
    if (status === 'unauthenticated') {
      router.push('/');
    }
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 w-full min-h-screen p-6">
      <div className="flex flex-col items-center mx-auto p-6 rtodoselative bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2">
        <div className="flex flex-col items-center justify-center px-8 py-6 gap-3 bg-white bg-opacity-70 text-center backdrop-blur-md border-gray-200 shadow-lg w-full rounded sticky top-0 right-0 left-0 h-30">
          <p className="text-lg text-gray-500 mb-2">
            &quot;The secret of getting ahead is getting started. Your to-do list is your
            path to productivity. Start now and achieve greatness{'\u{1F60A}'}&quot;
          </p>
          <span className="text-gray-700 text-lg">welcome {session?.user?.name}</span>
          <div className="flex justify-between gap-5">
          <h1 className="text-3xl font-medium flex items-center justify-center text-[#3e3e3e]">To-Do List App</h1>
          <Button className="px-4 py-2 font-semibold text-white bg-red-400 rounded shadow hover:bg-red-600 transition duration-300" onClick={()=>signOut()}>Logout</Button>
          </div>
        </div>
        <div className="w-full">
         {isLoading && <div>Loading todos...</div>}
        {data && <Todos todos={data} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
