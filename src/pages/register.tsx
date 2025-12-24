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
        throw new Error("Invalid password or username!");
      }
      const data = await res.json();
      localStorage.setItem("token", data.data);
      messageApi.success("Registered successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      messageApi.error("Something went wrong!");
    }
  }
  const handleLogin = async (e: any) => {
    e.preventDefault()
    login()
  }
  return (
    <div>
      {context}
      <div className=" mediaa flex flex-col w-150 self-center m-auto rounded-3xl mt-10 shadow-2xl border-gray-400 p-4 ">
        <form onSubmit={handleLogin}>
          <Input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="User Name" />
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Phone number" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Email" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", margin: "10px", width: "99%" }} className="w-full" placeholder="Password" />
          <button type="submit" className="w-full card-btn text-center">Register</button>
          <h1 className="p-2">Already have an account? <span style={{ color: "orange", borderBottom: "1px solid orange" }} onClick={() => navigate("/login")}>Log in</span></h1>
        </form>
      </div>
    </div>
  )
}
export default Register