export interface CatalogEditorProps {
  kind: "author" | "publisher";
  onCreated?: () => void;
}
