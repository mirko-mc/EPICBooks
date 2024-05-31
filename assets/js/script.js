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
            <a href="#" class="btn btn-primary" onclick="addToCart(this)" id="${i}">Aggiungi al carrello</a>
            <a href="#" class="btn btn-primary">Salta prodotto</a>
            </div>
            </div>
                  </div>
                  </div>
                  `;
}

//     1. Aggiungi il libro alla lista del carrello
// - Quando il pulsante AGGIUNGI AL CARRELLO viene cliccato...
//     2. Cambia lo stile della card per mostrare che è già stata aggiunta (un bordo colorato o un badge vanno bene)
// EXTRA FACOLTATIVI
// - Dai la possibilità all'utente di cancellare libri dal loro carrello
// - Conta gli elementi nel carrello e mostra il risultato nella sezione carrello
// - Crea un pulsante per svuotare il carrello
function addToCart(book) {
  console.log(book.id);
  const aside = document.querySelector("aside");
  getData().then((books) => {
    aside.innerHTML += `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-12">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${
                      books[book.id].title
                    }</h5>
                    <p class="card-text">${books[book.id].price}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    console.log(books[book.id].title);
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
