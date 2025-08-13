import FavoriteProducts from './FavoriteProducts';
import FollowedBrands from './FollowedBrands';
import RewardsSystem from './RewardsSystem';

interface ProfileTabContentProps {
  activeTab: 'saved' | 'brands' | 'rewards';
  likedProducts: any[];
  userStars: number;
}

const ProfileTabContent = ({ activeTab, likedProducts, userStars }: ProfileTabContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'saved':
        return <FavoriteProducts products={likedProducts} />;
      case 'brands':
        return <FollowedBrands />;
      case 'rewards':
        return <RewardsSystem totalStars={userStars} />;
      default:
        return <FavoriteProducts products={likedProducts} />;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderContent()}
    </div>
  );
};

export default ProfileTabContent;