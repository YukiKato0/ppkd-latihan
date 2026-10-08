const USERS = [
  {
    id: 1,
    nama: "Bayu",
    email: "bayu@gmail.com",
    password: "12345678",
  },
  {
    id: 2,
    nama: "Adi",
    email: "adi@gmail.com",
    password: "12345678",
  },
  {
    id: 3,
    nama: "Mira",
    email: "mira@gmail.com",
    password: "12345678",
  },
]

export const Login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      status: false,
      message: "Email atau Password tidak boleh kosong"
    })
  }

  const user = USERS.find((user) => user.email === email && user.password === password)
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Invalid credential"
    })
  }

  res.json({
    status: true,
    message: "Login Succes",
    data: {
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
      },
      token: `jwt-token-123${user.id}-${Date.now()}`
    }
  })
}