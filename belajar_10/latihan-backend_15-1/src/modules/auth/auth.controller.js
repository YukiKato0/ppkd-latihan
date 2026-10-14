import AuthService from "./auth.service.js"

export const Login = async (req, res) => {
  try {
    return res.status(200).json(await AuthService.authLogin(req.body))
  } catch (error) {
    return res.status(401).json({ status: false, message: error.message })
  }
}