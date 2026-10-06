import { useState } from "react";
import { Card, Form, Badge, Row, Col } from "react-bootstrap";
import { initialCategories } from "../mock/isiProducts";
import TableFilterHeader from "../components/common/TableFilterHeader";
import DataTable from "../components/common/DataTable";
import ActionButtonGroup from "../components/common/ActionButtonGroup";
import FormModal from "../components/common/FormModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    icon: "",
    subCategories: "",
  });

  const handleShowModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        label: category.label,
        icon: category.icon,
        subCategories: category.subCategories ? category.subCategories.join(", ") : "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ label: "", icon: "📁", subCategories: "" });
    }
    setShowModal(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const subCategoriesArray = formData.subCategories
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, label: formData.label, icon: formData.icon, subCategories: subCategoriesArray }
            : c
        )
      );
    } else {
      const newCategory = {
        id: formData.label.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        label: formData.label,
        icon: formData.icon || "📁",
        subCategories: subCategoriesArray,
      };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesLabel = category.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = category.subCategories?.some((sub) =>
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesLabel || matchesSub;
  });

  const tableHeaders = [
    { label: "#" },
    { label: "Nama Kategori" },
    { label: "Sub Kategori" },
    { label: "Aksi", className: "text-end" },
  ];

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <TableFilterHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Cari kategori atau sub-kategori..."
          addButtonLabel="+ Tambah Kategori"
          onAddClick={() => handleShowModal()}
        />

        <DataTable
          headers={tableHeaders}
          data={filteredCategories}
          emptyMessage="Tidak ada kategori yang ditemukan."
          renderRow={(category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td className="fw-semibold">
                {category.label}
              </td>
              <td>
                {category.subCategories && category.subCategories.length > 0 ? (
                  <div className="d-flex flex-wrap gap-1">
                    {category.subCategories.map((sub, i) => (
                      <Badge key={i} bg="light" text="dark" className="border">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted small">- Tidak ada sub kategori -</span>
                )}
              </td>
              <td>
                <ActionButtonGroup
                  onEdit={() => handleShowModal(category)}
                  onDelete={() => handleDeleteCategory(category.id)}
                />
              </td>
            </tr>
          )}
        />
      </Card.Body>

      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSaveCategory}
        title={editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
        submitText={editingCategory ? "Simpan Perubahan" : "Tambah"}
      >
        <Row className="g-2 mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ikon (Emoji)</Form.Label>
              <Form.Control
                type="text"
                placeholder="☕"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group>
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Contoh: Minuman"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Sub Kategori (Pisahkan dengan koma)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Espresso-Based, Manual Brew, Cold Brew"
            value={formData.subCategories}
            onChange={(e) => setFormData({ ...formData, subCategories: e.target.value })}
          />
          <Form.Text className="text-muted">
            Input beberapa sub-kategori sekaligus dipisahkan dengan koma.
          </Form.Text>
        </Form.Group>
      </FormModal>
    </Card>
  );
}