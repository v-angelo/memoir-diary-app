import { motion } from "motion/react";

function UserTable({ users, onDelete }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.3,
      }}
      className="overflow-hidden rounded-3xl bg-(--bg-secondary)"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Entries</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-white/5">
                <td className="px-6 py-4">{user.username}</td>

                <td className="px-6 py-4 text-(--text-secondary)">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-(--accent)/20 text-(--accent)"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">{user.entryCount || 0}</td>

                <td className="px-6 py-4 text-right">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => onDelete(user)}
                      className="cursor-pointer rounded-xl border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default UserTable;
