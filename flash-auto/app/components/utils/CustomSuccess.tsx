import { useEffect, useState } from "react";

const CustomSuccess = ({ message = 'Operation successful!' }) => {
  const [visible, setVisible] = useState(true);
  const duration = 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration]);

  if (visible){
  return (
    <div className="flex items-center justify-center h-20 w-full bg-green-100">
      <div className="text-center">
        <p className="mt-2 text-green-500">{message}</p>
      </div>
    </div>
  );}
};

export default CustomSuccess;
