const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getRadiusCollection = () => [
  { id: "1", title: "10 mi" },
  { id: "2", title: "25 mi" },
  { id: "3", title: "50 mi" },
  { id: "4", title: "75 mi" },
  { id: "5", title: "100 mi" },
  { id: "6", title: "150 mi" },
  { id: "7", title: "200 mi" },
  { id: "8", title: "500 mi" },
  { id: "9", title: "Nationwide" },
];

export function insertEmployee(data) {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
    localStorage.setItem(KEYS.employeeId, "0");
  var id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.employees));
}
