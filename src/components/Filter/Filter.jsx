export const Filter = ({ filter, filterChange }) => {
  return (
    <label htmlFor="filter">
      Filter
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={filterChange}
        name="filter"
        required
      />
    </label>
  );
};
