import React, { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import LinkModal from "./modals/LinkModal";
import ImageModal from "./modals/ImageModal";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaImage,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUnderline,
} from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  if (!editor) {
    return null;
  }

  const openImageModal = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const openLinkModal = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    setCurrentLink(previousUrl || "");
    setIsLinkModalOpen(true);
  }, [editor]);

  const handleImageSubmit = useCallback(
    (src: string, alt?: string, className?: string) => {
      editor.chain().focus().setImage({ src, alt, class: className }).run();
    },
    [editor]
  );

  const handleLinkSubmit = useCallback(
    (href: string) => {
      if (href === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    },
    [editor]
  );

  const handleLinkRemove = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor]);

  return (
    <>
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onSubmit={handleLinkSubmit}
        initialHref={currentLink}
        onRemove={handleLinkRemove}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSubmit={handleImageSubmit}
      />
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("strike") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Strike"
      >
        <FaStrikethrough />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <input
        type="color"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#000000"}
        className="w-8 h-8 p-0 border-0 rounded cursor-pointer self-center"
        title="Text Color"
      />

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="H1"
      >
        <LuHeading1 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="H2"
      >
        <LuHeading2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 3 })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="H3"
      >
        <LuHeading3 />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-200 text-primary-main"
            : ""
        }`}
        title="Justify"
      >
        <FaAlignJustify />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Ordered List"
      >
        <FaListOl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("blockquote") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Blockquote"
      >
        <FaQuoteRight />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={openLinkModal}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link") ? "bg-gray-200 text-primary-main" : ""
        }`}
        title="Link"
      >
        <FaLink />
      </button>
      <button
        type="button"
        onClick={openImageModal}
        className="p-2 rounded hover:bg-gray-200"
        title="Image"
      >
        <FaImage />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Undo"
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Redo"
      >
        <FaRedo />
      </button>
    </div>
    </>
  );
};

export default MenuBar;
