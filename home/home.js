const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

const submitBtns = document.querySelectorAll(".product button");

let cart = [];

function updateTotal(){
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalPriceEl.textContent = total;
}

submitBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const name = product.querySelector("h4").textContent;
    const price = parseInt(product.querySelector("p").textContent.replace("$",""));

    // Agar modal ochiq bo'lmasa, ochish
    modal.style.display = "flex";

    // Tekshirish: cartda bormi?
    let existing = cart.find(item => item.name === name);
    if(existing){
      existing.qty += 1;
      const qtySpan = cartItems.querySelector(`[data-name="${name}"] .qty`);
      qtySpan.textContent = existing.qty;
    } else {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.dataset.name = name;

      cartItem.innerHTML = `
        <span>${name} - $${price}</span>
        <div class="qty-buttons">
          <button class="minus">-</button>
          <span class="qty">1</span>
          <button class="plus">+</button>
        </div>
      `;

      cartItems.appendChild(cartItem);

      // Objectni cartga qo‘shish
      cart.push({name, price, qty:1});

      // + / - tugmalarini ishlatish
      const minusBtn = cartItem.querySelector(".minus");
      const plusBtn = cartItem.querySelector(".plus");
      const qtySpan = cartItem.querySelector(".qty");

      minusBtn.onclick = () => {
        let item = cart.find(i => i.name === name);
        if(item.qty > 1){
          item.qty -=1;
          qtySpan.textContent = item.qty;
        }
        updateTotal();
      }

      plusBtn.onclick = () => {
        let item = cart.find(i => i.name === name);
        item.qty +=1;
        qtySpan.textContent = item.qty;
        updateTotal();
      }
    }

    updateTotal();
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};
