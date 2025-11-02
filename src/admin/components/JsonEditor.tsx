import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { validateJSON } from "../lib/validation";

interface JsonEditorProps {
  fileName: string;
  onContentChange?: (value: string) => void;
  onValidationChange?: (state: { isValid: boolean; error?: string }) => void;
}

export default function JsonEditor({
  fileName,
  onContentChange,
  onValidationChange,
}: JsonEditorProps) {
  const [content, setContent] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "vs-light">(
    "vs-dark"
  );

  useEffect(() => {
    loadFile();
  }, [fileName]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const syncTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setEditorTheme(isLight ? "vs-light" : "vs-dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const loadFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/data/${fileName}`);
      const data = await response.text();
      setContent(data);
      validateContent(data);
      onContentChange?.(data);
    } catch (err) {
      setError("Failed to load file");
      onValidationChange?.({ isValid: false, error: "Failed to load file" });
    } finally {
      setLoading(false);
    }
  };

  const validateContent = (value: string) => {
    const result = validateJSON(value);
    setIsValid(result.valid);
    setError(result.error || "");
    onValidationChange?.({ isValid: result.valid, error: result.error || "" });
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
      validateContent(value);
      onContentChange?.(value);
    }
  };

  if (loading) {
    return (
      <div className="h-96 bg-surface-200 rounded-lg border border-border/60 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Validation Status */}
      {!isValid && error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          <strong>Validation Error:</strong> {error}
        </div>
      )}

      {isValid && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Valid JSON
        </div>
      )}

      {/* Monaco Editor */}
      <div className="border border-border/60 rounded-lg overflow-hidden">
        <Editor
          height="60vh"
          defaultLanguage="json"
          value={content}
          onChange={handleChange}
          theme={editorTheme}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      {/* File Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{fileName}</span>
        <span>{content.length} characters</span>
      </div>
    </div>
  );
}
