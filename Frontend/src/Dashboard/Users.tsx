import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

type User = {
  id:         string;
  name:       string;
  phone:      string;
  phone_code: string;
  role:       string;  // "admin" | "seller" | "buyer" — derived on backend
  email:      string;
  status:     string;
  address:    string;
  isAdmin:    boolean;
  isSeller:   boolean;
  isBuyer:    boolean;
};

export default function Users() {
  const navigate = useNavigate();

  const [dropdownOpen1,  setDropdownOpen1]  = useState(false);
  const [dropdownOpen2,  setDropdownOpen2]  = useState(false);
  const [roleSearch,     setRoleSearch]     = useState("");
  const [statusSearch,   setStatusSearch]   = useState("");
  const [searchTerm,     setSearchTerm]     = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole,   setSelectedRole]   = useState("");
  const [users,          setUsers]          = useState<User[]>([]);
  const [page,           setPage]           = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [loading,        setLoading]        = useState(false);

  const token    = localStorage.getItem("token") || "";
  const statuses = ["Pending", "Suspended", "Approved"];
  const roles    = ["admin", "buyer", "seller"];

  const filteredStatuses = statuses.filter((s) =>
    s.toLowerCase().includes(statusSearch.toLowerCase())
  );
  const filteredRoles = roles.filter((r) =>
    r.toLowerCase().includes(roleSearch.toLowerCase())
  );

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus) params.append("status", selectedStatus);
      if (selectedRole)   params.append("role",   selectedRole);
      if (searchTerm)     params.append("name",   searchTerm);
      params.append("limit", "10");
      params.append("page",  page.toString());

      const res = await fetch(`${API_URL}/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to fetch users");
        return;
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedStatus, selectedRole, page, searchTerm]);

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg || "User deleted");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        toast.error(data.msg || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting user");
    }
  };

  // Role badge colours
  const roleBadge = (role: string) => {
    if (role === "admin")  return "bg-purple-100 text-purple-700";
    if (role === "seller") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div>
      <Toaster position="top-center" />
      <p className="text-[#0a0a0a] text-xl mb-4">Users</p>

      <div className="w-full bg-white p-4 rounded-md">
        <div className="flex flex-wrap gap-4 items-center">

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Status filter */}
          <div className="relative text-sm">
            <button
              onClick={() => { setDropdownOpen1(!dropdownOpen1); setDropdownOpen2(false); }}
              className="flex items-center gap-2 border px-4 py-2 w-36 rounded-lg"
            >
              <span className="text-[#8B8B8B]">{selectedStatus || "Select Status"}</span>
              <ChevronDown size={18} className="ml-auto" />
            </button>
            {dropdownOpen1 && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white shadow-md rounded-md py-2 z-10">
                <div className="px-2 mb-2">
                  <input
                    type="text" placeholder="Search..." value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                    className="w-full px-3 py-1 border rounded text-sm"
                  />
                </div>
                {/* Clear filter option */}
                <div
                  onClick={() => { setSelectedStatus(""); setDropdownOpen1(false); setPage(1); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-400 text-xs"
                >
                  All statuses
                </div>
                {filteredStatuses.map((s) => (
                  <div
                    key={s}
                    onClick={() => { setSelectedStatus(s); setDropdownOpen1(false); setPage(1); }}
                    className="px-4 py-2 hover:bg-red-50 hover:text-blue-700 cursor-pointer capitalize"
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role filter */}
          <div className="relative text-sm">
            <button
              onClick={() => { setDropdownOpen2(!dropdownOpen2); setDropdownOpen1(false); }}
              className="flex items-center gap-2 border px-4 py-2 w-36 rounded-lg"
            >
              <span className="text-[#8B8B8B]">{selectedRole || "Select Role"}</span>
              <ChevronDown size={18} className="ml-auto" />
            </button>
            {dropdownOpen2 && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white shadow-md rounded-md py-2 z-10">
                <div className="px-2 mb-2">
                  <input
                    type="text" placeholder="Search..." value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                    className="w-full px-3 py-1 border rounded text-sm"
                  />
                </div>
                <div
                  onClick={() => { setSelectedRole(""); setDropdownOpen2(false); setPage(1); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-400 text-xs"
                >
                  All roles
                </div>
                {filteredRoles.map((r) => (
                  <div
                    key={r}
                    onClick={() => { setSelectedRole(r); setDropdownOpen2(false); setPage(1); }}
                    className="px-4 py-2 hover:bg-red-50 hover:text-blue-700 cursor-pointer capitalize"
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add user button */}
          <div className="ml-auto">
            <button
              onClick={() => navigate("/admin/user-create")}
              className="bg-[#076A41] text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white p-4 rounded-md overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b text-[#0a0a0a]">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <div className="flex justify-center items-center py-20">
                    <svg className="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{user.name || "-"}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email || "-"}</td>
                  <td className="py-3 px-4">{user.address || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "Approved"  ? "bg-green-100 text-green-700"  :
                      user.status === "Suspended" ? "bg-red-100 text-red-700"      :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {user.status || "-"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {/* Show all roles the user has */}
                    <div className="flex flex-wrap gap-1">
                      {user.isAdmin  && <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">Admin</span>}
                      {user.isSeller && <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">Seller</span>}
                      {user.isBuyer  && <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Buyer</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.phone_code} {user.phone}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/users-edit/${user.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-4 justify-center mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}