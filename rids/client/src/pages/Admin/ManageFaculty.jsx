import { useEffect, useState } from "react";
import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchFaculty, createFaculty, updateFaculty, deleteFaculty } from "../../api/facultyApi";
import { fetchDepartments } from "../../api/departmentApi";
import { Loader } from "../../components/Loader";

export default function ManageFaculty() {
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    fetchDepartments({ limit: 50 }).then((d) => setDepartments(d.items.map((x) => ({ value: x._id, label: x.name }))));
  }, []);

  if (!departments) return <Loader label="Loading form options" />;

  return (
    <AdminCrudTable
      title="Faculty"
      description="Faculty profiles linked to departments and research output."
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "department", label: "Department", render: (i) => i.department?.name || "—" },
      ]}
      fieldSchema={[
        { name: "name", label: "Full name", required: true },
        { name: "designation", label: "Designation" },
        { name: "department", label: "Department", type: "select", required: true, options: departments },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "email", label: "Email" },
        { name: "photoUrl", label: "Photo URL" },
      ]}
      api={{
        list: (params) => fetchFaculty(params),
        create: createFaculty,
        update: updateFaculty,
        remove: deleteFaculty,
      }}
    />
  );
}
