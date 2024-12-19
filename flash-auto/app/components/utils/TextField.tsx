interface TextFieldProps {
  label: string;
  id: string;
  type: string;
  register: any;
  validation?: any;
  error?: string;
  disabled?: boolean;
  placeholder: string;
  icon?: React.ComponentType<{ className: string }>;
}

const TextField: React.FC<TextFieldProps> = ({ label, id, type, register, validation, error, disabled, placeholder, icon: Icon}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      <div className="mt-1 relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, validation)}
        className={` focus:outline-none focus:ring-purple-400 focus:ring-2 appearance-none block w-full pl-10 px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder={placeholder}
      />
      </div>
      {error && <p className="text-red-500 text-base mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
