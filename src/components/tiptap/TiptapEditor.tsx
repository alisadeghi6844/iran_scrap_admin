import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ResizableImage } from "./ResizableImage";
import MenuBar from "./MenuBar";
import "./TiptapEditor.css";
import Typography from "../typography/Typography";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  label,
  required,
  errorMessage,
  helperText,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      ResizableImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
       if (editor.getText() === "" && value === "") return;
       
       if (!editor.isFocused) {
          console.log("TiptapEditor setContent called. Value length:", value.length);
          console.log("TiptapEditor Value has img?", value.includes("<img"));
          editor.commands.setContent(value);
       }
    }
  }, [value, editor]);

  return (
    <div className="w-full">
      {label && (
        <Typography className="text-start mb-1 text-gray-800 text-md">
          {label}
          {required && <span className="text-error-500">*</span>}
        </Typography>
      )}
      <div
        className={`border rounded-lg shadow-sm bg-white flex flex-col h-[600px] ${
          errorMessage ? "border-error-500" : "border-gray-300"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white">
          <MenuBar editor={editor} />
        </div>
        <div className="overflow-y-auto flex-1">
          <EditorContent editor={editor} className="bg-white min-h-full" />
        </div>
      </div>
      <Typography
        className={`text-xs mt-1 ${
          !!errorMessage ? "text-error-500" : "text-text-secondary"
        }`}
      >
        {errorMessage ?? helperText}
      </Typography>
    </div>
  );
};

export default TiptapEditor;
