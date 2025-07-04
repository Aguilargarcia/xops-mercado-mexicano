
const BrandSelector = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-xops-blue to-xops-blue/80 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">X</span>
      </div>
      
      <div className="flex flex-col">
        <span className="font-archivo-black text-xl text-xops-dark">Xops</span>
        <span className="text-xs text-gray-500 font-archivo">Panel de Administración</span>
      </div>
    </div>
  );
};

export default BrandSelector;
