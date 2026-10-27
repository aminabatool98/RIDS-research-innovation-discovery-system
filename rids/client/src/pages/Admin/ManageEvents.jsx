import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../api/eventApi";

export default function ManageEvents() {
  return (
    <AdminCrudTable
      title="Events"
      description="Conferences, seminars and innovation events."
      columns={[
        { key: "title", label: "Title" },
        { key: "venue", label: "Venue" },
        { key: "date", label: "Date", render: (i) => new Date(i.date).toLocaleDateString() },
      ]}
      fieldSchema={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "date", label: "Date", type: "date", required: true },
        { name: "venue", label: "Venue" },
        { name: "imageUrl", label: "Image URL" },
      ]}
      api={{ list: fetchEvents, create: createEvent, update: updateEvent, remove: deleteEvent }}
    />
  );
}
