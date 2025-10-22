const formateDate = (dateStr) => {
  // If it's already in "MMM YYYY" format (like "Apr 2022"), return as-is
  if (/^[A-Za-z]{3} \d{4}$/.test(dateStr)) return dateStr;

  // Try parsing ISO or other standard format
  const parsed = Date.parse(dateStr);
  if (isNaN(parsed)) return "Invalid Date";

  const date = new Date(parsed);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

function timeAgo(dateInput) {
  const postDate = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const formateInterviewTime = (dateStr) => {
  const date = new Date(dateStr);

  return date.toLocaleString("en-US", {
    month: "long", // October
    day: "numeric", // 3
    year: "numeric", // 2025
    hour: "numeric", // 10
    minute: "2-digit", // 00
    hour12: true, // AM/PM
  });
};

function openBase64Pdf(base64String) {
  // Convert base64 to binary
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Create blob and URL
  const file = new Blob([byteArray], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);

  // Open in new tab
  window.open(fileURL, "_blank");
}

export { formateDate, timeAgo, getBase64, formateInterviewTime, openBase64Pdf };
