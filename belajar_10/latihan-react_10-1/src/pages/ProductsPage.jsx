import { useState } from "react";
import { Card, Form, Badge, Row, Col, Image } from "react-bootstrap";
import { Products, initialCategories } from "../mock/isiProducts";
import TableFilterHeader from "../components/common/TableFilterHeader";
import DataTable from "../components/common/DataTable";
import ActionButtonGroup from "../components/common/ActionButtonGroup";
import FormModal from "../components/common/FormModal";

export default function ProductsPage() {
  const [products, setProducts] = useState(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "minuman",
    subCategory: "Espresso-Based",
    price: 0,
    image: "",
    description: "",
    isBestSeller: false,
  });

  const getSubCategories = (categoryKey) => {
    const found = initialCategories.find((cat) => cat.id === categoryKey);
    return found ? found.subCategories : [];
  };

  const handleShowModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        subCategory: product.subCategory,
        price: product.price,
        image: product.image,
        description: product.description,
        isBestSeller: product.isBestSeller,
      });
    } else {
      const defaultCategory = initialCategories[0]?.id || "minuman";
      const defaultSubCategories = getSubCategories(defaultCategory);
      setEditingProduct(null);
      setFormData({
        name: "",
        category: defaultCategory,
        subCategory: defaultSubCategories[0] || "",
        price: "",
        image: "",
        description: "",
        isBestSeller: false,
      });
    }
    setShowModal(true);
  };

  const handleCategoryChangeInForm = (e) => {
    const selectedCat = e.target.value;
    const subs = getSubCategories(selectedCat);
    setFormData({
      ...formData,
      category: selectedCat,
      subCategory: subs.length > 0 ? subs[0] : "",
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: Number(formData.price) }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...formData,
          price: Number(formData.price),
          rating: 0,
          reviewsCount: 0,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const categoryFilterOptions = [
    { value: "All", label: "Semua Kategori" },
    ...initialCategories.map((cat) => ({
      value: cat.id,
      label: `${cat.icon} ${cat.label}`,
    })),
  ];

  const tableHeaders = [
    { label: "#" },
    { label: "Gambar" },
    { label: "Nama Produk" },
    { label: "Kategori" },
    { label: "Harga" },
    { label: "Status" },
    { label: "Aksi", className: "text-end" },
  ];

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <TableFilterHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Cari nama produk, deskripsi, sub-kategori..."
          filterValue={categoryFilter}
          onFilterChange={setCategoryFilter}
          filterOptions={categoryFilterOptions}
          addButtonLabel="+ Tambah Produk"
          onAddClick={() => handleShowModal()}
        />

        <DataTable
          headers={tableHeaders}
          data={filteredProducts}
          emptyMessage="Tidak ada produk yang ditemukan."
          renderRow={(product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={product.image || "https://via.placeholder.com/60"}
                  alt={product.name}
                  rounded
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <div className="fw-semibold">{product.name}</div>
                <small
                  className="text-muted d-block text-truncate"
                  style={{ maxWidth: "250px" }}
                >
                  {product.description}
                </small>
              </td>
              <td>
                <Badge bg="secondary" className="me-1">
                  {product.category}
                </Badge>
                <Badge bg="info" text="dark">
                  {product.subCategory}
                </Badge>
              </td>
              <td className="fw-bold text-success">
                {formatRupiah(product.price)}
              </td>
              <td>
                {product.isBestSeller ? (
                  <Badge bg="warning" text="dark">
                    ⭐ Best Seller
                  </Badge>
                ) : (
                  <Badge bg="light" text="dark" className="border">
                    Reguler
                  </Badge>
                )}
              </td>
              <td>
                <ActionButtonGroup
                  onEdit={() => handleShowModal(product)}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              </td>
            </tr>
          )}
        />
      </Card.Body>

      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSaveProduct}
        title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
        submitText={editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
        size="lg"
      >
        <Row className="g-3">
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Masukkan nama produk"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Harga (Rp)</Form.Label>
              <Form.Control
                type="number"
                required
                min="0"
                placeholder="25000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={handleCategoryChangeInForm}
              >
                {initialCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Sub Kategori</Form.Label>
              <Form.Select
                value={formData.subCategory}
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
              >
                {getSubCategories(formData.category).map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>URL Gambar Produk</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi produk..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="isBestSeller"
              label="Tandai sebagai Best Seller ⭐"
              checked={formData.isBestSeller}
              onChange={(e) =>
                setFormData({ ...formData, isBestSeller: e.target.checked })
              }
            />
          </Col>
        </Row>
      </FormModal>
    </Card>
  );
}