console.log("hi");

//F it i'm gonna do it with jquery and fetch versions. use the jq on rmc

$.getJSON(
  "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=lsr03%2Cexact%2Cnewbooks&vid=01TRAILS_ROCKY&tab=default_tab&limit=100&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47",
  function(result) {
    // var entry = result[Math.floor(Math.random() * result.length)];
    // var randomGuide = '<a href="' + entry.url + '">' + entry.name + '</a>';
    console.log(result.docs[1].pnx);
    // $('#new-books').append('hi')
    var jsonContents = result.docs;
    var jsonResponseLength = jsonContents.length;
    console.log(jsonResponseLength);

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
    //This is where we actually specify how many random numbers (and therefore how many books) we want generated.
    var ourRandoms = getRandomNumbers(6, jsonResponseLength);
    console.log(ourRandoms);

    // TODO: I'm working here to grab the book cover image url so I can append it into the iterating class
  





    
    class RmcNewBooks {
      constructor(theBookStuff) {
        this.theBookStuff = theBookStuff;
      }
      getToAppending() {
        var domsn = document.getElementById("new-books");
        domsn.insertAdjacentHTML("beforeend", this.theBookStuff);
      }
    }
    //${jsonContents[ourRandoms[i]].pnx.display.title}

    for (i = 0; i < ourRandoms.length; i++) {
      function bookCoverGrab(input){
        $.getJSON(
          `https://books.google.com/books?bibkeys=ISBN:${input}&jscmd=viewapi&callback=?`,
          function(data) {console.log(data);return "jo"}
        );
      }
      var theBookStuff = `
        ${bookCoverGrab(jsonContents[0].pnx.search.isbn[0])}
        <li class="new-books-li">
        <div class="content">
        ${jsonContents[ourRandoms[i]].pnx.search.isbn[0]}
            <a href="https://rocky-primo.hosted.exlibrisgroup.com/permalink/f/1j18u99/${jsonContents[ourRandoms[i]].pnx.control.sourceid}${jsonContents[ourRandoms[i]].pnx.control.sourcerecordid}"
                target="_blank">
                <div class="content-overlay"></div>
                <img class="content-image book-cover" src="https://m.media-amazon.com/images/I/51q1Ql-G61L._AC_UL436_.jpg">
                <div class="content-details fadeIn-bottom">
                    <div class="content-title">${jsonContents[ourRandoms[i]].pnx.display.title}
                    </div>
                    <p class="content-text">${jsonContents[ourRandoms[i]].pnx.display.creator} <br><i class="fas fa-external-link-alt"></i></p>
                </div>
            </a>
        </div>
    </li>
        
        
        
        `;

      var ttttt = new RmcNewBooks(theBookStuff);
      ttttt.getToAppending();
    }
  }
);



// function testingISBN(input) {
//   if (
//     input["schema:about"] &&
//     input["schema:about"]["schema:workExample"] &&
//     input["schema:about"]["schema:workExample"]["schema:isbn"]
//   ) {
//     // $(".book-entry-ISBN").html("ISBN: " + input["schema:about"]["schema:workExample"]["schema:isbn"]["0"]);
//     var bookISBN = input["schema:about"]["schema:workExample"]["schema:isbn"]["0"];

//     $.getJSON(`https://books.google.com/books?bibkeys=ISBN:${bookISBN}&jscmd=viewapi&callback=?`, function(
//       data
//     ) {
//       //check if returned an img
//       if (data["ISBN:" + bookISBN + ""]) {
//         // console.log("imgisbn", data["ISBN:" + bookISBN + ""].thumbnail_url);
//         var imgISBN = data["ISBN:" + bookISBN + ""].thumbnail_url;
//         console.log("imgisbn", imgISBN);
//         var bookImage = '<img src="' + imgISBN + '" alt="Book cover image_">';

//         $(".book-entry-book-cover-image").html(bookImage);
//       } else {
//         $(".book-entry-book-cover-image").html(genericBookImage);
//       }
//     });
//     //   &bibkeys=OCLC:36792831
//     //append isbn to sfu search. should return only 1 item
//     var itemURL = "https://stfrancisuniversity.on.worldcat.org/search?queryString=" + bookISBN;
//     console.log("item url", itemURL);
//   } else if (input["schema:about"] && input["schema:about"]["library:oclcnum"]) {
//     var bookOCLCnum = input["schema:about"]["library:oclcnum"];

//     $.getJSON(
//       `https://books.google.com/books?bibkeys=OCLC:${bookOCLCnum}&jscmd=viewapi&callback=?`,
//       function(data) {
//         //check if returned an img
//         if (data["ISBN:" + bookOCLCnum + ""]) {
//           console.log("urlimg", data["ISBN:" + bookOCLCnum + ""].thumbnail_url);
//           var imgOCLC = data["OCLC:" + bookOCLCnum + ""].thumbnail_url;
//           console.log("imgoclc:", imgOCLC);
//           var bookImage = '<img src="' + imgOCLC + '" alt="Book cover image">';

//           $(".book-entry-book-cover-image").html(bookImage);
//         } else {
//           $(".book-entry-book-cover-image").html(genericBookImage);
//         }
//       }
//     );

//     //append oclc to sfu search. should return only 1 item
//     var itemURL = "https://stfrancisuniversity.on.worldcat.org/search?queryString=" + bookOCLCnum;
//     console.log("oclcnum item url:", itemURL);
//     // $(".book-entry-ISBN").html("OCLC#: " + bookOCLCnum);
//   } else {
//     //just leave it off*/
//   }
// }


