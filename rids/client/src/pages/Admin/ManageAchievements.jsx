import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchAchievements, createAchievement, updateAchievement, deleteAchievement } from "../../api/achievementApi";

export default function ManageAchievements() {
  return (
    <AdminCrudTable
      title="Achievements"
      description="Awards, grants and recognitions."
      columns={[
        { key: "title", label: "Title" },
        { key: "recipientName", label: "Recipient" },
        { key: "date", label: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
      ]}
      fieldSchema={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "recipientType",
          label: "Recipient type",
          type: "select",
          required: true,
          options: [
            { value: "faculty", label: "Faculty" },
            { value: "student", label: "Student" },
            { value: "department", label: "Department" },
          ],
        },
        { name: "recipientName", label: "Recipient name", required: true },
        { name: "date", label: "Date", type: "date", required: true },
      ]}
      api={{ list: fetchAchievements, create: createAchievement, update: updateAchievement, remove: deleteAchievement }}
    />
  );
}
