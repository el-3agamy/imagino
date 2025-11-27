
import { useState } from "react";
import { LogOut, RefreshCw, CreditCard } from "lucide-react";

export default function ProfileCard() {
  const [btnLoading, setBtnLoading] = useState({
    refresh: false,
    subscribe: false,
    logout: false,
  });

  const user = {
    email: "mohamed.ashraf.kebal@gmail.com",
    plan: "Free",
    status: "Active",
    credits: 40,
  };

  function startLoading(key: "refresh" | "subscribe" | "logout", ms = 900) {
    setBtnLoading((s) => ({ ...s, [key]: true }));
    setTimeout(() => setBtnLoading((s) => ({ ...s, [key]: false })), ms);
  }

  return (
    <div className="w-full md:w-full rounded-xl border md:border-none p-6 md:p-2 bg-card md:bg-transparent shadow-sm md:shadow-none md:m-auto">
      <div className="flex items-center w-full">
        <h1 className="text-4xl font-semibold">Account</h1>

        <div className="ml-auto">
          <button
            onClick={() => startLoading("logout", 800)}
            aria-label="Log out"
            className="inline-flex items-center gap-2 px-4 py-2 bg-section border md:border-none rounded-lg text-sm hover:shadow-sm transition"
          >
            {btnLoading.logout ? (
              <span className="animate-spin w-4 h-4 border-2 border-foreground border-t-transparent rounded-full" />
            ) : (
              <LogOut size={18} />
            )}
            <span>Log out</span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            readOnly
            value={user.email}
            className="w-full rounded-lg p-3 border border-border bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Current Plan</label>
          <input
            readOnly
            value={user.plan}
            className="w-full rounded-lg p-3 border border-border bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Plan Status</label>
          <input
            readOnly
            value={user.status}
            className="w-full rounded-lg p-3 border border-border bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Credits</label>
          <input
            readOnly
            value={String(user.credits)}
            className="w-full rounded-lg p-3 border border-border bg-white focus:outline-none"
          />
          <p className="text-sm text-muted mt-2">
            Free credits refresh by the end of the 1st of every month.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => startLoading("refresh")}
          className="flex-1 inline-flex items-center justify-center gap-2 p-3 rounded-lg border bg-section hover:bg-section/95 transition"
        >
          {btnLoading.refresh ? (
            <span className="animate-spin w-5 h-5 border-2 border-foreground border-t-transparent rounded-full" />
          ) : (
            <RefreshCw size={18} />
          )}
          <span>Refresh</span>
        </button>

        <button
          onClick={() => startLoading("subscribe", 1100)}
          className="flex-1 inline-flex items-center justify-center gap-2 p-3 rounded-lg bg-main hover:bg-main-hover transition text-black font-medium"
        >
          {btnLoading.subscribe ? (
            <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            <CreditCard size={18} />
          )}
          <span>Subscribe</span>
        </button>
      </div>

      <div className="mt-6 text-sm text-muted">
        <p>Need to change email or billing? Go to your settings.</p>
      </div>
    </div>
  );
}
