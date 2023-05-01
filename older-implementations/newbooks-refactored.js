let newBooksDynamism2 = (function(howManyWeWant) {
  let totalDisplayed = 0;

  function checkThisBook(num) {
    //   console.log("sup",num);
    let selectah = document.getElementById(`cover${num}`);
    let selectah2 = document.getElementById(`new-books-li-${num}`);
    if (selectah.naturalWidth < 50) {
      //   console.log("bad!", `cover${num}`);
      selectah2.style.display = "none";
    }
    if (selectah.naturalWidth > 50) {
      //   console.log("good!!", `cover${num}`);
      totalDisplayed++;
    }
  }

  //Getting a list of books with the subject newbooks limit=150 is one hundred and fifty results to work with.
  let url =
    "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03%2Cexact%2Cnewbooks&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47";

  fetch(url)
    .then(resp => resp.json())
    .then(function(result) {
      // console.log(result);
      console.log(result.docs[1].pnx);
      let theResults = result;
      let jsonContents = result.docs;
      let jsonResponseLength = jsonContents.length;
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
      var ourRandoms = getRandomNumbers(50, jsonResponseLength);
      // console.log(ourRandoms);
      // console.log(theResults);
      return { theResults, ourRandoms };
      //   bookCoverGrab(result, ourRandoms); //call a function with the full results from the API call and our random numbers.
    })
    .then(results => {
      // console.log(results.ourRandoms, results.theResults);
      let baseDom = document.getElementById("new-books-div");
      baseDom.insertAdjacentHTML("beforeend", "<ul id='new-books'>hi</ul>");
      let nextDom = document.getElementById("new-books");
      //   nextDom.style.display = "none";
      let i = 0;
      for (i; totalDisplayed < howManyWeWant; i++) {
        // console.log(results.theResults.docs[results.ourRandoms[i]].pnx.search);
        if (results.theResults.docs[results.ourRandoms[i]].pnx.search.isbn[0]) {
          let theIsbn =
            results.theResults.docs[results.ourRandoms[i]].pnx.search.isbn[0];
          let theTitle =
            results.theResults.docs[results.ourRandoms[i]].pnx.display.title;
          let theCatalogLink = `<a href="https://rocky-primo.hosted.exlibrisgroup.com/permalink/f/1j18u99/${results.theResults.docs[results.ourRandoms[i]].pnx.control.sourceid}${results.theResults.docs[results.ourRandoms[i]].pnx.control.sourcerecordid}"
                 target="_blank">`;

          let syndetics = `https://syndetics.com/index.aspx?isbn=${theIsbn}/MC.JPG&client=primo`;

          addToDom(syndetics, theTitle, theCatalogLink, i);
        }
        else console.log('snatch!');
      }
    });
  function addToDom(theIMG, theTitle, catalogLink, i) {
    if (totalDisplayed < howManyWeWant) {
      class RmcNewBooks {
        constructor(theBookStuff) {
          this.theBookStuff = theBookStuff;
        }
        getToAppending() {
          var domsn = document.getElementById("new-books");
          domsn.insertAdjacentHTML("beforeend", this.theBookStuff);
          checkThisBook(i);

          //   totalDisplayed++;
        }
      }

      var theBookStuff = `
         <li class="new-books-li" id="new-books-li-${i}">
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
})(7);
