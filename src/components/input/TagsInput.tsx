import React, { useState, KeyboardEvent } from "react";
import { FaTimes } from "react-icons/fa";
import Typography from "../typography/Typography";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({
  value = [],
  onChange,
  label,
  placeholder = "تایپ کنید و Enter بزنید...",
  error,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      if (trimmedInput && !value.includes(trimmedInput)) {
        onChange([...value, trimmedInput]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full mt-2">
      {label && (
        <Typography className="mb-2 text-sm font-medium text-gray-700 block">
          {label}
        </Typography>
      )}
      <div
        className={`bg-white border rounded-lg sm:rounded-xl p-2 flex flex-wrap gap-2 focus-within:ring-1 focus-within:border-blue-500 ${
          error ? "border-error-500" : "border-gray-200"
        }`}
      >
        {value.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-blue-100"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-blue-900 focus:outline-none"
            >
              <FaTimes size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-grow min-w-[120px] outline-none text-sm py-1 bg-transparent placeholder:text-gray-400"
        />
      </div>
      {error && (
        <Typography variant="xs" className="text-error-500 mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TagsInput;
