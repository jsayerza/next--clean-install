export default function SearchBar({ change }) {
  return (
    <div>
      <input
        className="p-2 text-md font-bold  w-1/2 my-2 mx-auto"
        type="text"
        placeholder="Busca un articulo"
        onChange={change}
      />
    </div>
  );
}
