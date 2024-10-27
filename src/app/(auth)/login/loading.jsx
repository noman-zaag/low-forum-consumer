const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 animate-pulse">
      <div className="w-full max-w-[600px] bg-[#F3F4F5] p-8 rounded-lg">
        <div className="flex justify-center mb-6">
          <div className="w-[192px] h-[60px] bg-gray-200"></div>
        </div>
        <h2 className="text-2xl font-semibold text-left mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </h2>
        <p className="text-[#4A4A4A] text-left mb-6 font-light">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </p>
        <div>
          <div className="mb-4 h-12 bg-gray-200 rounded"></div>
          <div className="mb-6 h-12 bg-gray-200 rounded"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="mb-4 h-12 bg-gray-200 rounded"></div>
        </div>
        <p className="text-center text-sm mt-6">
          <div className="h-4 bg-gray-200 rounded w-1/2 m-auto"></div>
        </p>
      </div>
    </div>
  );
};

export default Loading;
