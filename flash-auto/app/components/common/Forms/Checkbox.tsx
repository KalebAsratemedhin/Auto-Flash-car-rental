import Link from 'next/link';

const Checkbox = ({ id, checked, label, link , onChange}: {id: string,  checked: boolean, label: string, link: string, onChange:() => void}) => (
    
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {label}{' '}
        <Link href={link} className="font-medium text-indigo-600 hover:text-indigo-500">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
          Privacy Policy
        </Link>
      </label>
    </div>
  );

  export default Checkbox;