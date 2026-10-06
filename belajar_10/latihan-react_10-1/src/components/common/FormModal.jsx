import { Modal, Form, Button } from "react-bootstrap";

export default function FormModal({
  show,
  onHide,
  onSubmit,
  title,
  children,
  size = "md",
  submitText = "Simpan",
  cancelText = "Batal",
}) {
  return (
    <Modal show={show} onHide={onHide} size={size} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {cancelText}
          </Button>
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}