
import { User } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
}

interface UserHeaderProps {
  user: UserData;
}

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-xops-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-12 h-12 text-xops-blue" />
      </div>
      <h1 className="text-3xl font-montserrat text-xops-dark mb-2">{user.name}</h1>
      <p className="text-gray-600 text-lg font-montserrat">{user.email}</p>
      <div className="mt-4">
        <span className="font-montserrat text-3xl text-xops-blue">Xops<span className="text-xs font-black relative -top-2.5">®</span></span>
      </div>
    </div>
  );
};

export default UserHeader;
