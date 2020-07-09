let sbutton1 = document.querySelector("#search");
let sbutton2 = document.querySelector(".sbtn");

// sbutton.addEventListener('keyup', (e) => {
sbutton2.addEventListener("click", (e) => {
  // let searchtext = e.target.value;
  let searchtext = sbutton1.value;

  searchmovies(searchtext);
  let formtext = document.getElementById("headings");
  formtext.style.display = "none";
  sbutton1.classList.add("afterkeypress");
  document.querySelector("#count").classList.add("afterkeypressitems");
  document.querySelector("#backlink").innerHTML = `<a href="./d.html">back</a>`;
});

let mike = document.querySelector("#mike");
mike.addEventListener("click", () => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.addEventListener("result", (e) => {
    let trans = [...e.results]
      .map((res) => res[0])
      .map((resu) => resu.transcript)
      .join("");

    console.log(trans);
    let formtext = document.getElementById("headings");
    formtext.style.display = "none";
    sbutton1.classList.add("afterkeypress");
    document.querySelector("#count").classList.add("afterkeypressitems");

    let speech = trans;
    sbutton1.value = speech;
    searchmovies(speech);
  });
  recognition.start();
});

function searchmovies(searchtext) {
  console.log(searchtext);
  let api = `http://www.omdbapi.com/?s=${searchtext}&apikey=f056e2f7`;

  window
    .fetch(api)
    .then((data) => {
      data
        .json()
        .then((movie) => {
          let movies = movie.Search;
          let out = [];

          for (let mov of movies) {
            console.log(movies);
            let defaultimages =
              mov.Poster === "N/A" ? "./images/def.png" : mov.Poster;
            out += `
          <div id="contbody">  
          <div id="contmain"> 
            <img src="${defaultimages}" alt="">
            </div>
            <div id="contfoot">
            <h3>${mov.Title}</h3>
            <p>${mov.Year}</p>
           <div> 
           <a href="http://www.omdbapi.com/?i=${mov.imdbID}&apikey=f056e2f7">More Info</a>
           <br/>
           <a href="http://www.imdb.com/title/${mov.imdbID}">others</a>
           </div>
            </div>
            </div>
          `;
          }
          document.getElementById("content").innerHTML = out;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
