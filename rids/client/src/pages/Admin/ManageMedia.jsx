import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchMedia, createMedia, updateMedia, deleteMedia } from "../../api/mediaApi";

export default function ManageMedia() {
  return (
    <AdminCrudTable
      title="Media coverage"
      description="News articles, interviews and press mentions."
      columns={[
        { key: "title", label: "Title" },
        { key: "source", label: "Source" },
        { key: "publishedDate", label: "Date", render: (i) => new Date(i.publishedDate).toLocaleDateString() },
      ]}
      fieldSchema={[
        { name: "title", label: "Title", required: true },
        { name: "source", label: "Source", required: true },
        { name: "link", label: "Link URL", required: true },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "publishedDate", label: "Published date", type: "date", required: true },
        { name: "imageUrl", label: "Image URL" },
      ]}
      api={{ list: fetchMedia, create: createMedia, update: updateMedia, remove: deleteMedia }}
    />
  );
}
