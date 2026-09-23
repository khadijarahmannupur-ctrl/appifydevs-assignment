"use client";

import React, { useState } from "react";
import { ExtensionSettings as IExtensionSettings } from "@/types";
import { SAMPLE_MODELS } from "@/data/models";
import { Switch } from "@/components/common/Switch";
import { Button } from "@/components/common/Button";
import {
  Settings,
  Keyboard,
  Zap,
  Globe,
  Sparkles,
  Key,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_SETTINGS: IExtensionSettings = {
  defaultModelId: "gpt-4o",
  shortcut: "Ctrl+Shift+E",
  streamSpeed: "fast",
  autoCapturePageContext: true,
  floatingCopilotEnabled: true,
  theme: "system",
  apiKeyConfigured: true,
};

export const ExtensionSettings: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<IExtensionSettings>(
    "echogpt_extension_settings",
    DEFAULT_SETTINGS
  );
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="p-3.5 space-y-4 h-full overflow-y-auto text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-indigo-500" />
          <span>Extension Settings</span>
        </h3>
        {savedFeedback && (
          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Saved!
          </span>
        )}
      </div>

      {/* Default Model */}
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-800 dark:text-slate-200">
          Default Side Panel Model
        </label>
        <select
          value={settings.defaultModelId}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, defaultModelId: e.target.value }))
          }
          className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          {SAMPLE_MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.providerName})
            </option>
          ))}
        </select>
      </div>

      {/* Global Shortcut Display */}
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Keyboard className="w-3.5 h-3.5 text-indigo-500" />
          <span>Activation Shortcut</span>
        </label>
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span className="text-slate-600 dark:text-slate-400">Toggle Side Panel</span>
          <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px] shadow-xs">
            {settings.shortcut}
          </kbd>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-1">
        <Switch
          checked={settings.autoCapturePageContext}
          onChange={(val) =>
            setSettings((prev) => ({ ...prev, autoCapturePageContext: val }))
          }
          label="Auto-Capture Page Context"
          description="Include active tab title and URL with AI prompts"
        />

        <Switch
          checked={settings.floatingCopilotEnabled}
          onChange={(val) =>
            setSettings((prev) => ({ ...prev, floatingCopilotEnabled: val }))
          }
          label="In-Page Highlight Bubble"
          description="Show floating action copilot when text is highlighted on any webpage"
        />
      </div>

      {/* Stream Speed */}
      <div className="space-y-1.5 pt-1">
        <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Streaming Response Speed</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(["normal", "fast", "instant"] as const).map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => setSettings((prev) => ({ ...prev, streamSpeed: speed }))}
              className={`p-2 rounded-xl capitalize font-medium text-center border transition cursor-pointer ${
                settings.streamSpeed === speed
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>

      {/* API Key Status */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">EchoGPT Managed Cloud</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">All models authenticated</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
          Connected
        </span>
      </div>

      <div className="pt-2">
        <Button size="sm" onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </div>
  );
};
