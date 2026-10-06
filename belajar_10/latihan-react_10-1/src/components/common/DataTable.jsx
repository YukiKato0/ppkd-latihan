import { Table } from "react-bootstrap";

export default function DataTable({
  headers,
  data,
  renderRow,
  emptyMessage = "Tidak ada data yang ditemukan.",
}) {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0">
        <thead className="table-light">
          <tr>
            {headers.map((h, index) => (
              <th key={index} className={h.className || ""}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-muted">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}