import { SearchIcon } from "../icons/SearchIcon";

export default function SearchBar({ change }) {
  return (
    <div className="flex justify-center items-center w-full md:w-1/2 my-2 rounded hover:shadow-md transition duration-200">
      <div className="p-2 bg-white">
        <SearchIcon />
      </div>
      <input
        className="p-2 text-md font-semibold shadow-sm w-full outline-none"
        type="text"
        placeholder="Cerca un article"
        onChange={change}
      />
    </div>
  );
}
