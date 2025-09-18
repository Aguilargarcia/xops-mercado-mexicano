
const BrandSelector = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className="font-archivo-black text-xl text-xops-blue">XOPS<span className="text-sm">®</span></span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-archivo">Panel de Administración</span>
          <span className="bg-xops-blue text-white text-xs px-2 py-1 rounded-full font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default BrandSelector;
