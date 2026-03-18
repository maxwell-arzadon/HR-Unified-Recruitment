/**
 * studio.js
 * Data for Studio Accounts and their assigned applicants.
 * Each studio account belongs to a department for filtering.
 */

export const SA_DEPARTMENTS = [
  "All Departments",
  "Customer Support",
  "Programming",
  "Marketing",
  "Language",
  "Non Voice",
];

export const STUDIO_ACCOUNTS = [
  {
    id: 1,
    name: "Mae Santos",
    date: "May 22, 2020",
    saId: "SA_092344",
    department: "Customer Support",
  },
  {
    id: 2,
    name: "John Reyes",
    date: "May 18, 2020",
    saId: "SA_092345",
    department: "Programming",
  },
  {
    id: 3,
    name: "Lee Mendoza",
    date: "May 15, 2020",
    saId: "SA_092346",
    department: "Customer Support",
  },
  {
    id: 4,
    name: "Cruz Bautista",
    date: "May 10, 2020",
    saId: "SA_092347",
    department: "Marketing",
  },
  {
    id: 5,
    name: "Ana Rivera",
    date: "May 8, 2020",
    saId: "SA_092348",
    department: "Language",
  },
  {
    id: 6,
    name: "Rico Dela Cruz",
    date: "May 5, 2020",
    saId: "SA_092349",
    department: "Non Voice",
  },
  {
    id: 7,
    name: "Gina Flores",
    date: "May 1, 2020",
    saId: "SA_092350",
    department: "Marketing",
  },
];

export const SA_APPLICANTS = {
  1: [
    { id: 101, name: "Milan Hopper", status: "Certification" },
    { id: 102, name: "Abby Floyd", status: "Certification" },
    { id: 103, name: "Nate Hartley", status: "Certification" },
    { id: 104, name: "Lena Park", status: null },
  ],
  2: [
    { id: 105, name: "Jason Heigh", status: "Certification" },
    { id: 106, name: "Tom Reyes", status: null },
  ],
  3: [
    { id: 107, name: "Sara Kim", status: "Certification" },
    { id: 108, name: "Keith Atherton", status: "Certification" },
  ],
  4: [{ id: 109, name: "Lena Park", status: "Certification" }],
  5: [
    { id: 110, name: "Sara Kim", status: "Certification" },
    { id: 111, name: "Milan Hopper", status: "Certification" },
  ],
  6: [{ id: 112, name: "Abby Floyd", status: "Certification" }],
  7: [
    { id: 113, name: "Nate Hartley", status: "Certification" },
    { id: 114, name: "Tom Reyes", status: "Certification" },
  ],
};
