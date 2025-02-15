export const detectFileType = async (blob: Blob): Promise<string> => {
    // تبدیل ۱۶ بایت اول فایل به آرایه (برای تشخیص بهتر فرمت‌ها)
    const arr = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
    const header = Array.from(arr).map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    const signatures: Record<string, string> = {
      // تصاویر
      'ffd8ffe0': 'image/jpeg',      // JPEG/JPG
      'ffd8ffe1': 'image/jpeg',      // JPEG/JPG with EXIF
      'ffd8ffe2': 'image/jpeg',      // JPEG/JPG with EXIF
      '89504e47': 'image/png',       // PNG
      '47494638': 'image/gif',       // GIF
      '424d': 'image/bmp',           // BMP
      '49492a00': 'image/tiff',      // TIFF
      '4d4d002a': 'image/tiff',      // TIFF
      '00000100': 'image/x-icon',    // ICO
      '52494646': 'image/webp',      // WebP (شروع با RIFF)
  
      // ویدیو
      '66747970': 'video/mp4',       // MP4
      '1a45dfa3': 'video/webm',      // WebM
      '52494646': 'video/avi',       // AVI (شروع با RIFF)
      '000001ba': 'video/mpeg',      // MPEG
      '000001b3': 'video/mpeg',      // MPEG
      '3026b275': 'video/x-ms-wmv',  // WMV
      '464c5601': 'video/x-flv',     // FLV
  
      // صوت
      '52494646': 'audio/wav',       // WAV (شروع با RIFF)
      '49443303': 'audio/mpeg',      // MP3 (ID3v2.3)
      '49443304': 'audio/mpeg',      // MP3 (ID3v2.4)
      'fffb': 'audio/mpeg',          // MP3 (without ID3)
      '4f676753': 'audio/ogg',       // OGG
      '664c6143': 'audio/flac',      // FLAC
      '4d344120': 'audio/m4a',       // M4A
      '4d546864': 'audio/midi',      // MIDI
  
      // اسناد
      '25504446': 'application/pdf',                    // PDF
      '504b0304': 'application/zip',                    // ZIP
      '504b0506': 'application/zip',                    // ZIP (empty archive)
      '504b0708': 'application/zip',                    // ZIP
      'd0cf11e0': 'application/msword',                // DOC/XLS (Old Office)
      '504b0304': 'application/vnd.openxmlformats',    // DOCX/XLSX/PPTX (New Office)
      '7b5c7274': 'application/rtf',                   // RTF
      '1f8b0800': 'application/gzip',                  // GZIP
      '526172211a': 'application/x-rar-compressed',    // RAR
      '7z bcaf271c': 'application/x-7z-compressed',    // 7Z
      
      // فایل‌های اجرایی و باینری
      '4d5a': 'application/x-msdownload',              // EXE
      '7f454c46': 'application/x-elf',                 // ELF (Linux Executable)
      'cafebabe': 'application/java-class',            // Java Class
      '504b0304': 'application/java-archive',          // JAR
      
      // فرمت‌های دیگر
      '3c3f786d': 'application/xml',                   // XML
      '1f8b08': 'application/gzip',                    // GZIP
      '425a68': 'application/x-bzip2',                 // BZIP2
      '377abcaf': 'application/x-7z-compressed',       // 7Z
      '4f676753': 'application/ogg'                    // OGG Container
    };
  
    // بررسی ویژه برای فایل‌های MP4
    if (header.includes('66747970')) {
      return 'video/mp4';
    }
  
    // بررسی ویژه برای فایل‌های Office جدید
    if (header.startsWith('504b0304')) {
      // اگر نام فایل موجود است، بر اساس پسوند تشخیص دهیم
      if (runFileData.fileName) {
        const extension = runFileData.fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
          case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          case 'pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        }
      }
    }
  
    // بررسی تمام امضاها
    for (const [sig, mimeType] of Object.entries(signatures)) {
      if (header.startsWith(sig)) {
        return mimeType;
      }
    }
    // اگر نتوانستیم تشخیص دهیم، از نوع اصلی Blob استفاده می‌کنیم
    return blob.type || 'application/octet-stream';
  };