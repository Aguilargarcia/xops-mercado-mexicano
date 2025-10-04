
interface OrderCardProps {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Pendiente' | 'Procesando' | 'Enviado';
  date: string;
}

const OrderCard = ({ id, customer, product, amount, status, date }: OrderCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Enviado': return 'bg-green-100 text-green-800';
      case 'Procesando': return 'bg-xops-black/10 text-xops-black';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <p className="font-semibold text-xops-dark">{id}</p>
        <p className="text-sm text-gray-600">{customer}</p>
        <p className="text-sm text-gray-500">{product}</p>
      </div>
      
      <div className="text-right space-y-2">
        <p className="font-bold text-xops-dark text-lg">${amount.toLocaleString()}</p>
        <span className={`text-xs px-3 py-2 rounded-full font-medium ${getStatusColor()}`}>
          {status}
        </span>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default OrderCard;
