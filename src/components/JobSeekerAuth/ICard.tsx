interface ICardProps {
  title: string;
  children: React.ReactNode;
}

const ICard = ({ title, children }: ICardProps) => {
  return (
    <div className="bg-gray-900 shadow-2xl rounded-lg p-8 border border-purple-600">
      <h2 className="text-2xl font-semibold text-purple-400 mb-6 font-futuristic">{title}</h2>
      {children}
    </div>
  );
};

export default ICard;