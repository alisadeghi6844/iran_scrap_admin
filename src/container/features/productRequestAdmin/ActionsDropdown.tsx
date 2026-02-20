import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import Button from "../../../components/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye, FaListAlt, FaPencilAlt, FaStopCircle } from "react-icons/fa";
import { CloseRequestAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";

interface ActionsDropdownProps {
  row: any;
  onRowClick: (name: string, row: any) => void;
  onSuggestionsClick: (row: any) => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  row,
  onRowClick,
  onSuggestionsClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleToggle = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 176 // عرض دراپ داون
      });
    }
    
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const dropdownContent = isOpen ? (
    <div
      ref={dropdownRef}
      className="fixed w-[170px] left-20 bg-white rounded-md shadow-lg border border-gray-200 p-1"
      style={{ 
        zIndex: 9999,
        top: dropdownPosition.top,
      }}
    >
      <ul className="py-1 text-right flex flex-col gap-1">
        <li>
          <Button
            size="sm"
            variant="error"
            className="w-full !justify-start !text-xs gap-2"
            onClick={() => {
              dispatch(CloseRequestAction({ requestId: row?.id || row?._id }));
              setIsOpen(false);
            }}
          >
            <FaStopCircle className="ml-1"/>
            <span>بستن زمان مناقصه</span>
          </Button>
        </li>
        <li>
          <Button
            size="sm"
            variant="secondary"
            className="w-full !justify-start !text-xs gap-2"
            onClick={() => {
              onRowClick("detail", row);
              setIsOpen(false);
            }}
          >
            <FaPencilAlt className="ml-1"/>
            <span>ویرایش درخواست</span>
          </Button>
        </li>
        <li>
          <Button
            size="sm"
            variant="success"
            className="w-full !justify-start !text-xs gap-2"
            onClick={() => {
              onRowClick("showMore", row);
              setIsOpen(false);
            }}
          >
            <FaEye className="ml-1"/>
            <span>مشاهده بیشتر</span>
          </Button>
        </li>
        <li>
          <Button
            size="sm"
            variant="primary"
            className="w-full !justify-start !text-xs gap-2"
            onClick={() => {
              onSuggestionsClick(row);
              setIsOpen(false);
            }}
          >
            <FaListAlt className="ml-1"/>
            <span>پیشنهادات</span>
          </Button>
        </li>
      </ul>
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={handleToggle} variant="light" size="sm" className="!p-2">
        <BsThreeDotsVertical />
      </Button>
      
      {dropdownContent && createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default ActionsDropdown;
