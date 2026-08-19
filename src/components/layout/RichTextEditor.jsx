import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (value !== currentContent) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="memoir-editor overflow-hidden rounded-2xl border border-white/10 bg-(--bg-primary)">
      <EditorToolbar editor={editor} />

      <EditorContent editor={editor} className="px-4 py-3" />
    </div>
  );
}

export default RichTextEditor;
