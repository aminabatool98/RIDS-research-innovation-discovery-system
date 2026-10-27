import { useEffect, useState } from "react";
import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchResearch, createResearch, updateResearch, deleteResearch } from "../../api/researchApi";
import { fetchDepartments } from "../../api/departmentApi";
import { fetchFields } from "../../api/fieldApi";
import { Loader } from "../../components/Loader";

export default function ManageResearch() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    Promise.all([fetchDepartments({ limit: 50 }), fetchFields({ limit: 50 })]).then(([d, f]) => {
      setOptions({
        departments: d.items.map((x) => ({ value: x._id, label: x.name })),
        fields: f.items.map((x) => ({ value: x._id, label: x.name })),
      });
    });
  }, []);

  if (!options) return <Loader label="Loading form options" />;

  return (
    <AdminCrudTable
      title="Research papers"
      description="Post and manage the research catalogue."
      columns={[
        { key: "title", label: "Title" },
        { key: "department", label: "Department", render: (i) => i.department?.name || "—" },
        { key: "field", label: "Field", render: (i) => i.field?.name || "—" },
        { key: "publishedYear", label: "Year" },
        { key: "isFeatured", label: "Featured", render: (i) => (i.isFeatured ? "Yes" : "No") },
      ]}
      fieldSchema={[
        { name: "title", label: "Title", required: true },
        { name: "abstract", label: "Abstract", type: "textarea", required: true },
        { name: "department", label: "Department", type: "select", required: true, options: options.departments },
        { name: "field", label: "Field", type: "select", required: true, options: options.fields },
        { name: "authors", label: "Authors (comma separated)", multi: true, required: true },
        { name: "tags", label: "Tags (comma separated)", multi: true },
        { name: "publishedYear", label: "Published year", type: "number", required: true },
        { name: "fileUrl", label: "File URL" },
        { name: "isFeatured", label: "Featured", type: "checkbox" },
      ]}
      api={{
        list: (params) => fetchResearch(params),
        create: createResearch,
        update: updateResearch,
        remove: deleteResearch,
      }}
    />
  );
}
