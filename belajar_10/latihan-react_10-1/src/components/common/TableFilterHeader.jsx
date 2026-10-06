import { Row, Col, InputGroup, Form, Button } from "react-bootstrap";

export default function TableFilterHeader({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Cari...",
  filterValue,
  onFilterChange,
  filterOptions = [],
  addButtonLabel,
  onAddClick,
}) {
  const hasFilter = filterOptions.length > 0;

  return (
    <Row className="mb-4 align-items-center g-2">
      <Col md={hasFilter ? 5 : 6}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>
      {hasFilter && (
        <Col md={3}>
          <Form.Select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}
      <Col md={hasFilter ? 4 : 6} className="text-md-end">
        {addButtonLabel && (
          <Button variant="primary" onClick={onAddClick}>
            {addButtonLabel}
          </Button>
        )}
      </Col>
    </Row>
  );
}