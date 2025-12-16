import { useEffect, useState } from "react";
import { getMedicines, addMedicine } from "./api";
import "./app.css";

function daysUntil(dateStr) {
  const now = new Date();
  const expiry = new Date(dateStr);
  return Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
}

function rowClass(med) {
  if (daysUntil(med.expiryDate) < 30) return "red";
  if (med.quantity < 10) return "yellow";
  return "";
}

export default function App() {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({ fullName: "", notes: "", expiryDate: "", quantity: 0, price: 0, brand: "" });
  const [search, setSearch] = useState("");

  const load = async () => setMeds(await getMedicines(search));
  useEffect(() => { load(); }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(form);
      setForm({ fullName: "", notes: "", expiryDate: "", quantity: 0, price: 0, brand: "" });
      load();
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Failed to add medicine. Check console for details.");
    }
  };

  return (
    <div>
      <h1>ABC Pharmacy</h1>
      <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr><th>Name</th><th>Expiry</th><th>Quantity</th><th>Price</th><th>Brand</th></tr>
        </thead>
        <tbody>
          {meds.map(m => (
            <tr key={m.id} className={rowClass(m)}>
              <td>{m.fullName}</td>
              <td>{new Date(m.expiryDate).toLocaleDateString()}</td>
              <td>{m.quantity}</td>
              <td>{Number(m.price).toFixed(2)}</td>
              <td>{m.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Medicine</h2>
      <form onSubmit={submit}>
        <input placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
        <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
