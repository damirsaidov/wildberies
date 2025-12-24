import { Input } from "antd"
import useMessage from "antd/es/message/useMessage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [messageApi, context] = useMessage()
    async function login() {
  try {
    const res = await fetch("https://store-api.softclub.tj/Account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: name, password: pass }),
    });
    if (!res.ok) {
      throw new Error("Invalid password or username!");
    }
    const data = await res.json();
    localStorage.setItem("token", data.data);
    localStorage.setItem("name", name);
    messageApi.success("Logged in successfully");
    setTimeout(() => navigate("/"), 2000);
  } catch (error) {
    console.error(error);
    messageApi.error("Invalid Password or User Name!");
  }
}
    const handleLogin = async(e:any) => {
      e.preventDefault()
      login()
    }
  return (
    <div>
        {context}
      <div className="mediaa flex flex-col w-150 self-center m-auto rounded-3xl mt-10 shadow-2xl border-gray-400 p-4 ">
        <form onSubmit={handleLogin}>
        <Input value={name} onChange={(e) => setName(e.target.value)} style={{padding:"10px", margin:"10px", width:"99%"}} className="w-full" placeholder="User Name"/>
        <Input value={pass} onChange={(e) => setPass(e.target.value)} style={{padding:"10px", margin:"10px", width:"99%"}} className="w-full" type={"password"} placeholder="Password"/>
          <button type="submit" className="w-full card-btn text-center">Log in</button>
          <h1 className="p-2">Dont have an account? <span style={{color:"orange", borderBottom:"1px solid orange"}} onClick={() => navigate("/register")}>Register</span></h1>
        </form>
      </div>
    </div>
  )
}
export default Login
