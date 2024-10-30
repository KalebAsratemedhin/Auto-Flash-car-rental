
const CustomSuccess = ({ message = 'Operation successful!' }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-green-600">Success</h2>
        <p className="mt-2 text-green-500">{message}</p>
      </div>
    </div>
  );
};

export default CustomSuccess;
