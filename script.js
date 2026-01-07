document.addEventListener("DOMContentLoaded", () => {

document.querySelectorAll(".quick-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    const image = btn.dataset.image;
    const desc = btn.dataset.desc;

    document.getElementById("quick-img").src = image;
    document.getElementById("quick-name").innerText = name;
    document.getElementById("quick-price").innerText =
      "Rp " + price.toLocaleString("id-ID");
    document.getElementById("quick-desc").innerText = desc;

    document.querySelector("#quick-modal .tombol-beli").dataset.name = name;
    document.querySelector("#quick-modal .tombol-beli").dataset.price = price;
    document.querySelector("#quick-modal .tombol-beli").dataset.image = image;

    document.getElementById("quick-modal").style.display = "flex";
  });
});


  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const badge = document.getElementById("notification-badge");
  const cartItems = document.getElementById("cart-items");
  const cartPopup = document.getElementById("cart-popup");
  const addButtons = document.querySelectorAll(".tombol-add");

  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      const image = btn.dataset.image;

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, image, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
      updateCartBadge();
    });
  });

  function updateCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      cartItems.innerHTML += `
        <li class="cart-item">
          <img src="${item.image}" class="cart-img">
          <div class="cart-info">
            <strong>${item.name}</strong>
            <p>${item.qty} x Rp ${item.price.toLocaleString("id-ID")}</p>
          </div>
          <button class="hapus-btn" data-index="${index}">✕</button>
        </li>
      `;
    });

    document.querySelectorAll(".hapus-btn").forEach(btn => {
      btn.onclick = () => {
        cart.splice(btn.dataset.index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        updateCartBadge();
      };
    });
  }

  function updateCartBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) badge.innerText = totalQty;
  }


  if (document.querySelector(".keranjang")) {
    document.querySelector(".keranjang").onclick = () => {
      cartPopup.style.display = "block";
    };
  }

  window.closeCart = () => {
    cartPopup.style.display = "none";
  };

  updateCart();
  updateCartBadge();

});

function goCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  window.location.href = "Checkout.html";
}

const searchInput = document.querySelector(".search-input");
const boxes = document.querySelectorAll(".box");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  boxes.forEach(box => {
    const title = box.dataset.title.toLowerCase();
    const category = box.dataset.category.toLowerCase();

    if (title.includes(keyword) || category.includes(keyword)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
});

  document.querySelector(".quick-close").onclick = () => {
  document.getElementById("quick-modal").style.display = "none";
};

document.querySelector("#quick-modal .tombol-beli").onclick = function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const name = this.dataset.name;
  const price = Number(this.dataset.price);
  const image = this.dataset.image;

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "Checkout.html";
};

$(document).ready(function() {

    $('.kotak').click(function() {
        $(this).next('.buka').toggle(520); 
        $(this).toggleClass('expanded');
    });

    $('.kotak').hover(
        function() {
            $(this).addClass('question-hover');
        },
        function() {
            $(this).removeClass('question-hover');
        }
         
    );

});

  window.addEventListener("load", () => {
  document.getElementById("page").classList.add("show");
});

