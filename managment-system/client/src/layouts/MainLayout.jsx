import { NavLink, Outlet } from "react-router-dom";
import Avatar from "../components/Avatar";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Settings as SettingsIcon,
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateSettings } from "../services/settingsService";

const MainLayout = () => {
  const { user, theme, setTheme } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      roles: ["admin", "supervisor", "user"],
    },
    {
      label: "All Members",
      path: "/members",
      icon: <Users size={20} />,
      roles: ["admin", "supervisor", "user"],
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: <CalendarCheck size={20} />,
      roles: ["admin", "supervisor"],
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <SettingsIcon size={20} />,
      roles: ["admin"],
    },
  ];

  const visibleNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  const changeTheme = async (newTheme) => {
    if (newTheme === theme) return;

    try {
      const data = await updateSettings({
        theme: newTheme,
      });

      setTheme(data.theme);
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <aside
        className={`fixed left-0 top-0 flex h-screen w-64 flex-col border-r ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex h-20 items-center px-6">
          <h1 className="text-2xl font-bold">Logoipsum</h1>
        </div>

        <nav className="flex-1 px-3 py-4">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/30"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div
          className={`border-t p-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p className="mb-2 text-sm font-medium">Theme</p>

          <div className="flex gap-2">
            <button
              onClick={() => changeTheme("light")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 ${
                theme === "light"
                  ? "bg-blue-100 text-blue-600"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100"
              }`}
            >
              <Sun size={16} />
              Light
            </button>

            <button
              onClick={() => changeTheme("dark")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 ${
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Moon size={16} />
              Dark
            </button>
          </div>
        </div>
      </aside>

      <div className="ml-64">
        <header
          className={`flex h-20 items-center justify-between border-b px-8 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <h2 className="text-xl font-semibold">
              Hello {user?.fullName?.split(" ")[0]}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <div
              className={`flex items-center rounded-lg px-3 py-2 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Search size={18} />

              <input
                type="text"
                placeholder="Search"
                className="ml-2 bg-transparent outline-none"
              />
            </div>

            <button className="relative">
              <Bell size={21} />
            </button>

            <div className="flex items-center gap-3">
              <Avatar name={user?.fullName} src={user?.avatar} />

              <div>
                <p className="font-medium">{user?.fullName}</p>

                <p
                  className={`text-sm capitalize ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
