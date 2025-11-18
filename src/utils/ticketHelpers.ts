// Helper functions for ticket-related translations and utilities

export const getSubjectLabel = (subject: string): string => {
  switch (subject) {
    case "PRODUCT":
      return "محصول";
    case "TECHNICAL":
      return "فنی";
    case "SALE":
      return "فروش";
    case "ORDER":
      return "سفارش";
    case "SUPPORT":
      return "پشتیبانی";
    default:
      return subject || "_";
  }
};

export const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case "HIGH":
      return "بالا";
    case "MEDIUM":
      return "متوسط";
    case "LOW":
      return "پایین";
    default:
      return priority || "_";
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case "WAIT_FOR_ANSWER":
      return "در انتظار پاسخ";
    case "ANSWERED":
      return "پاسخ داده شده";
    case "ADMIN_CLOSED":
      return "بسته شده";
    case "OPEN":
      return "باز";
    default:
      return status || "_";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-800";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800";
    case "LOW":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "WAIT_FOR_ANSWER":
      return "bg-orange-100 text-orange-800";
    case "ANSWERED":
      return "bg-blue-100 text-blue-800";
    case "CLOSED":
      return "bg-gray-100 text-gray-800";
    case "OPEN":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Subject options for dropdowns/filters
export const subjectOptions = [
  { label: "فنی", value: "TECHNICAL" },
  { label: "فروش", value: "SALE" },
  { label: "محصول", value: "PRODUCT" },
  { label: "سفارش", value: "ORDER" },
  { label: "پشتیبانی", value: "SUPPORT" },
];

// Priority options for dropdowns/filters
export const priorityOptions = [
  { label: "بالا", value: "HIGH" },
  { label: "متوسط", value: "MEDIUM" },
  { label: "پایین", value: "LOW" },
];

// Status options for dropdowns/filters
export const statusOptions = [
  { label: "باز", value: "OPEN" },
  { label: "در انتظار پاسخ", value: "WAIT_FOR_ANSWER" },
  { label: "پاسخ داده شده", value: "ANSWERED" },
  { label: "بسته شده", value: "CLOSED" },
];