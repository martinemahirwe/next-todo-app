import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
import { SignIn } from '@/app/components/SignIn';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/todos');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 p-4">
      <div className="bg-white bg-opacity-50 rounded-xl backdrop-blur-md w-1/2 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome to Your To-Do List
        </h1>
        <p className="text-lg text-center mb-8 text-gray-700">
          Please login to create and manage your tasks
        </p>
        <div className="flex justify-center gap-6">
          <SignIn
            provider="github"
            buttonText="Login with GitHub"
            buttonClass="flex items-center justify-center bg-black text-white py-2 px-8 rounded shadow hover:bg-[#070f14] transition duration-300"
            icon={<AiOutlineGithub className="ml-1" />}
          />
          <SignIn
            provider="google"
            buttonText="Login with google"
            buttonClass="flex items-center justify-center bg-yellow-100 border border-gray-300 text-gray-800 py-2 px-8 rounded shadow hover:bg-gray-100 transition duration-300"
            icon={<AiOutlineGoogle className="ml-1 text-[#37db5b]" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
