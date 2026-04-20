import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function normalizeCartItem(item) {
  return {
    ...item,
    quantity: Math.max(1, Number(item?.quantity) || 1),
  };
}

function getCartSignature(item) {
  return JSON.stringify([
    item?.id || "",
    item?.name || "",
    item?.type || "",
    item?.price || "",
    item?.img || "",
  ]);
}

function groupCart(cart) {
  const map = new Map();

  for (const rawItem of cart) {
    const item = normalizeCartItem(rawItem);
    const signature = getCartSignature(item);

    if (map.has(signature)) {
      map.get(signature).quantity += item.quantity;
      continue;
    }

    map.set(signature, {
      ...item,
      signature,
    });
  }

  return Array.from(map.values());
}

function formatPrice(value) {
  const numericValue = Number(value) || 0;
  return Number.isInteger(numericValue) ? String(numericValue) : numericValue.toFixed(2);
}

export default function Cart() {
  const navigate = useNavigate();
  const toastTimeout = useRef(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");

  const grouped = groupCart(cart);
  const total = grouped.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
    }

    toastTimeout.current = setTimeout(() => {
      setToast("");
    }, 1800);

    return () => {
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current);
      }
    };
  }, [toast]);

  useEffect(() => {
    function handleStorage() {
      try {
        setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      } catch {
        setCart([]);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function showToast(message) {
    setToast(message);
  }

  function updateGroupedItem(signature, updater) {
    setCart((prevCart) => {
      const matchingItems = prevCart
        .filter((item) => getCartSignature(normalizeCartItem(item)) === signature)
        .map(normalizeCartItem);

      if (!matchingItems.length) {
        return prevCart;
      }

      const mergedItem = matchingItems.reduce(
        (accumulator, item) => ({
          ...item,
          quantity: accumulator.quantity + item.quantity,
        }),
        { ...matchingItems[0], quantity: 0 }
      );

      const updatedItem = updater(mergedItem);
      const restItems = prevCart.filter(
        (item) => getCartSignature(normalizeCartItem(item)) !== signature
      );

      return updatedItem ? [...restItems, updatedItem] : restItems;
    });
  }

  function clearCart() {
    setCart([]);
    showToast("Cart cleared");
  }

  function removeFromCart(signature) {
    updateGroupedItem(signature, () => null);
    showToast("Item removed");
  }

  function changeQuantity(signature, delta) {
    updateGroupedItem(signature, (item) => {
      const nextQuantity = item.quantity + delta;
      return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
    });
  }

  function checkout() {
    if (!grouped.length) {
      return;
    }

    if (localStorage.getItem("account_logged_in") !== "true") {
      showToast("Sign in to continue");
      navigate("/account");
      return;
    }

    setCart([]);
    showToast("Order placed");
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">YOUR CART</h1>
          <div className="cart-subtitle">Your selected items</div>
          {grouped.length > 0 && (
            <div className="cart-btn-row">
              <button className="cart-btn cart-btn-main" onClick={clearCart} aria-label="Clear cart">
                Clear Cart
              </button>
              <button className="cart-btn cart-btn-outline" onClick={checkout} aria-label="Checkout">
                Checkout
              </button>
            </div>
          )}
        </div>

        {grouped.length === 0 ? (
          <div className="cart-empty">
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="cart-empty-svg">
              <rect width="64" height="64" rx="32" fill="#e0e7ef" />
              <path
                d="M20 24h24l-2.5 18.5a2 2 0 0 1-2 1.5H24.5a2 2 0 0 1-2-1.5L20 24Zm0 0V20a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4"
                stroke="#111"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="48" r="2" fill="#111" />
              <circle cx="36" cy="48" r="2" fill="#111" />
            </svg>
            <div className="cart-empty-title">Cart is empty</div>
            <div className="cart-empty-desc">Add some products to see them here.</div>
            <button className="cart-btn cart-btn-main" onClick={() => navigate("/supplement")}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="cart-list">
            {grouped.map((item) => (
              <div key={item.signature} className="cart-item">
                {item.img && <img src={item.img} alt={item.name} className="cart-item-img" />}

                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-type">{item.type || "Product"}</div>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-item-qty-row">
                    <button
                      className="cart-qty-btn"
                      onClick={() => changeQuantity(item.signature, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      –
                    </button>
                    {formatPrice(item.price)}₴
                    <button
                      className="cart-qty-btn"
                      onClick={() => changeQuantity(item.signature, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <span className="cart-item-qty">x{item.quantity}</span>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.signature)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total-row">
              <div className="cart-total">Total: {formatPrice(total)}₴</div>
            </div>
          </div>
        )}

        {toast && <div className="cart-toast">{toast}</div>}
      </div>
    </div>
  );
}