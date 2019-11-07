let newBooksDynamism = (function(howManyWeWant) {
  console.log("hi");
  let totalDisplayed = 0;
  function checkThisPic(){console.log('YAY');}  
  //Getting a list of books with the subject newbooks limit=100 is one hundred results to work with.

  let url =
    "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03%2Cexact%2Cnewbooks&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47";
  fetch(url)
    .then(resp => resp.json())
    .then(function(result) {
      // console.log(result);
      // console.log(result.docs[1].pnx);

      var jsonContents = result.docs;
      var jsonResponseLength = jsonContents.length;
      // console.log(jsonResponseLength);

      //This is the function to generate as many random numbers we want - with the amount of API results as the upper range.
      var getRandomNumbers = function(howMany, upperLimit) {
        var limit = howMany,
          amount = 1,
          lower_bound = 1,
          upper_bound = upperLimit,
          unique_random_numbers = [];
        if (amount > limit) limit = amount; //Infinite loop if you want more unique natural numbers than exist in a given range
        while (unique_random_numbers.length < limit) {
          var random_number = Math.floor(
            Math.random() * (upper_bound - lower_bound) + lower_bound
          );
          if (unique_random_numbers.indexOf(random_number) == -1) {
            unique_random_numbers.push(random_number);
          }
        }
        return unique_random_numbers;
      };
      //This is where we actually specify how many random numbers we want generated. This is likely different than the number of books we want to display. We need at least a few more than we want displayed because sometimes there isn't a book cover and that item won't be displayed.
      var ourRandoms = getRandomNumbers(25, jsonResponseLength);
      // console.log(ourRandoms);

      bookCoverGrab(result, ourRandoms); //call a function with the full results from the API call and our random numbers.
    });
  //function to get book cover image url strings
  function bookCoverGrab(input, randos) {
    // console.log(input);

    for (i = 0; i < randos.length; i++) {
      let theIsbn = input.docs[randos[i]].pnx.search.isbn[0];
      let theTitle = input.docs[randos[i]].pnx.display.title;
      let theCatalogLink = `<a href="https://rocky-primo.hosted.exlibrisgroup.com/permalink/f/1j18u99/${input.docs[randos[i]].pnx.control.sourceid}${input.docs[randos[i]].pnx.control.sourcerecordid}"
               target="_blank">`;

      let syndetics = ` https://syndetics.com/index.aspx?isbn=${theIsbn}/MC.JPG&client=primo`;
      //  content-image book-cover
      addToDom(syndetics, theTitle, theCatalogLink);
    }
    const loaderr = document.getElementById("library-preloader");
    loaderr.style.display = "none";
  }

  function addToDom(theIMG, theTitle, catalogLink) {
    if (totalDisplayed < howManyWeWant) {
      class RmcNewBooks {
        constructor(theBookStuff) {
          this.theBookStuff = theBookStuff;
        }
        getToAppending() {
          var domsn = document.getElementById("new-books");
          domsn.insertAdjacentHTML("beforeend", this.theBookStuff);
          totalDisplayed++;
        }
      }
      var theBookStuff = `
     <li class="new-books-li">
       <div class="content">
        
           ${catalogLink}
               <div class="content-overlay"></div>
               <img class="content-image book-cover" id="cover${i}" src="${theIMG}" onload="checkThisPic(this.id)">
               <div class="content-details fadeIn-bottom">
                   <div class="content-title">${theTitle}
                    
           
               </div>
           </a>
       </div>
   </li>`;

      var ttttt = new RmcNewBooks(theBookStuff);
      ttttt.getToAppending();
    }
    // if(totalDisplayed = howManyWeWant){checkThosePics()}
    // checkThosePics();
  }

  let checkThosePics = () => {
    const liveCovers = document.querySelectorAll(".book-cover");
    
    liveCovers.forEach(i => {
      i.addEventListener('load', function() {
        // console.log("--------------------");
        // console.log(i);
        console.log('My width is: ', this.naturalWidth);
        // console.log('My height is: ', this.naturalHeight);
        // console.log("--------------------");
        if (this.naturalWidth < 10){this.style.display = "none";}
      });
    });
  };
})(7); //this number is how many books you'd like to be displayed
