import { AdminCrudTable } from "../../components/AdminCrudTable";
import { fetchNews, createNews, updateNews, deleteNews } from "../../api/newsApi";

export default function ManageNews() {
  return (
    <AdminCrudTable
      title="News"
      description="Research-related announcements and updates."
      columns={[
        { key: "title", label: "Title" },
        { key: "publishedDate", label: "Date", render: (i) => new Date(i.publishedDate).toLocaleDateString() },
      ]}
      fieldSchema={[
        { name: "title", label: "Title", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "publishedDate", label: "Published date", type: "date" },
        { name: "tags", label: "Tags (comma separated)", multi: true },
        { name: "imageUrl", label: "Image URL" },
      ]}
      api={{ list: fetchNews, create: createNews, update: updateNews, remove: deleteNews }}
    />
  );
}
