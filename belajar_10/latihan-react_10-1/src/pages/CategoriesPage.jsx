import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { ActionDropdown } from "@/components/common/ActionDropdown"
import { PageCardHeader } from "@/components/common/PageCardHeader"
import { SearchInput } from "@/components/common/SearchInput"
import { initialCategories } from "../mock/isiProducts"

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [searchTerm, setSearchTerm] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ label: "", icon: "", subCategories: "" })

  const handleShowModal = (category = null) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        label: category.label,
        icon: category.icon,
        subCategories: category.subCategories ? category.subCategories.join(", ") : "",
      })
    } else {
      setEditingCategory(null)
      setFormData({ label: "", icon: "📁", subCategories: "" })
    }
    setShowModal(true)
  }

  const handleSaveCategory = (e) => {
    e.preventDefault()
    const subCategoriesArray = formData.subCategories
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, label: formData.label, icon: formData.icon, subCategories: subCategoriesArray }
            : c
        )
      )
    } else {
      const newCategory = {
        id: formData.label.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        label: formData.label,
        icon: formData.icon || "📁",
        subCategories: subCategoriesArray,
      }
      setCategories([...categories, newCategory])
    }
    setShowModal(false)
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  const filteredCategories = categories.filter((category) => {
    const term = searchTerm.toLowerCase()
    return (
      category.label.toLowerCase().includes(term) ||
      category.subCategories?.some((sub) => sub.toLowerCase().includes(term))
    )
  })

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <PageCardHeader
          title="Kategori Produk"
          description="Kelola kategori dan kelompok sub-kategori untuk produk Anda."
          actionLabel="Tambah Kategori"
          onAction={() => handleShowModal()}
        />

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="Cari kategori atau sub-kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Sub Kategori</TableHead>
                  <TableHead className="w-20 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell className="text-center font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {category.subCategories?.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {category.subCategories.map((sub, i) => (
                              <Badge key={i} variant="secondary" className="font-normal">{sub}</Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Belum ada sub kategori</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionDropdown
                          onEdit={() => handleShowModal(category)}
                          onDelete={() => handleDeleteCategory(category.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      Tidak ada kategori yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSaveCategory}>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
              <DialogDescription>Isi rincian nama kategori, ikon, dan daftar sub-kategori di bawah ini.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="icon">Ikon / Emoji</Label>
                <Input
                  id="icon"
                  placeholder="☕"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-9">
                <Label htmlFor="label">Nama Kategori</Label>
                <Input
                  id="label"
                  placeholder="Contoh: Minuman"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-12">
                <Label htmlFor="subCategories">Sub Kategori (Pisahkan dengan koma)</Label>
                <Textarea
                  id="subCategories"
                  rows={3}
                  placeholder="Espresso-Based, Manual Brew, Cold Brew"
                  value={formData.subCategories}
                  onChange={(e) => setFormData({ ...formData, subCategories: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Gunakan tanda koma (,) untuk memisahkan setiap item sub-kategori.</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">{editingCategory ? "Simpan Perubahan" : "Tambah"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}