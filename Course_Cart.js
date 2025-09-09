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
    else if (code) alert("Invalid voucher. Try MASTER10 or MASTER20");

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
    // Create a new cart item
    const newItem = document.createElement("div");
    newItem.className = "card mb-3 cart-item";
    newItem.dataset.price = "33.99"; // default price, you can change

    newItem.innerHTML = `
      <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <img src="images/Frame 1 .png" class="course-img me-3" alt="Course">
          <div>
            <h6 class="item-title mb-1">New Course Item</h6>
            <p class="item-price mb-0">$33.99</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <input type="checkbox" class="form-check-input custom-radio mb-2 item-check" checked>
          <button class="btn btn-outline-danger btn-sm remove-btn">Remove</button>
        </div>
      </div>
    `;

    // Insert into cart (before summary column)
    const cartList = document.querySelector(".col-lg-8");
    cartList.appendChild(newItem);

    // Re-wire events for checkbox + remove button
    wireItem(newItem);

    // Recalculate totals
    recalc();
  });
}
