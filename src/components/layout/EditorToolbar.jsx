import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

function EditorToolbar({ editor }) {
  if (!editor) return null;

  const buttonClass = (active = false) =>
    `rounded-lg p-2 transition ${
      active
        ? "bg-(--accent) text-white"
        : "text-(--text-secondary) hover:bg-(--bg-secondary)"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold"
      >
        <FaBold />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic"
      >
        <FaItalic />
      </button>

      {/* Heading 1 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        <LuHeading1 />
      </button>

      {/* Heading 2 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <LuHeading2 />
      </button>

      {/* Divider */}
      <div className="mx-1 h-6 w-px bg-white/10" />

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <FaListUl />
      </button>

      {/* Numbered List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <FaListOl />
      </button>

      {/* Blockquote */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Blockquote"
      >
        <FaQuoteLeft />
      </button>

      {/* Divider */}
      <div className="mx-1 h-6 w-px bg-white/10" />

      {/* Undo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--bg-secondary) disabled:cursor-not-allowed disabled:opacity-30"
        title="Undo"
      >
        <FaUndo />
      </button>

      {/* Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--bg-secondary) disabled:cursor-not-allowed disabled:opacity-30"
        title="Redo"
      >
        <FaRedo />
      </button>
    </div>
  );
}

export default EditorToolbar;
