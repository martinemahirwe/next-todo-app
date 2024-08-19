import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/app/components/ui/dropdown-menu';
import Image from 'next/image';
import { SignOut } from '../SignOut';
import { Session } from 'next-auth';

type ProfileDropdownProps = {
  session: Session;
};

export function ProfileDropdown({ session }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={session.user.image}
          alt="Profile"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black border-none rounded">
        <DropdownMenuItem disabled>
          Signed in as a{' '}
          <span className="font-semibold ml-1">{session.user.role}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
