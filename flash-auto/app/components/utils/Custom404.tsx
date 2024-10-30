import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
        <Link href="/" className="mt-4 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
