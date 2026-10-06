import { useState } from "react";
import { Card, Form, Badge, Row, Col } from "react-bootstrap";
import { listUser } from "../mock/listUser";
import TableFilterHeader from "../components/common/TableFilterHeader";
import DataTable from "../components/common/DataTable";
import ActionButtonGroup from "../components/common/ActionButtonGroup";
import FormModal from "../components/common/FormModal";

export default function ListUserPage() {
  const [users, setUsers] = useState(listUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User", status: "Active" });

  const handleShowModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "User", status: "Active" });
    }
    setShowModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)));
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const tableHeaders = [
    { label: "#" },
    { label: "Nama" },
    { label: "Email" },
    { label: "Role" },
    { label: "Status" },
    { label: "Aksi", className: "text-end" },
  ];

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <TableFilterHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Cari nama atau email..."
          filterValue={roleFilter}
          onFilterChange={setRoleFilter}
          filterOptions={[
            { value: "All", label: "Semua Role" },
            { value: "Admin", label: "Admin" },
            { value: "Editor", label: "Editor" },
            { value: "User", label: "User" },
          ]}
          addButtonLabel="+ Tambah User"
          onAddClick={() => handleShowModal()}
        />

        <DataTable
          headers={tableHeaders}
          data={filteredUsers}
          emptyMessage="Tidak ada data pengguna yang ditemukan."
          renderRow={(user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td className="fw-semibold">{user.name}</td>
              <td className="text-muted">{user.email}</td>
              <td>
                <Badge bg={user.role === "Admin" ? "danger" : user.role === "Editor" ? "warning" : "info"}>
                  {user.role}
                </Badge>
              </td>
              <td>
                <Badge bg={user.status === "Active" ? "success" : "secondary"}>
                  {user.status}
                </Badge>
              </td>
              <td>
                <ActionButtonGroup
                  onEdit={() => handleShowModal(user)}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          )}
        />
      </Card.Body>

      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSaveUser}
        title={editingUser ? "Edit User" : "Tambah User Baru"}
        submitText={editingUser ? "Simpan Perubahan" : "Tambah"}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Masukkan nama"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="nama@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Group>
        <Row className="g-2">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
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
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </FormModal>
    </Card>
  );
}