// Select modal
const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
const checkoutBtn = document.getElementById('checkoutBtn');

// Show payment modal on checkout click
checkoutBtn.addEventListener('click', () => {
  paymentModal.show();
});

// Select all items checkbox
const selectAll = document.getElementById('selectAll');
const cartItems = document.querySelectorAll('.cart-item input[type="checkbox"]');

selectAll.addEventListener('change', () => {
  cartItems.forEach(item => item.checked = selectAll.checked);
});
