export const processThinkingText = (inputText: string) => {
  const thinkingText = "در حال فکر کردن...";
  let outputText = "";

  const startTag = '<think>';
  const endTag = '</think>';
  const parts = inputText.split(endTag);

  for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (part.includes(startTag)) {
          outputText += thinkingText;
          // اگر تگ <think> وجود داشت، متن بعدی را نادیده بگیرید
          continue;
      } else {
          // بعد از تگ </think>، outputText را خالی کنید و متن جدید را اضافه کنید
          outputText = part; // اینجا متون جدید را داخل outputText قرار می‌دهیم
      }
  }

  return outputText.trim(); // حذف فضاهای خالی اضافی
};
