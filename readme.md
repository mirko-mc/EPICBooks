EPICBooks

ESERCIZI:
    - Sei incaricato di creare un marketplace di libri online.
    - Usa tutti nuovi tools e features che hai imparato per creare un'applicazione con i seguenti requisiti:
        - Una homepage che mostri tutti libri con delle card di bootstrap
        - Le card dovrebbero avere un pulsante per aggiungere al carrello e uno per "saltare" un prodotto
        - Una sezione per il carrello
        - Un input di testo per cercare i libri
        
    Per raggiungere questo risultato, segui queste istruzioni:
    - Usa questo API per ottenere la lista di libri:
      https://striveschool-api.herokuapp.com/books
    - Renderizza tutti libri usando template literals e .forEach o .map
    - Assicurati che dentro ad ogni card ci sia un pulsante "Aggiungi al carrello"
    - Quando il pulsante viene cliccato...
        1. Aggiungi il libro alla lista del carrello
        2. Cambia lo stile della card per mostrare che è già stata aggiunta (un bordo colorato o un badge vanno bene)
    - Aggiungi un input di testo che funzioni come una barra di ricerca. Quando l'utente scrive più di 3 caratteri, filtra il risultato dell'API per renderizzare solo i libri con un titolo che corrisponda, anche parzialmente, al contenuto dell'input.
    SUGGERIMENTO: usa .filter()
    
    EXTRA FACOLTATIVI
    - Dai la possibilità all'utente di cancellare libri dal loro carrello
    - Conta gli elementi nel carrello e mostra il risultato nella sezione carrello
    - Crea un pulsante per svuotare il carrello