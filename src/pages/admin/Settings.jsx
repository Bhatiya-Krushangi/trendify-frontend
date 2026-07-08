import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../../api/axios";

const Settings = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setForm(data));
  }, []);

  const update = (path, value) => {
    setForm((f) => {
      const next = { ...f };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put("/settings", form);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-slate-400">Loading settings…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-5">Site Settings</h1>
      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-sm">General</h2>
          <div>
            <label className="text-sm font-medium mb-1 block">Site Name / Logo Text</label>
            <input value={form.logoText} onChange={(e) => update("logoText", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Tagline</label>
            <textarea rows={2} value={form.tagline} onChange={(e) => update("tagline", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Contact Email</label>
            <input value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Google AdSense</h2>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.adsenseEnabled} onChange={(e) => update("adsenseEnabled", e.target.checked)} />
              Enabled
            </label>
          </div>
          <p className="text-xs text-slate-400 -mt-2">
            Once your AdSense account is approved, enter your publisher and ad unit IDs below.
            Ad slots automatically replace the placeholder boxes across the site.
          </p>
          <div>
            <label className="text-sm font-medium mb-1 block">AdSense Publisher ID</label>
            <input placeholder="ca-pub-XXXXXXXXXXXXXXXX" value={form.adsenseClientId} onChange={(e) => update("adsenseClientId", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Leaderboard (top) slot ID</label>
              <input value={form.adSlots?.leaderboardTop || ""} onChange={(e) => update("adSlots.leaderboardTop", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Leaderboard (mid) slot ID</label>
              <input value={form.adSlots?.leaderboardMid || ""} onChange={(e) => update("adSlots.leaderboardMid", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Rectangle (300x250) slot ID</label>
              <input value={form.adSlots?.rectangle || ""} onChange={(e) => update("adSlots.rectangle", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Skyscraper (300x600) slot ID</label>
              <input value={form.adSlots?.skyscraper || ""} onChange={(e) => update("adSlots.skyscraper", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-sm">Social Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Facebook URL" value={form.social?.facebook || ""} onChange={(e) => update("social.facebook", e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 text-sm" />
            <input placeholder="X / Twitter URL" value={form.social?.twitter || ""} onChange={(e) => update("social.twitter", e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 text-sm" />
            <input placeholder="Instagram URL" value={form.social?.instagram || ""} onChange={(e) => update("social.instagram", e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 text-sm" />
            <input placeholder="YouTube URL" value={form.social?.youtube || ""} onChange={(e) => update("social.youtube", e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-6 py-2.5 rounded-md flex items-center gap-2 disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-emerald-600">Saved!</span>}
        </div>
      </form>
    </div>
  );
};

export default Settings;
