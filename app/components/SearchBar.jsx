const SearchBar = ({ setSearch }) => {
  return (
    <input
      onChange={(e) => setSearch(e.target.value)}
      placeholder="search..."
      className=""
    />
  );
};

export default SearchBar;
