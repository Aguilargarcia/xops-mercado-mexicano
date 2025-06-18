
import { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PersonalInfoProps {
  user: UserData;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-0 shadow-md bg-white">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-xops-dark">Información Personal</h3>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-xops-dark mb-2">
                  Nombre completo
                </label>
                <Input defaultValue={user.name} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-xops-dark mb-2">
                  Email
                </label>
                <Input defaultValue={user.email} type="email" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-xops-dark mb-2">
                  Teléfono
                </label>
                <Input defaultValue={user.phone} />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-xops-dark mb-2">
                  Dirección
                </label>
                <Input defaultValue={user.address} />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button className="btn-primary">Guardar Cambios</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default PersonalInfo;
