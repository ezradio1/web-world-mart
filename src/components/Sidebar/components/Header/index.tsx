
const Header = () => {
  return (
    <div className="px-3 py-4 border-b border-primary-dark flex items-center justify-between">
      <div className="flex transition-all items-center gap-2">
        <div className="w-9 h-9 flex justify-center items-center text-white font-bold rounded bg-gradient-to-tr to-purple-200 from-blue-500">
          EA
        </div>
        <div className="text-white">
          <p className="text-xs font-medium max-w-[110px] truncate">Ezra Audivano Dirfa</p>
          <p className="text-[10px]">Superadmin</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
