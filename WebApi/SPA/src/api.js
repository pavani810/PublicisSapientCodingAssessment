const API = "/api/medicines";

export async function getMedicines(search = "") {
  const url = search ? `${API}?search=${encodeURIComponent(search)}` : API;
  const res = await fetch(url);
  return res.json();
}

export async function addMedicine(med) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med)
  });
  return res.json();
}
