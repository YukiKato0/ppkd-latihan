import { useState } from "react"
import { initialCategories, Products as initialProducts } from "../mock/isiProducts"

export default function useProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "minuman",
    subCategory: "Espresso-Based",
    price: "",
    image: "",
    description: "",
    isBestSeller: false,
  })

  const getSubCategories = (categoryKey) => {
    const found = initialCategories.find((cat) => cat.id === categoryKey)
    return found ? found.subCategories : []
  }

  const handleShowModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        subCategory: product.subCategory,
        price: String(product.price),
        image: product.image,
        description: product.description,
        isBestSeller: product.isBestSeller,
      })
    } else {
      const defaultCategory = initialCategories[0]?.id || "minuman"
      const defaultSubCategories = getSubCategories(defaultCategory)
      setEditingProduct(null)
      setFormData({
        name: "",
        category: defaultCategory,
        subCategory: defaultSubCategories[0] || "",
        price: "",
        image: "",
        description: "",
        isBestSeller: false,
      })
    }
    setShowModal(true)
  }

  const handleCategoryChangeInForm = (selectedCat) => {
    const subs = getSubCategories(selectedCat)
    setFormData((prev) => ({
      ...prev,
      category: selectedCat,
      subCategory: subs.length > 0 ? subs[0] : "",
    }))
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: Number(formData.price) }
            : p
        )
      )
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
      ])
    }
    setShowModal(false)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.subCategory.toLowerCase().includes(term)
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number)
  }

  return {
    handleShowModal,
    showModal,
    setShowModal,
    products,
    setProducts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    editingProduct,
    setEditingProduct,
    formData,
    setFormData,
    getSubCategories,
    handleCategoryChangeInForm,
    handleSaveProduct,
    handleDeleteProduct,
    filteredProducts,
    formatRupiah
  }
}