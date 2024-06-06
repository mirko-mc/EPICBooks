let books = null;
let count = 0;

document.addEventListener("DOMContentLoaded", () => {
  getData().then((books) => {
    books.forEach((book) => {
      createCards(book.id, book.image, book.title, book.price);
    });
  });
});

function createCards(id, image, title, price) {
  const main = document.querySelector("main");
  main.innerHTML += `
  <div class="col-3 p-1">
    <div class="card">
      <img src="${image}" class="card-img-top img-fluid" alt="${title}">
      <div class="card-body">
        <h5 class="card-title text-truncate">${title}</h5>
        <p class="card-text">Price: ${price} €</p>
        <div class="d-flex justify-content-around">
          <button class="btn btn-secondary" onclick="addToCart(this)" id="${id}"><span class="material-symbols-outlined">
add_shopping_cart
</span></button>
          <button class="btn btn-secondary" onclick="jump(this)"><span class="material-symbols-outlined">
visibility_off
</span></button>
          <a href=./details.html?id=${id} target="_blank" class="btn btn-secondary"><span class="material-symbols-outlined">
info
</span></a>
        </div>
      </div>
    </div>
  </div>
  `;
}

function jump(card) {
  card.parentNode.parentNode.parentNode.parentNode.classList.toggle("d-none");
}

function addToCart(cart) {
  const main = document.querySelector("main");
  cart.classList.toggle("disabled");
  const ASIN = cart.id;
  const SUPERCONTAINER = document.querySelector("#superContainer .row");
  if (!document.getElementById("cart")) {
    main.classList.toggle("col-12");
    main.classList.toggle("col-10");
    SUPERCONTAINER.innerHTML += `
    <aside id="cart" class="col-2 gx-3 gy-4">
      <div class="col-12 d-flex flex-column align-items-center sticky-top">
      <h3>CARRELLO</h3>
      <span>LIBRI AGGIUNTI : </span>
      <button class="btn btn-secondary mb-2" onclick="clearCart()">Svuota carrello</button>
      </div>
    </aside>`;
  }
  const LIBRIAGGIUNTI = document.querySelector("aside span");
  const ASIDE = document.querySelector("aside .col-12");
  LIBRIAGGIUNTI.textContent = `LIBRI AGGIUNTI : ${++count}`;

  getData().then((BOOKS) => {
    for (const BOOK of BOOKS) {
      if (BOOK.id === ASIN) {
        ASIDE.innerHTML += `
          <div id="${ASIN}" class="card mb-1 w-100">
            <div class="card-body d-flex flex-wrap justify-content-between p-2">
              <h6 class="title text-truncate w-100">${BOOK.title}</h6>
              <span class="card-text">${BOOK.price}</span>
              <a href="#" class="btn btn-secondary" onclick="deleteBook(this,'${ASIN}')"><span class="material-symbols-outlined">
delete
</span></a>
              </div>
              </div>
              `;
      }
    }
  });
}

async function getData() {
  if (books !== null) {
    console.log("NON HO FATTO LA FETCH\n");
    return books;
  }
  try {
    const res = await fetch("https://striveschool-api.herokuapp.com/books");
    const data = await res.json();
    books = data.map((item) => ({
      id: item.asin,
      title: item.title,
      price: item.price.toFixed(2),
      image: item.img,
    }));
    return books;
  } catch (err) {
    console.log("ERRORE NEL RECUPERO DEI DATI DAL SERVER\n", err);
    return [];
  }
}

function searchBook() {
  const main = document.querySelector("main");
  const INPUT = document.getElementById("searchBook").value.toLowerCase();
  main.innerHTML = "";
  /* QUESTA E' L'ISTRUZIONE SU CUI BASARSI PER CERCARE DA UNA N LETTERA IN POI ANZICHE' DALLA PRIMA
  Array.from(INPUT).length;
  */
  getData().then((books) => {
    books.forEach((book) => {
      book.title.toLowerCase().includes(INPUT)
        ? createCards(book.id, book.image, book.title, book.price)
        : "";
    });
  });
}

function clearCart() {
  const main = document.querySelector("main");
  document.getElementById("cart").remove();
  main.classList.toggle("col-12");
  main.classList.toggle("col-10");
  const BUTTONS = document.querySelectorAll("main .card .disabled");
  for (const BUTTON of BUTTONS) {
    BUTTON.classList.toggle("disabled");
  }
  count = 0;
}

function deleteBook(trash, asin) {
  document.getElementById(asin).classList.toggle("disabled");
  trash.parentNode.parentNode.remove();
  const LIBRIRIMOSSI = document.querySelector("aside span");
  LIBRIRIMOSSI.textContent = `LIBRI AGGIUNTI : ${--count}`;
  if (count === 0) {
    const main = document.querySelector("main");
    document.getElementById("cart").remove();
    main.classList.toggle("col-12");
    main.classList.toggle("col-10");
  }
}
