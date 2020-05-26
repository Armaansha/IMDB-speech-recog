let sbutton = document.querySelector("#search");

sbutton.addEventListener('keyup', (e) => {
  let searchtext = e.target.value;
  searchmovies(searchtext);
console.log(searchtext)
});

function searchmovies(searchtext) {
    console.log(searchtext)
  let api = `http://www.omdbapi.com/?s=${searchtext}&apikey=f056e2f7`;

  window.fetch(api).then(data =>{
      data.json().then(movie =>{
          let movies=movie.Search;
          let out=[];
         for(let mov of movies){
          out +=`
            <div>
            <img src="${mov.Poster}" alt="">
            <h5>${mov.Title}</h5>
            </div>
          `
         }
         document.getElementById("cont").innerHTML=out;

      }).catch(err => console.log(err))
  }).catch(err => console.log(err));
}


