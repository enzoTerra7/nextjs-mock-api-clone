"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { VoidFunction } from "@/types";
import { useTheme } from "next-themes";

export default function TypeScriptEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: VoidFunction<string>;
}) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleChange = (value: string) => {
    setCode(value);
  };

  const extensions = [
    javascript({ typescript: true }),
    EditorView.theme({
      "&": {
        fontSize: "14px",
      },
      ".cm-content": {
        padding: "16px",
        minHeight: "400px",
      },
      ".cm-focused": {
        outline: "none",
      },
      ".cm-editor": {
        borderRadius: "8px",
      },
    }),
  ];

  return (
    <CodeMirror
      value={code}
      className="border rounded-lg overflow-auto max-h-96"
      onChange={handleChange}
      extensions={extensions}
      theme={isDark ? oneDark : undefined}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        highlightSelectionMatches: false,
      }}
    />
  );
}
