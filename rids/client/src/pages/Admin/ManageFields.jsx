import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchFields, createField, updateField, deleteField } from "../../api/fieldApi";

export default function ManageFields() {
  return (
    <AdminCrudTable
      title="Fields"
      description="The 10 fixed knowledge areas used to tag research papers."
      columns={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "color", label: "Color" },
      ]}
      fieldSchema={[
        { name: "name", label: "Name", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "color", label: "Color (hex)", hint: "e.g. #C9A227" },
      ]}
      api={{ list: fetchFields, create: createField, update: updateField, remove: deleteField }}
    />
  );
}
