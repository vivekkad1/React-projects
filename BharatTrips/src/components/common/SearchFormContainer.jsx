const SearchFormContainer = ({ children }) => {
  return (
    <div className="border border-slate-200 rounded-lg flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row relative">
      {children}
    </div>
  );
};

export default SearchFormContainer;
