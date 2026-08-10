import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSettings, updateSettings } from "../services/settingsService";

const Settings = () => {
  const { user, setTheme } = useAuth();

  const [settings, setSettings] = useState({
    theme: "light",
    autoAddCalendarEvents: true,
    phonePublic: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({
    theme: false,
    autoAddCalendarEvents: false,
    phonePublic: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSettings();

        setSettings({
          theme: data.theme || "light",
          autoAddCalendarEvents: data.autoAddCalendarEvents ?? true,
          phonePublic: data.phonePublic ?? false,
        });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      loadSettings();
    }
  }, [user]);

  const saveSetting = async (field, value) => {
    const oldValue = settings[field];

    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaving((current) => ({
      ...current,
      [field]: true,
    }));

    setError("");

    try {
      const data = await updateSettings({
        [field]: value,
      });
      if (field === "theme") {
        setTheme(data.theme);
      }

      setSettings({
        theme: data.theme,
        autoAddCalendarEvents: data.autoAddCalendarEvents,
        phonePublic: data.phonePublic,
      });
    } catch (err) {
      console.error(err);

      setSettings((current) => ({
        ...current,
        [field]: oldValue,
      }));

      setError(err.response?.data?.message || "Failed to save setting");
    } finally {
      setSaving((current) => ({
        ...current,
        [field]: false,
      }));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading settings...</p>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Access Denied</h1>

        <p className="mt-2 text-gray-500">
          Only administrators can access settings.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Settings</p>

        <h1 className="mt-2 text-2xl font-bold">Settings</h1>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="max-w-3xl overflow-hidden rounded-xl bg-white shadow">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="font-semibold">Appearance</h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose how the application looks.
            </p>
          </div>

          <select
            value={settings.theme}
            onChange={(e) => saveSetting("theme", e.target.value)}
            disabled={saving.theme}
            className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="font-semibold">
              Automatically Add Events to Calendar
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Automatically add events to your calendar.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              saveSetting(
                "autoAddCalendarEvents",
                !settings.autoAddCalendarEvents,
              )
            }
            disabled={saving.autoAddCalendarEvents}
            className={`relative h-6 w-11 rounded-full transition ${
              settings.autoAddCalendarEvents ? "bg-blue-600" : "bg-gray-300"
            } ${saving.autoAddCalendarEvents ? "cursor-wait opacity-60" : ""}`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                settings.autoAddCalendarEvents ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="font-semibold">Make your Phone Public</h2>

            <p className="mt-1 text-sm text-gray-500">
              Allow other members to see your phone number.
            </p>
          </div>

          <button
            type="button"
            onClick={() => saveSetting("phonePublic", !settings.phonePublic)}
            disabled={saving.phonePublic}
            className={`relative h-6 w-11 rounded-full transition ${
              settings.phonePublic ? "bg-blue-600" : "bg-gray-300"
            } ${saving.phonePublic ? "cursor-wait opacity-60" : ""}`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                settings.phonePublic ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
