
interface BusinessHeaderProps {
  title: string;
  subtitle: string;
}

const BusinessHeader = ({ title, subtitle }: BusinessHeaderProps) => {
  return (
    <div className="container mx-auto mb-20 text-center">
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
        TAILORED SOLUTIONS
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default BusinessHeader;
