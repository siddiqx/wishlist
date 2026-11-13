"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings2, Download, Upload, Copy, Check, AlertTriangle, RotateCcw } from "lucide-react";
import { useWishlistStore } from "@/lib/store";

export function BackupModal() {
  const store = useWishlistStore();
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!store.isBackupModalOpen) return null;

  const currentJSON = store.exportJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `siddiq-blueprint-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const res = store.importJSON(importText);
    if (res.success) {
      setImportStatus({ success: true, msg: "Backup restored successfully!" });
      setTimeout(() => {
        store.setBackupModalOpen(false);
        setImportStatus(null);
      }, 1500);
    } else {
      setImportStatus({ success: false, msg: res.error || "Failed to parse JSON" });
    }
  };

  const handleReset = () => {
    if (confirm("Reset all notes, priorities, statuses, and custom plans back to default?")) {
      store.resetToDefaults();
      store.setBackupModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => store.setBackupModalOpen(false)}
          className="fixed inset-0 bg-[#111110]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <div className="flex min-h-full items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-full max-w-xl rounded-2xl bg-[#F7F7F5] border border-[#E8E8E4] text-left shadow-2xl overflow-hidden flex flex-col my-auto"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white border-b border-[#E8E8E4] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Settings2 className="w-5 h-5 text-[#4F46E5] shrink-0" />
                <h2 className="text-base font-semibold text-[#111110] truncate">
                  Catalogue Preferences &amp; Portability
                </h2>
              </div>
              <button
                onClick={() => store.setBackupModalOpen(false)}
                className="p-1.5 rounded-lg border border-[#E8E8E4] text-[#57574F] hover:text-[#111110] hover:bg-[#F1F1EE] transition-colors shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 text-xs pb-[max(1rem,env(safe-area-inset-bottom))]">
              {/* Export Section */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#111110]">Export Plan &amp; Settings</h3>
                    <p className="text-[#8A8A80] text-[11px] mt-0.5">
                      Export a secure snapshot containing your personal notes, statuses, bookmarks, and budget plan.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F1F1EE] hover:bg-stone-200 text-[#111110] font-medium transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#111110] text-white font-medium hover:bg-stone-800 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Import Section */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8E8E4] shadow-xs space-y-3">
                <div>
                  <h3 className="font-semibold text-[#111110]">Import Saved Plan</h3>
                  <p className="text-[#8A8A80] text-[11px] mt-0.5">
                    Paste previously exported configuration to restore your personal notes and customized plan.
                  </p>
                </div>

                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your exported configuration here..."
                  rows={4}
                  className="w-full p-2.5 rounded-lg bg-[#F7F7F5] border border-[#E8E8E4] font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] text-[#111110] resize-none"
                />

                {importStatus && (
                  <div
                    className={`p-2 rounded-lg text-xs font-medium ${
                      importStatus.success
                        ? "bg-emerald-50 text-[#16A34A] border border-emerald-200"
                        : "bg-rose-50 text-[#DC2626] border border-rose-200"
                    }`}
                  >
                    {importStatus.msg}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleImport}
                    disabled={!importText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4F46E5] text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Apply Settings</span>
                  </button>
                </div>
              </div>

              {/* Reset Section */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F1F1EE] border border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="text-[#57574F]">Reset catalogue to initial state?</span>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-[#DC2626] hover:bg-rose-50 font-medium transition-colors self-end sm:self-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Catalogue</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
