
type InputFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    icon?: React.ComponentType<{ className: string }>;
    required?: boolean;
    error?: string;
  };
  
  const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    icon: Icon,
    required = false,
    error,
  }) => (
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
          required={required}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full pl-10 px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
  
  export default InputField;
  