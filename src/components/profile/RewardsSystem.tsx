import { Star, Gift, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface RewardsSystemProps {
  totalStars: number;
}

const RewardsSystem = ({ totalStars }: RewardsSystemProps) => {
  const starsToNextReward = 5 - (totalStars % 5);
  const completedRewards = Math.floor(totalStars / 5);
  const progressPercentage = ((totalStars % 5) / 5) * 100;
  const hasAvailableReward = totalStars > 0 && totalStars % 5 === 0;

  const rewards = [
    { id: 1, name: "Descuento 10%", description: "10% de descuento en tu próxima compra", icon: Gift },
    { id: 2, name: "Envío Gratis", description: "Envío gratuito en cualquier pedido", icon: Trophy },
    { id: 3, name: "Acceso VIP", description: "Acceso anticipado a nuevas colecciones", icon: Star },
  ];

  return (
    <Card className="p-6 border border-gray-100 shadow-sm bg-white">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-8 h-8 text-xops-blue fill-xops-blue" />
          <h2 className="text-2xl font-bold text-xops-dark">Sistema de Recompensas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Stars */}
          <div className="text-center">
            <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Star className="w-8 h-8 text-xops-blue fill-xops-blue" />
            </div>
            <p className="text-3xl font-bold text-xops-blue">{totalStars}</p>
            <p className="text-sm text-gray-600">Estrellas Totales</p>
          </div>

          {/* Rewards Unlocked */}
          <div className="text-center">
            <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Gift className="w-8 h-8 text-xops-blue" />
            </div>
            <p className="text-3xl font-bold text-xops-blue">{completedRewards}</p>
            <p className="text-sm text-gray-600">Recompensas Desbloqueadas</p>
          </div>

          {/* Stars to Next Reward */}
          <div className="text-center">
            <div className="w-16 h-16 bg-xops-blue/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-xops-blue" />
            </div>
            <p className="text-3xl font-bold text-xops-blue">{hasAvailableReward ? 0 : starsToNextReward}</p>
            <p className="text-sm text-gray-600">Para Próxima Recompensa</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progreso hacia la siguiente recompensa</span>
            <span className="text-sm text-gray-600">{totalStars % 5}/5</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-gray-100" />
        </div>

        {/* Available Reward Alert */}
        {hasAvailableReward && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">¡Tienes una recompensa disponible!</span>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Reclamar Recompensa
            </Button>
          </div>
        )}

        {/* Rewards List */}
        <div>
          <h3 className="text-lg font-semibold text-xops-dark mb-4">Recompensas Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward, index) => {
              const isUnlocked = completedRewards > index;
              const IconComponent = reward.icon;
              
              return (
                <div
                  key={reward.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isUnlocked
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <IconComponent
                      className={`w-8 h-8 mx-auto mb-2 ${
                        isUnlocked ? 'text-green-600' : 'text-gray-400'
                      }`}
                    />
                    <h4 className={`font-semibold mb-1 ${
                      isUnlocked ? 'text-green-800' : 'text-gray-500'
                    }`}>
                      {reward.name}
                    </h4>
                    <p className={`text-sm ${
                      isUnlocked ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {reward.description}
                    </p>
                    {isUnlocked && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          ✓ Desbloqueada
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RewardsSystem;
