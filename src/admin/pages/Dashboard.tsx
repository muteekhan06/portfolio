import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Briefcase,
  Code,
  Award,
  FileJson,
  Eye,
  Save,
  Upload,
  Github,
} from "lucide-react";
import { isAuthenticated, logout } from "../lib/auth";
import JsonEditor from "../components/JsonEditor";
import LivePreview from "../components/LivePreview";
import { commitFile } from "../lib/github";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPreview, setShowPreview] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorValid, setEditorValid] = useState(true);
  const [editorError, setEditorError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User, file: "profile.json" },
    {
      id: "projects",
      label: "Projects",
      icon: Briefcase,
      file: "projects.json",
    },
    {
      id: "experience",
      label: "Experience",
      icon: Code,
      file: "experience.json",
    },
    { id: "skills", label: "Skills", icon: Award, file: "skills.json" },
    { id: "awards", label: "Awards", icon: Award, file: "awards.json" },
  ];

  const currentFile = tabs.find((t) => t.id === activeTab)?.file || "";

  useEffect(() => {
    setSaveStatus("idle");
    setSaveMessage("");
  }, [currentFile]);

  const handleSave = async () => {
    if (!currentFile) return;

    if (!editorValid) {
      setSaveStatus("error");
      setSaveMessage(editorError || "Fix validation errors before saving.");
      return;
    }

    const { VITE_GITHUB_PAT, VITE_GITHUB_REPO, VITE_GITHUB_BRANCH } =
      import.meta.env;

    if (!VITE_GITHUB_PAT || !VITE_GITHUB_REPO) {
      setSaveStatus("error");
      setSaveMessage(
        "GitHub credentials missing. Set VITE_GITHUB_PAT and VITE_GITHUB_REPO."
      );
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");
    setSaveMessage("");

    try {
      await commitFile({
        path: `public/data/${currentFile}`,
        content: editorContent,
        message: `chore: update ${currentFile} via admin dashboard`,
        branch: VITE_GITHUB_BRANCH,
      });

      setSaveStatus("success");
      setSaveMessage("Changes committed to GitHub successfully.");
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
      setSaveMessage(
        error instanceof Error ? error.message : "Failed to commit changes."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="glass-dark border-b border-border/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileJson className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  MEGA GODED ULTRA™
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-ghost flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              <button
                onClick={handleLogout}
                className="btn-ghost flex items-center gap-2 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="glass-dark rounded-2xl p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
                      : "text-muted-foreground hover:bg-surface-200/70 hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="glass-dark rounded-2xl p-4 mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Projects
                  </span>
                  <span className="text-foreground font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Experience
                  </span>
                  <span className="text-foreground font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Skills</span>
                  <span className="text-foreground font-medium">20+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Awards</span>
                  <span className="text-foreground font-medium">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="glass-dark rounded-2xl p-6">
              {/* Tab Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <div className="flex gap-2">
                  <button className="btn-ghost flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </button>
                  <button
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSave}
                    disabled={isSaving || !currentFile}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save & Publish"}
                  </button>
                </div>
              </div>

              {/* JSON Editor */}
              <JsonEditor
                fileName={currentFile}
                onContentChange={setEditorContent}
                onValidationChange={({ isValid, error }) => {
                  setEditorValid(isValid);
                  setEditorError(error || "");
                }}
              />

              {saveStatus !== "idle" && saveMessage && (
                <div
                  className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                    saveStatus === "success"
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {saveMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreview && <LivePreview onClose={() => setShowPreview(false)} />}
    </div>
  );
}
