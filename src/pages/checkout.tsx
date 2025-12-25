import { useState } from "react";
export default function Checkout() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [adress, setAdress] = useState("")
    interface Order {
        name: string;
        phone: string;
        address: string;
        items: string;
        total: string;
    }
    const [loading, setLoading] = useState<boolean>(false);
    const submitOrder = async (e:any): Promise<void> => {
        e.preventDefault()
        setLoading(true);
        const order: Order = {
            name: name,
            phone: phone,
            address: adress,
            items: "Shoes x1, Hoodie x2",
            total: "$120",
        };
        try {
            const response = await fetch("http://localhost:3001/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
            const data: { success: boolean } = await response.json();
            if (data.success) {
                alert("Order sent to Telegram");
            } else {
                alert("Order failed");
            }
        } catch {
            alert("Backend not reachable");
        }
        setLoading(false);
    };
    return (
        <form className="flex flex-col mt-5 gap-4 w-100 justify-center m-auto" onSubmit={submitOrder}>
            <input className="p-4 rounded-2xl shadow-2xl border border-gray-400" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="p-4 rounded-2xl shadow-2xl border border-gray-400" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input className="p-4 rounded-2xl shadow-2xl border border-gray-400" placeholder="Address" value={adress} onChange={(e) => setAdress(e.target.value)}/>
            <button className="wb-btn" type="submit" onClick={submitOrder} disabled={loading}>
                {loading ? "Sending..." : "Checkout"}
            </button>
        </form>

    );
}