import { Input } from "antd"
import useMessage from "antd/es/message/useMessage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [messageApi, context] = useMessage()
  async function login() {
    try {
      const res = await fetch("https://store-api.softclub.tj/Account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, phoneNumber: phoneNumber, email: email, password: password, confirmPassword: password }),
      });
      localStorage.setItem("name", name)
      if (!res.ok) {
        throw new Error("Неправильный пароль или имя!");
      }
      const data = await res.json();
      localStorage.setItem("token", data.data);
      messageApi.success("Зарегистрирован успешно!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      messageApi.error("Чтото пошло не так.");
    }
  }
  const handleLogin = async (e: any) => {
    e.preventDefault()
    login()
  }
  return (
    <div>
      {context}
      <div className="lgin mediaa flex flex-col w-150 self-center m-auto rounded-3xl mt-10 shadow-2xl border-gray-400 p-4 ">
        <h1 className="text-center text-2xl p-2">Регистрация</h1>
        <form onSubmit={handleLogin}>
          <Input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Имя" />
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Номер телефона" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Почта" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Пароль" />
          <button type="submit" className="w-full card-btn text-center">Регистрация</button>
          <h1 className="p-2">Уже есть аккаунт? <span style={{ color: "orange", borderBottom: "1px solid orange" }} className="cursor-pointer" onClick={() => navigate("/login")}>Войти</span></h1>
        </form>
      </div>
    </div>
  )
}
export default Register