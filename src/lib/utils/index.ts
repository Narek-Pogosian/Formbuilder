import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function answersToCsv(answers: ) {
//   const csvRows = [];
//   const headers = Object.keys(answers[0]!);

//   csvRows.push(headers.join(","));
//   for (const obj of answers) {
//     csvRows.push(Object.values(obj).join(","));
//   }

//   return csvRows.join("\n");
// }

// export const downloadCsv = (filename: string, csv: string) => {
//   const csvFile = new Blob([csv], { type: "text/csv" });
//   const downloadLink = document.createElement("a");

//   downloadLink.download = filename;
//   downloadLink.href = window.URL.createObjectURL(csvFile);
//   downloadLink.style.display = "none";

//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
// };
