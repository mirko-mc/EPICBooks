document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);
  fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
    .then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log("DOMCONTENTLOADED => data\n", data);
        const header = document.querySelector("header");
        const body = document.querySelector("body");
        const script = document.querySelector("script");
        body.innerHTML = "";
        body.append(header);
        body.innerHTML += `
        <main id="details" class="container">
          <div class="row">
            <div class="col-6 offset-3 p-1">
              <div class="card">
                <img src="${data.img}" class="card-img-top img-fluid" alt="${data.title}">
                  <div class="card-body">
                    <h5 class="card-title text-truncate">${data.title}</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sed fugit commodi, vitae
                        repudiandae natus! Cupiditate corrupti laborum, beatae earum ab neque dolorem, accusantium
                        eius laudantium, eos dolores odio atque.</p>
                    <p class="card-text">Price: ${data.price.toFixed(2)} €</p>
                  </div>
              </div>
            </div>
          </div>
        </main>
        `;
    body.append(script);
      });
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DEI DATI DAL SERVER\n", err);
    });
});