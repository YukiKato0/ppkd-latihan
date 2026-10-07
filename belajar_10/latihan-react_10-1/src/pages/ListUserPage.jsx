import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ActionDropdown } from "@/components/common/ActionDropdown"
import { PageCardHeader } from "@/components/common/PageCardHeader"
import { SearchInput } from "@/components/common/SearchInput"
import { listUser as initialListUser } from "../mock/listUser"

export default function ListUserPage() {
  const [users, setUsers] = useState(initialListUser)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", role: "User", status: "Active" })

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status })
    } else {
      setEditingUser(null)
      setFormData({ name: "", email: "", role: "User", status: "Active" })
    }
    setShowModal(true)
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)))
    } else {
      setUsers([...users, { id: Date.now(), ...formData }])
    }
    setShowModal(false)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== id))
    }
  }

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
    const matchesRole = roleFilter === "All" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "Admin": return "destructive"
      case "Editor": return "secondary"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <PageCardHeader
          title="Manajemen Pengguna"
          description="Kelola daftar pengguna, perbarui role, dan atur status akses."
          actionLabel="Tambah User"
          onAction={() => handleOpenModal()}
        />

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="w-full sm:w-48">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Role</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-center font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />
                          <span className={`text-xs font-medium ${user.status === "Active" ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`}>
                            {user.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionDropdown
                          onEdit={() => handleOpenModal(user)}
                          onDelete={() => handleDeleteUser(user.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      Tidak ada data pengguna yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSaveUser}>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}</DialogTitle>
              <DialogDescription>Isi rincian informasi pengguna di bawah ini.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                    <SelectTrigger><SelectValue placeholder="Pilih Role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                    <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
              <Button type="submit">{editingUser ? "Simpan Perubahan" : "Tambah"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}