// lib/api.ts
export async function getProducts() {
  const res = await fetch("https://freeapi.hashnode.space/products");
  const data = await res.json();
  return data.products;
}

export async function getProductById(id: string) {
  const res = await fetch(`https://freeapi.hashnode.space/products/${id}`);
  const data = await res.json();
  return data;
}
