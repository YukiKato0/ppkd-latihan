import { useState } from "react";
import { Card, Form, Modal, Table, Button, Badge, InputGroup, Row, Col } from "react-bootstrap";
import { listUser } from "../mock/listUser";

export default function ListUser() {
  const [users, setUsers] = useState(listUser);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const handleShowModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "User", status: "Active" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
      );
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        {/* Header & Baris Pencarian/Filter */}
        <Row className="mb-4 align-items-center g-2">
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="All">Semua Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </Form.Select>
          </Col>
          <Col md={5} className="text-md-end">
            <Button variant="primary" onClick={() => handleShowModal()}>
              + Tambah User
            </Button>
          </Col>
        </Row>

        {/* Tabel Data User */}
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{user.name}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <Badge
                        bg={
                          user.role === "Admin"
                            ? "danger"
                            : user.role === "Editor"
                              ? "warning"
                              : "info"
                        }>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge
                        bg={user.status === "Active" ? "success" : "secondary"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(user)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    Tidak ada data pengguna yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Form onSubmit={handleSaveUser}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingUser ? "Edit User" : "Tambah User Baru"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Masukkan nama"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="nama@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
}
