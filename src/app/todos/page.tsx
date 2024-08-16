import Todos from '@/app/components/Todos';
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignOut } from '../components/SignOut';
import { auth } from '../../../auth';
const Home = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }
  console.log(session.user.role, '=======================');
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 w-full min-h-screen p-6">
      <ToastContainer />
      <div className="flex flex-col items-center mx-auto p-6 rtodoselative bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2">
        <div className="flex flex-col items-center justify-center px-8 py-6 gap-3 bg-white bg-opacity-70 text-center backdrop-blur-md border-gray-200 shadow-lg w-full rounded sticky top-0 right-0 left-0 h-30">
          <p className="text-lg text-gray-500 mb-2">
            &quot;The secret of getting ahead is getting started. Your to-do
            list is your path to productivity. Start now and achieve greatness
            {'\u{1F60A}'}&quot;
          </p>
          <span className="text-gray-700 text-lg">
            Welcome {session.user.role} {session.user.name}
          </span>
          <div className="flex justify-between gap-5">
            <h1 className="text-3xl font-medium flex items-center justify-center text-[#3e3e3e]">
              To-Do List App
            </h1>
            <SignOut />
          </div>
        </div>
        <div className="w-full">
          <Todos />
        </div>
      </div>
    </div>
  );
};

export default Home;
