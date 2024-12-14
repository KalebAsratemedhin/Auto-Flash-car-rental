
const Searchbar = () => {
  return (
    <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
        <input
            type="text"
            placeholder="Search for cars..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
        </div>
    </div>
  )
}

export default Searchbar