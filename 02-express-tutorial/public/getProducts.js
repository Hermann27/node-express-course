document.getElementById("btnProducts").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/v1/query?search=al&limit=5");
    const products = await response.json();

    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML =
      products
        .map((product) => `<p>${product.name} - $${product.price}</p>`)
        .join("") || "<p>No products found.</p>";
  } catch (error) {
    console.error("Error getting products:", error);
  }
});
