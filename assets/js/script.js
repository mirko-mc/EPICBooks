let books = null;
let main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", () => {
  getData().then((books) => {
    //   console.log("DOMLOADED => books\n", books);
    books.forEach((book) => {
      // console.log("DOMLOADED => book\n", book);
      createCards(book.id, book.image, book.title, book.price);
    });
  });
});

function createCards(id, image, title, price) {
  main.innerHTML += `
  <div class="col-3">
    <div class="card">
      <img src="${image}" class="card-img-top" alt="${title}">
      <div class="card-body">
        <h5 class="card-title text-truncate">${title}</h5>
        <p class="card-text">${price} €</p>
      <div class="d-flex justify-content-around">
        <button class="btn btn-primary" onclick="addToCart(this)" id="asin${id}">Aggiungi al carrello</button>
        <button class="btn btn-primary">Salta prodotto</button>
      </div>
    </div>
  </div>
  `;
}
let count = 0;
function addToCart(cart) {
  const TRASH = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>`;
  const ASIN = cart.id.slice(4);
  // console.log("ID\n", ASIN);
  console.log("ID\n", cart);
  const SUPERCONTAINER = document.querySelector("#superContainer .row");
  if (!document.getElementById("cart")) {
    SUPERCONTAINER.innerHTML += `
    <aside id="cart" class="col-2 gx-3 gy-4">
      <div class="col-12">
      <h3>CARRELLO</h3>
      <span>LIBRI AGGIUNTI : </span>
      <button class="btn btn-primary" onclick="clearCart()">Svuota carrello</button>
      </div>
    </aside>`;
  }

  const ADDED = document.querySelector(`aside .${cart.id}`);
  const LIBRIAGGIUNTI = document.querySelector("aside span");
  const ASIDE = document.querySelector("aside .col-12");
  LIBRIAGGIUNTI.textContent = `LIBRI AGGIUNTI : ${count++}`;
  // console.log(!ADDED);
  getData().then((BOOKS) => {
    // console.log("ORA SONO QUI");
    if (!ADDED) {
      for (const BOOK of BOOKS) {
        if (BOOK.id === ASIN) {
          ASIDE.innerHTML += `
          <div class="card mb-3">
            <div class="card-body d-flex flex-wrap justify-content-between">
              <h6 class="title text-truncate w-100">${BOOK.title}</h6>
              <span class="card-text">${BOOK.price}</span>
              <a href="#" class="btn btn-primary" onclick=deleteBook(this,${ASIN})>${TRASH}</a
            </div>
          </div>
          `;
          cart.classList.toggle("disabled");
          // console.log(cart.classList);
        }
      }
    } else alert("Libro già presente nel carrello.");
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
      price: item.price,
      image: item.img,
    }));
    return books;
  } catch (err) {
    console.log("ERRORE NEL RECUPERO DEI DATI DAL SERVER\n", err);
    return [];
  }
}
// SUGGERIMENTO: usa .filter()
function searchBook() {
  const INPUT = document.getElementById("searchBook").value.toLowerCase();
  main.innerHTML = "";
  console.clear();
  /* QUESTO E' IL CODICE PER CERCARE DA UNA DATA LETTERA IN POI ANZICHE' DALLA PRIMA
  console.log(Array.from(INPUT).length);
  */
  getData().then((books) => {
    books.forEach((book, i) => {
      book.title.toLowerCase().includes(INPUT)
        ? createCards(book.image, book.title, book.price, i)
        : "";
    });
  });
}

function clearCart() {
  document.getElementById("cart").remove();
  const BUTTONS = document.querySelectorAll("main .card .disabled");
  for (const BUTTON of BUTTONS) {
    BUTTON.classList.toggle("disabled");
  }
}

function deleteBook(trash,asin) {
  console.log(asin);
  console.log(document.getElementById(`asin${asin}`).classList);
  document.getElementById(`asin${asin}`).classList.toggle("disabled");
  trash.parentNode.parentNode.remove();
}