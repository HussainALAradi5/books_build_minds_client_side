import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import AdminBookForm from "../AdminBookForm";
import AdminInventoryPanel from "../AdminInventoryPanel";
import AdminCatalogPanel from "../AdminCatalogPanel";
import AdminRequestsPanel from "../AdminRequestsPanel";

const AdminTabs = () => <GenericTabs label="Administration sections" items={[
  { value: "inventory", label: "Inventory", content: <AdminInventoryPanel /> },
  { value: "book", label: "Add book", content: <AdminBookForm /> },
  { value: "catalog", label: "Catalog", content: <AdminCatalogPanel /> },
  { value: "requests", label: "Access requests", content: <AdminRequestsPanel /> },
]} />;

export default AdminTabs;
