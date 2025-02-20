import React from "react";
import Table from "../../components/table";
import TableBody from "../../components/table/TableBody";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import TableHead from "../../components/table/TableHead"; // اضافه کردن TableHead

interface LaTeXTableProps {
  code: string;
}

const LaTeXTable: React.FC<LaTeXTableProps> = ({ code }) => {
  // تجزیه کد LaTeX و استخراج محتوا
  const rows = code
    .replace(/\\begin{tabular}{.*?}/, "") // حذف شروع جدول
    .replace(/\\end{tabular}/, "") // حذف پایان جدول
    .split(/\\hline/) // تقسیم بر روی خطوط
    .map(row => row.trim())
    .filter(row => row.length > 0); // حذف ردیف‌های خالی

  // استخراج سطر اول به عنوان سرعنوان
  const headerRow = rows.shift(); // حذف و ذخیره سطر اول به عنوان سرعنوان
  const headers = headerRow ? headerRow.split(/&/) : []; // تقسیم سرعنوان‌ها

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index} textNumber={100}>
              {header.trim()} {/* حذف فضاهای اضافی */}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {row.split(/&/).map((cell, cellIndex) => (
              <TableCell key={cellIndex} textNumber={100}>
                {cell.trim()} {/* حذف فضاهای اضافی */}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LaTeXTable;
