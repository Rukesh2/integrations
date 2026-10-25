// Analytics test harness: logs UI activity locally. No analytics scripts or network calls yet.
function logDemoEvent(eventName, details = {}) {
  console.log("[Demo event]", eventName, details);
}

document.addEventListener("DOMContentLoaded", () => {
  // Track link/button clicks by data-track. This only writes to the browser console.
  document.querySelectorAll("[data-track]").forEach((element) => {
    const eventName = element.dataset.track;
    element.addEventListener("click", () => {
      logDemoEvent("demo_click", {
        element: eventName,
        page: location.pathname
      });
    });

    // Hover is deliberately logged on pointerenter, once per entry.
    element.addEventListener("pointerenter", () => {
      logDemoEvent("demo_hover", {
        element: eventName,
        page: location.pathname
      });
    });
  });

  const learnButton = document.querySelector("#learn-button");
  const learnMessage = document.querySelector("#learn-message");
  if (learnButton && learnMessage) {
    learnButton.addEventListener("click", () => {
      learnMessage.hidden = !learnMessage.hidden;
      logDemoEvent("demo_learn_toggle", { visible: !learnMessage.hidden });
    });
  }

  const addToCart = document.querySelector("#add-to-cart");
  const cartMessage = document.querySelector("#cart-message");
  if (addToCart && cartMessage) {
    addToCart.addEventListener("click", () => {
      const quantity = Number(document.querySelector("#quantity")?.value || 1);
      const color = document.querySelector("#color")?.value || "midnight";
      cartMessage.textContent = `Added ${quantity} demo item(s) in ${color} to the cart (not saved).`;
      cartMessage.hidden = false;
      logDemoEvent("demo_add_to_cart", { quantity, color });
    });
  }

  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutMessage = document.querySelector("#checkout-message");
  if (checkoutForm && checkoutMessage) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const method = document.querySelector("#payment-method").value;
      // Intentionally do not log names, email addresses, or reference-field contents.
      logDemoEvent("demo_checkout_submit", { payment_method: method });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "demo_checkout_submit",
        payment_method: method
      });
      checkoutMessage.textContent = "Demo form submitted successfully. No payment was processed.";
      checkoutMessage.hidden = false;
    });
  }

  // Log form field interactions without collecting typed values.
  document.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("change", () => {
      logDemoEvent("demo_field_change", {
        field: field.name || field.id,
        page: location.pathname
      });
    });
  });
});
