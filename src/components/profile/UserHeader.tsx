
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
      <h1 className="text-3xl font-bold text-xops-dark mb-2">{user.name}</h1>
      <p className="text-gray-600 text-lg">{user.email}</p>
    </div>
  );
};

export default UserHeader;
