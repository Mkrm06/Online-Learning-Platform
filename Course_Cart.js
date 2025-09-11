// ===== Helpers =====
const fmt = (n) => `$${n.toFixed(2)}`;

// ===== Elements =====
const selectAll    = document.getElementById("selectAll");
const itemsTotalEl = document.querySelector(".summary-details .summary-item:nth-child(1) span:last-child");
const itemsDiscountEl = document.querySelector(".summary-details .summary-item:nth-child(2) span:last-child");
const subTotalEl   = document.querySelector(".summary-details .summary-item:nth-child(4) span:last-child");
const grandTotalEl = document.querySelector(".summary-details .summary-item.total span:last-child");

const emptyCartBtn = document.querySelector(".btn-empty");
const checkoutBtn  = document.querySelector(".btn-checkout");
const voucherInput = document.querySelector(".voucher-input");
const applyVoucher = document.querySelector(".btn-apply");

let discount = 0;

// ===== Calculation Function =====
function sumSelected() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const checkbox = item.querySelector('.item-check');
    const price = parseFloat(item.dataset.price || "0");
    if (checkbox && checkbox.checked) total += price;
  });
  return total;
}

function recalc() {
  const total = sumSelected();
  const appliedDiscount = Math.min(discount, total);

  if (itemsTotalEl)    itemsTotalEl.textContent    = fmt(total);
  if (itemsDiscountEl) itemsDiscountEl.textContent = fmt(appliedDiscount);
  if (subTotalEl)      subTotalEl.textContent      = fmt(total);
  if (grandTotalEl)    grandTotalEl.textContent    = fmt(total - appliedDiscount);
}

// ===== Wiring each cart item =====
function wireItem(item) {
  const check = item.querySelector(".item-check");
  const removeBtn = item.querySelector(".remove-btn");

  if (check) check.addEventListener("change", recalc);
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      item.remove();
      recalc();
    });
  }
}
document.querySelectorAll(".cart-item").forEach(wireItem);

// ===== Select All =====
if (selectAll) {
  selectAll.addEventListener("change", () => {
    const checked = selectAll.checked;
    document.querySelectorAll(".cart-item .item-check").forEach(cb => {
      cb.checked = checked;
    });
    recalc();
  });
}

// ===== Empty Cart =====
if (emptyCartBtn) {
  emptyCartBtn.addEventListener("click", () => {
    document.querySelectorAll(".cart-item").forEach(el => el.remove());
    recalc();
  });
}

// ===== Voucher Codes =====
if (applyVoucher) {
  applyVoucher.addEventListener("click", () => {
    const code = (voucherInput.value || "").trim().toUpperCase();
    const total = sumSelected();
    discount = 0;

    if (code === "MASTER10") discount = total * 0.10;
    else if (code === "MASTER20") discount = total * 0.20;
    else if (code) alert("Invalid voucher. Try a Valid voucher");

    recalc();
  });
}

// ===== Checkout Button =====
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (document.querySelectorAll(".cart-item").length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
    modal.show();
  });
}

// ===== Payment Form =====
const paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Payment successful! 🎉 (Demo)");
    const modal = bootstrap.Modal.getInstance(document.getElementById("paymentModal"));
    modal.hide();
  });
}

// ===== Initial Calculation =====
recalc();

// ===== Add Course Button =====
const addCourseBtn = document.querySelector(".btn-add-course");
if (addCourseBtn) {
  addCourseBtn.addEventListener("click", () => {
    const cartList = document.getElementById("cartList");

    // Find the first cart item (our template)
    const template = document.querySelector(".cart-item");

    if (template) {
      // Clone it deeply (with children)
      const newItem = template.cloneNode(true);

      // Update item title/price if needed
      newItem.querySelector(".item-title").textContent = "Motion Graphics: Create a Nice Typography Animation";
      newItem.querySelector(".item-price").textContent = "$33.99";
      newItem.dataset.price = "33.99";

      // Reset checkbox
      const check = newItem.querySelector(".item-check");
      if (check) check.checked = true;

      // Append to cart
      cartList.appendChild(newItem);

      // Re-wire events for new checkbox + remove button
      wireItem(newItem);

      // Recalculate totals
      recalc();
    }
  });
}
