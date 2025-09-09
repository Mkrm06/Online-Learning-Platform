// ===== Helpers =====
const fmt = (n) => `$${n.toFixed(2)}`;

function sumSelected() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const checkbox = item.querySelector('.item-check');
    const price = parseFloat(item.dataset.price || '0');
    if (checkbox && checkbox.checked) total += price;
  });
  return total;
}

// ===== Elements =====
const selectAll = document.getElementById('selectAll');
const itemsTotalEl   = document.getElementById('itemsTotal');
const itemsDiscountEl= document.getElementById('itemsDiscount');
const subTotalEl     = document.getElementById('subTotal');
const grandTotalEl   = document.getElementById('grandTotal');
const emptyCartBtn   = document.getElementById('emptyCart');
const checkoutBtn    = document.getElementById('checkoutBtn');
const voucherInput   = document.getElementById('voucherInput');
const applyVoucher   = document.getElementById('applyVoucher');

let discount = 0;

// ===== Calculations =====
function recalc() {
  const total = sumSelected();
  const appliedDiscount = Math.min(discount, total); // guard
  itemsTotalEl.textContent    = fmt(total);
  itemsDiscountEl.textContent = fmt(appliedDiscount);
  subTotalEl.textContent      = fmt(total);
  grandTotalEl.textContent    = fmt(total - appliedDiscount);

  // Update selectAll state
  const checks = [...document.querySelectorAll('.item-check')];
  selectAll.checked = checks.length > 0 && checks.every(ch => ch.checked);
}

// ===== Wiring items =====
function wireItem(item) {
  const check = item.querySelector('.item-check');
  const removeBtn = item.querySelector('.remove-btn');

  if (check) check.addEventListener('change', recalc);

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      item.remove();
      recalc();
    });
  }
}

document.querySelectorAll('.cart-item').forEach(wireItem);

// Select All toggle
if (selectAll) {
  selectAll.addEventListener('change', () => {
    document.querySelectorAll('.item-check').forEach(ch => ch.checked = selectAll.checked);
    recalc();
  });
}

// Empty cart
if (emptyCartBtn) {
  emptyCartBtn.addEventListener('click', () => {
    document.querySelectorAll('.cart-item').forEach(el => el.remove());
    recalc();
  });
}

// Voucher (simple demo: MASTER10 = 10% off selected total)
if (applyVoucher) {
  applyVoucher.addEventListener('click', () => {
    const code = (voucherInput.value || '').trim().toUpperCase();
    const total = sumSelected();
    discount = 0;

    if (code === 'MASTER10') {
      discount = total * 0.10;
    } else if (code === 'MASTER20') {
      discount = total * 0.20;
    } else if (code) {
      // show a tiny feedback using Bootstrap toast-like alert
      alert('Invalid voucher. Try MASTER10 or MASTER20');
    }
    recalc();
  });
}

// Checkout -> open modal (Bootstrap)
const paymentModalEl = document.getElementById('paymentModal');
const paymentModal = paymentModalEl ? new bootstrap.Modal(paymentModalEl) : null;

if (checkoutBtn && paymentModal) {
  checkoutBtn.addEventListener('click', () => {
    if (document.querySelectorAll('.cart-item').length === 0) {
      alert('Your cart is empty.');
      return;
    }
    paymentModal.show();
  });
}

// Prevent form submit for demo
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed! (demo)');
    paymentModal.hide();
  });
}

// Initial calculation
recalc();

