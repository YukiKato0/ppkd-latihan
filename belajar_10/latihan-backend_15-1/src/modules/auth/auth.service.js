import AuthModel from './auth.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const AuthService = {
  async authLogin(data) {
    if (!data.email || !data.password) {
      throw new Error('Email atau Password tidak boleh kosong');
    }

    const user = await AuthModel.login(data.email);
    if (!user) {
      throw new Error('Isi email dan password dengan benar');
    }

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new Error('Invalid credential');
    }

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    )
    const userLogin = {
      status: true,
      message: "Login Succes",
      data: {
        user: {
          id: user.id,
          nama: user.name,
          email: user.email,
        },
        token
      }
    }

    return userLogin;
  },
};

export default AuthService;