
  const Button = ({ onClick, disabled, className, children, type }: {onClick?: Function, disabled: boolean, className: string, children: React.ReactNode, type?: "button" | "submit" | "reset" | undefined}) => (
    <button
      type={type}
      onClick={() => onClick}
      disabled={disabled}
      className={`${className} w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-50`}
    >
      {children}
    </button>
  );

  export default Button;