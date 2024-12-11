import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className=" z-30 fixed bottom-2 right-2 text-red-700 p-4 rounded-md shadow-md">
      {message}
    </div>
  );
};

export default Toast;
