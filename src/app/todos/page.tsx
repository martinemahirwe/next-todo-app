import Todos from '@/app/components/Todos';
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../auth';
import { ProfileDropdown } from '../components/ui/userProfile';

const Home = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 w-full min-h-screen p-6">
      <ToastContainer />
      <div className="flex flex-col items-center mx-auto p-6 relative bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2  z-50">
        <div className="flex flex-col items-center justify-center px-8 py-6 gap-3 bg-white bg-opacity-70 text-center backdrop-blur-md border-gray-200 shadow-lg w-full rounded sticky top-0 right-0 left-0 h-30">
          <div className="flex items-center justify-between w-full">
            <span className="text-gray-700 text-lg">
              Welcome,{' '}
              <span className="font-semibold">{session.user.name}</span>
            </span>
            <ProfileDropdown session={session} />
          </div>
          <p className="text-lg text-gray-500 mb-2">
            &quot;The secret of getting ahead is getting started. Your to-do
            list is your path. Start now and plan your day {'\u{1F60A}'}&quot;
          </p>
          <div className="flex justify-center gap-5 items-center w-full">
            <h1 className="text-3xl font-medium text-[#3e3e3e]">To-Do List</h1>
          </div>
        </div>
        <div className="w-full mt-6">
          <Todos />
        </div>
      </div>
    </div>
  );
};

export default Home;
