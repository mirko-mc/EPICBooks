let books = null;
let main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", () => {
  getData().then((books) => {
    //   console.log("DOMLOADED => books\n", books);
    books.forEach((book, i) => {
      // console.log("DOMLOADED => book\n", book);
      createCards(book.image, book.title, book.price, i);
    });
  });
});

function createCards(image, title, price, i) {
  main.innerHTML += `
  <div class="col-3">
    <div class="card">
      <img src="${image}" class="card-img-top" alt="${title}">
      <div class="card-body">
        <h5 class="card-title text-truncate">${title}</h5>
        <p class="card-text">${price} €</p>
      <div class="d-flex justify-content-around">
        <button class="btn btn-primary" onclick="addToCart(this)" id="${i}">Aggiungi al carrello</button>
        <button class="btn btn-primary">Salta prodotto</button>
      </div>
    </div>
  </div>
  `;
}

// - Dai la possibilità all'utente di cancellare libri dal loro carrello
// - Crea un pulsante per svuotare il carrello
function addToCart(cart) {
  // const cart2 = document.getElementById(cart.id);
  // console.log(cart2);
  // console.log(cart.id);
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
  const title = document.querySelectorAll("aside .title");
  const LIBRIAGGIUNTI = document.querySelector("aside span");
  const ASIDE = document.querySelector("aside");
  LIBRIAGGIUNTI.textContent = `LIBRI AGGIUNTI : ${title.length}`;
  // console.log(title.length);
  getData().then((book, i) => {
    for (const item of title) {
      if (item.textContent.includes(book[cart.id].title))
        return alert("Libro già presente nel carrello.");
    }
    // console.log("ORA SONO QUI");
    ASIDE.innerHTML += `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="title text-truncate">${book[cart.id].title}</h5>
        <p class="card-text">${book[cart.id].price}</p>
      </div>
    </div>
  
    `;
    cart.classList.toggle("disabled");
    console.log(cart.classList);
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
  console.log(Array.from(INPUT).length);
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
}
