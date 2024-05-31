document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  console.log(getData());
  getData().then((books) => {
    console.log("DOMLOADED => books\n", books);
    books.map((book) => {
      console.log("DOMLOADED => book\n", book);
      main.innerHTML += `
      <div class="col-3">
                    <div class="card">
                        <img src="${book.img}"
                            class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title text-truncate">${book.title}</h5>
                            <p class="card-text">${book.price} €</p>
                            <div class="d-flex justify-content-around">
                                <a href="#" class="btn btn-primary">Aggiungi al carrello</a>
                                <a href="#" class="btn btn-primary">Salta prodotto</a>
                            </div>
                        </div>
                    </div>
                </div>
      `;
    });
  });
});

async function getData() {
  try {
    const res = await fetch("https://striveschool-api.herokuapp.com/books");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERRORE NEL RECUPERO DEI DATI DAL SERVER\n", err);
  }
}