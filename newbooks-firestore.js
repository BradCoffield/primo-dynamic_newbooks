let newBooksFirestore = function(howManyWeWant){
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


    db.collection("primo-searches")
    .doc("new-books")
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data().results);

const rawData = doc.data().results;

    const getRandomNumbers = function(howMany, upperLimit) {
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
     
      var ourRandoms = getRandomNumbers(50, rawData.length);
      return { rawData, ourRandoms };
    
    }
    }).then(function(results){
        let baseDom = document.getElementById("new-books-div");
        baseDom.insertAdjacentHTML("beforeend", "<ul id='new-books'>hi</ul>");
        let nextDom = document.getElementById("new-books");
        //   nextDom.style.display = "none";
        let i = 0;
        for (i; totalDisplayed < howManyWeWant; i++) {
          // console.log(results.rawData[results.ourRandoms[i]].pnx.search);
          if (results.rawData[results.ourRandoms[i]].isbn[0] != undefined) {
            let theIsbn =
              results.rawData[results.ourRandoms[i]].isbn[0];
            let theTitle =
              results.rawData[results.ourRandoms[i]].title;
              let theCatalogLink = `<a href="https://rocky-primo.hosted.exlibrisgroup.com/permalink/f/1j18u99/${ results.rawData[results.ourRandoms[i]].sourceid[0]}${ results.rawData[results.ourRandoms[i]].sourcerecordid[0]}"
              target="_blank">`;
 
            let syndetics = `https://syndetics.com/index.aspx?isbn=${theIsbn}/MC.JPG&client=primo`;
  
            addToDom(syndetics, theTitle, theCatalogLink, i);
          }
          else console.log('snatch!');
        }
    })
    .catch(err => {
      console.log('Error getting document', err);
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
     
      }




  
}(7)






