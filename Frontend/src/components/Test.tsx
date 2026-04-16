  <div className="relative text-sm">
            <button
              onClick={() => {
                setDropdownOpenStatus(!dropdownOpenStatus);
                setDropdownOpenUser(false);
              }}
              className="flex items-center space-x-1.5 border px-4 py-2 w-36 rounded-lg"
            >
              <p className="text-[#8B8B8B]">{selectedStatus || "Select Status"}</p>
              <ChevronDown size={18} className="ml-3" />
            </button>

            {dropdownOpenStatus && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-md rounded-md py-2 z-10">
                <div className="px-2 mb-2">
                  <input
                    type="text"
                    placeholder="Search Status"
                    value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div
                  className="block px-4 py-2 hover:bg-red-100 hover:text-black cursor-pointer font-semibold"
                  onClick={() => {
                    setSelectedStatus(null);
                    setDropdownOpenStatus(false);
                  }}
                >
                  Clear Filter
                </div>
                {filteredStatuses.length > 0 ? (
                  filteredStatuses.map((s) => (
                    <div
                      key={s._id}
                      className="block px-4 py-2 hover:bg-red-100 hover:text-black cursor-pointer"
                      onClick={() => {
                        setSelectedStatus(s.name);
                        setDropdownOpenStatus(false);
                      }}
                    >
                      {s.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No data found</div>
                )}
              </div>
            )}
          </div>


  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [statusSearch, setStatusSearch] = useState("");
