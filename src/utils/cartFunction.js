export function loadCart() {
  const cart = localStorage.getItem("cart");
  if (cart != null) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function addToCart(bookId) {
  const cart = loadCart();

  const index = cart.findIndex((item) => item.bookId === bookId);
  if (index === -1) {
    cart.push({ bookId });
  }

  saveCart(cart);
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function deleteBook(bookId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.bookId === bookId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}
