import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="h-6 w-6 text-green-400" />,
    error: <FiAlertCircle className="h-6 w-6 text-red-400" />,
    info: <FiInfo className="h-6 w-6 text-blue-400" />,
  };

  const styles = {
    success: 'bg-green-800',
    error: 'bg-red-800',
    info: 'bg-blue-800',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Transition
        show={true}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`${styles[type]} rounded-lg p-4 shadow-lg`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-white">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md text-gray-400 hover:text-gray-300 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Toast; 