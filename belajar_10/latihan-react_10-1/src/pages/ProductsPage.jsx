import { Image as ImageIcon, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ActionDropdown } from "@/components/common/ActionDropdown"
import { PageCardHeader } from "@/components/common/PageCardHeader"
import { SearchInput } from "@/components/common/SearchInput"
import { initialCategories } from "../mock/isiProducts"
import useProductsPage from "@/hooks/useProductsPage"


export default function ProductsPage() {
  const {
    handleShowModal,
    showModal,
    setShowModal,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    editingProduct,
    formData,
    setFormData,
    getSubCategories,
    handleCategoryChangeInForm,
    handleSaveProduct,
    handleDeleteProduct,
    filteredProducts,
    formatRupiah
  } = useProductsPage();

  return (
    <div className="space-y-6">
      <PageCardHeader
        title="Katalog Produk"
        description="Kelola menu produk, harga, kategori, dan status best seller."
        actionLabel="Tambah Produk"
        onAction={() => handleShowModal()}
      />

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Cari nama, deskripsi, sub-kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-full sm:w-56">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Semua Kategori</SelectItem>
                {initialCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="w-16">Gambar</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-center font-medium text-muted-foreground">{index + 1}</TableCell>
                    <TableCell>
                      <div className="h-12 w-12 rounded-lg overflow-hidden border bg-slate-100 flex items-center justify-center shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{product.name}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                          {product.description || "Tidak ada deskripsi"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="capitalize">{product.category}</Badge>
                        <Badge variant="secondary">{product.subCategory}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(product.price)}
                    </TableCell>
                    <TableCell>
                      {product.isBestSeller ? (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
                          <Star className="h-3 w-3 fill-current" /> Best Seller
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Reguler</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionDropdown
                        onEdit={() => handleShowModal(product)}
                        onDelete={() => handleDeleteProduct(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    Tidak ada produk yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-xl">
          <form onSubmit={handleSaveProduct}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
              <DialogDescription>Masukkan detail produk di bawah ini.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4">
              <div className="space-y-2 md:col-span-8">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama produk"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-4">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="25000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-6">
                <Label>Kategori</Label>
                <Select value={formData.category} onValueChange={handleCategoryChangeInForm}>
                  <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                  <SelectContent>
                    {initialCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-6">
                <Label>Sub Kategori</Label>
                <Select value={formData.subCategory} onValueChange={(val) => setFormData({ ...formData, subCategory: val })}>
                  <SelectTrigger><SelectValue placeholder="Pilih Sub Kategori" /></SelectTrigger>
                  <SelectContent>
                    {getSubCategories(formData.category).map((sub, idx) => (
                      <SelectItem key={idx} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-12">
                <Label htmlFor="image">URL Gambar Produk</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-12">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  rows={3}
                  placeholder="Masukkan deskripsi produk..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-12 pt-2">
                <Checkbox
                  id="isBestSeller"
                  checked={formData.isBestSeller}
                  onCheckedChange={(checked) => setFormData({ ...formData, isBestSeller: Boolean(checked) })}
                />
                <Label htmlFor="isBestSeller" className="text-sm font-medium cursor-pointer">
                  Tandai sebagai Best Seller ⭐
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">{editingProduct ? "Simpan Perubahan" : "Tambah Produk"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}