import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from "../../api/departmentApi";

export default function ManageDepartments() {
  return (
    <AdminCrudTable
      title="Departments"
      description="Academic units — Agriculture, Veterinary Sciences, Food Sciences, etc."
      columns={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "isActive", label: "Active", render: (i) => (i.isActive ? "Yes" : "No") },
      ]}
      fieldSchema={[
        { name: "name", label: "Name", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
      api={{ list: fetchDepartments, create: createDepartment, update: updateDepartment, remove: deleteDepartment }}
    />
  );
}
