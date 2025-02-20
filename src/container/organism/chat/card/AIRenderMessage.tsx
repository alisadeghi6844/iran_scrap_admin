import React, { useEffect, useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCopyOutline } from "react-icons/io5";
import Typography from "../../../../components/typography/Typography";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import LaTeXTable from "../../LaTeXTable";

interface ChatBotResponseProps {
  message: string;
}

const ChatBotResponse: React.FC<ChatBotResponseProps> = ({ message }) => {
  const [cleanResponse, setCleanResponse] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const thinkTagRegex = /<think>(.*?)<\/think>/gs;

    if (thinkTagRegex.test(message)) {
      setIsThinking(true);
      const cleaned = message.replace(thinkTagRegex, "$1").trim();
      setCleanResponse(cleaned);

      const timer = setTimeout(() => {
        setIsThinking(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsThinking(false);
      setCleanResponse(message);
    }
  }, [message]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyStatus("کپی شد!");
        setTimeout(() => setCopyStatus(null), 2000);
      },
      () => {
        console.log("خطا در کپی");
      }
    );
  };

  return (
    <div className="response-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ node, ...props }) => <a className="text-blue-500" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 pl-4 italic" {...props} />,
          br: () => <br />,
          code({ node, inline, className, children }: { node: any; inline: boolean; className?: string; children: ReactNode; }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(codeString)}
                  className="absolute top-0 right-0 p-2 text-white hover:text-gray-700"
                  title="کپی کد"
                >
                  {copyStatus ? (
                    <span className="text-white">{copyStatus}</span>
                  ) : (
                    <div className="flex items-center gap-x-2 flex-row-reverse text-md">
                      <Typography>کپی</Typography>
                      <IoCopyOutline />
                    </div>
                  )}
                </button>
                <SyntaxHighlighter
                  language={match[1]}
                  style={okaidia}
                  PreTag="div"
                  customStyle={{ fontSize: "1.1em" }}
                >
                  {codeString}
                </SyntaxHighlighter>
                {/* {match[1] === "xml"||match[1]==="html" && (
                  <div className="svg-container flex overflow-auto justify-center items-center w-full h-[200px] text-2xl bg-primary-100" dangerouslySetInnerHTML={{ __html: codeString }} />
                )}
                {match[1] === "latex" && (
                <div className="flex justify-center w-full">
                   <LaTeXTable code={codeString}/>
                   </div>
                )} */}
              </div>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-semibold" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-md font-semibold" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-sm font-semibold" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-xs font-semibold" {...props} />,
          hr: () => <hr className="my-4 border-t-2" />,
          img: ({ node, ...props }) => <img className="max-w-full h-auto" src={props.src} {...props} alt={props.alt} />,
          li: ({ node, ...props }) => <li className="list-disc mr-3" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal mr-3" {...props} />,
          p: ({ node, ...props }) => <p className="my-2" {...props} />,
          pre: ({ node, ...props }) => <pre className="bg-gray-100 p-2 rounded" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc mr-3" {...props} />,
        }}
      >
        {cleanResponse}
      </ReactMarkdown>
    </div>
  );
};

export default ChatBotResponse;
