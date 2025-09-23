import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Calendar, Star } from 'lucide-react';

interface MemberPassProps {
  user: {
    name: string;
    email: string;
  };
}

const MemberPass = ({ user }: MemberPassProps) => {
  const [showQR, setShowQR] = useState(false);
  
  // Mock join date - in real app this would come from backend
  const joinDate = "Enero 2023";
  const memberID = "MX" + user.email.substring(0, 3).toUpperCase() + "2023";

  return (
    <Card className="bg-gradient-to-br from-xops-blue/5 to-xops-blue/10 border-xops-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-tertiary-blue">
          <Star className="w-5 h-5" />
          Pase de Miembro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-tertiary-blue">{user.name}</h3>
            <p className="text-sm text-gray-600">ID: {memberID}</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Miembro desde {joinDate}</span>
            </div>
          </div>
          
          <div className="text-center">
            {showQR ? (
              <div className="bg-white p-4 rounded-lg border-2 border-xops-blue/20">
                <div className="w-24 h-24 bg-gradient-to-br from-tertiary-blue to-xops-blue rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <p className="text-xs text-tertiary-blue mt-2">Código QR</p>
              </div>
            ) : (
              <Button
                onClick={() => setShowQR(true)}
                variant="outline"
                className="border-xops-blue text-xops-blue hover:bg-xops-blue hover:text-white"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Mostrar QR
              </Button>
            )}
          </div>
        </div>
        
        {showQR && (
          <Button
            onClick={() => setShowQR(false)}
            variant="ghost"
            className="w-full text-gray-500 hover:text-tertiary-blue"
          >
            Ocultar código
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberPass;