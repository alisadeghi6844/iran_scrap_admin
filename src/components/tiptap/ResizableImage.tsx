import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import React, { useEffect, useState, useRef, useCallback } from "react";

const ResizableImageComponent = (props: any) => {
  const { node, updateAttributes, selected } = props;
  
  console.log("ResizableImageComponent rendering. Node attrs:", {
    src: node.attrs.src ? node.attrs.src.substring(0, 600) + "..." : "null",
    width: node.attrs.width
  });
  
  // We rely on the node attributes for the width, but keep a local state for smooth dragging
  const [width, setWidth] = useState(node.attrs.width);
  const imageRef = useRef<HTMLImageElement>(null);
  const resizingRef = useRef(false);

  // Sync local state when node attribute changes (external update)
  useEffect(() => {
    setWidth(node.attrs.width);
  }, [node.attrs.width]);

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      
      const image = imageRef.current;
      if (!image) return;

      resizingRef.current = true;
      const startX = event.clientX;
      const startWidth = image.clientWidth;

      const onMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return;
        
        const currentX = e.clientX;
        const diffX = currentX - startX;
        // Direction of resize depends on handle position, assuming bottom-right here
        const newWidth = Math.max(startWidth + diffX, 50); // Min width 50px
        
        setWidth(`${newWidth}px`);
      };

      const onMouseUp = () => {
        resizingRef.current = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        
        // Update the actual node attribute only when dragging finishes
        if (imageRef.current) {
             updateAttributes({ width: `${imageRef.current.clientWidth}px` });
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [updateAttributes]
  );

  return (
    <NodeViewWrapper
      as="span"
      className="resizable-image-wrapper"
      style={{
        display: "inline-block",
        position: "relative",
        lineHeight: 0, // Prevents extra space
      }}
    >
      <img
        ref={imageRef}
        src={node.attrs.src}
        alt={node.attrs.alt}
        title={node.attrs.title}
        style={{
          width: width,
          transition: resizingRef.current ? "none" : "width 0.1s ease",
        }}
        className={`${selected ? "ProseMirror-selectednode" : ""} ${node.attrs.class || ""}`}
      />
      {selected && (
        <div
          className="resize-handle"
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "10px",
            height: "10px",
            backgroundColor: "#3b82f6",
            cursor: "nwse-resize",
            border: "1px solid white",
            zIndex: 10,
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

export const ResizableImage = Image.extend({
  name: "image",

  addOptions() {
    return {
      ...this.parent?.(),
      allowBase64: true,
      inline: true,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      alt: {
        default: null,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => ({
          title: attributes.title,
        }),
      },
      width: {
        default: null,
        parseHTML: (element) =>
          element.style.width || element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            style: `width: ${attributes.width}`,
          };
        },
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return {
            class: attributes.class,
          };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
