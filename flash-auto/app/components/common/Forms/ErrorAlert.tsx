
const ErrorAlert = ({ message }: {message: string}) => (
    message ? (
      <div className="mb-4 text-sm text-red-600 bg-red-100 rounded-md p-3">
        {message}
      </div>
    ) : null
  );

 export default ErrorAlert;