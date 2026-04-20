const CART_STORAGE_KEY = "cart";
const CART_UPDATED_EVENT = "cart-updated";

export function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getCartItemsCount(cart = readCart()) {
  return cart.reduce((sum, item) => sum + Math.max(1, Number(item?.quantity) || 1), 0);
}

export function writeCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function subscribeToCartUpdates(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_UPDATED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_UPDATED_EVENT, callback);
  };
}
