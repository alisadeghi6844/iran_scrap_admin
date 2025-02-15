import React, { useEffect, useState } from "react";
import { TextOverflowTypes } from "../types/utils/TextOverflowTypes";

const TextOverflow: React.FC<TextOverflowTypes> = (props) => {
  const { children, number = 50 } = props;

  const [resultText, setResultText] = useState<string | null>(null);

  useEffect(() => {
    if (typeof children === "string") {
      const text = children || "";
      
      // تبدیل رشته به آرایه‌ای از کاراکترها با پشتیبانی از یونیکد
      const chars = Array.from(text);
      
      if (chars.length <= number) {
        setResultText(text);
        return;
      }

      // برش متن تا تعداد کاراکتر مورد نظر
      let slicedText = chars.slice(0, number).join('');
      
      // اطمینان از اینکه در وسط کلمه قطع نشود
      const lastSpace = slicedText.lastIndexOf(' ');
      const lastPunctuation = Math.max(
        slicedText.lastIndexOf('،'),
        slicedText.lastIndexOf('.'),
        slicedText.lastIndexOf('؟'),
        slicedText.lastIndexOf('!'),
        slicedText.lastIndexOf('؛')
      );
      
      // انتخاب نقطه مناسب برای قطع متن
      const breakPoint = Math.max(lastSpace, lastPunctuation);
      
      if (breakPoint > number * 0.7) { // اگر نقطه قطع حداقل 70% طول مورد نظر باشد
        slicedText = text.slice(0, breakPoint);
      }

      setResultText(`${slicedText}${chars.length > number ? "..." : ""}`);
    } else {
      setResultText(children as string);
    }
  }, [children, number]);

  return <>{resultText}</>;
}

export default TextOverflow;
