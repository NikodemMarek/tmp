type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Szukaj dyrektyw..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
};
