import { Button } from "@/components/ui/button"

export default function ActionButtonGroup({ onEdit, onDelete }) {
  return (
    <div className="text-end">
      <Button
        size="sm"
        className="me-2"
        onClick={onEdit}
      >
        Edit
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        Hapus
      </Button>
    </div>
  );
}