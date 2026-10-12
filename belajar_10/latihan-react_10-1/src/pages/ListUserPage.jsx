import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import { userService } from '../services/userService';
import { UserModal } from '../components/pages/UserModal';

export default function ListUserPage() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "User", is_active: 1 })

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat data pengguna.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getAllUsers();

        if (isMounted) {
          setUsers(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Gagal memuat data pengguna.');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: user.password, role: user.role, is_active: user.is_active });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", role: "User", is_active: 1 });
    }
    setShowModal(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          is_active: formData.is_active
        });
      } else {
        await userService.createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      fetchUsers();
    } catch (err) {
      console.error("Gagal menyimpan pengguna:", err);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Gagal menghapus pengguna:", err);
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Editor": return "secondary";
      default: return "outline";
    }
  };

  if (loading && users.length === 0) return <p className="p-6">Memuat data...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

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
                          <span className={`h-2 w-2 rounded-full ${user.is_active === 1 ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />
                          <span className={`text-xs font-medium ${user.is_active === 1 ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`}>
                            {user.is_active === 1 ? "Active" : "In Active"}
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

      <UserModal
        open={showModal}
        onOpenChange={setShowModal}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveUser}
      />
    </div>
  )
}