//get all the results from primo as before
//create the ul that all the books will go onto and display none it
//take like 50 randomized results (can i just randomize 1-100?)
//FOR EACH ONE - append, check the pic, if no good remove, if good ++ counter and move on.
//maybe create a uniqued id for the top level of the book thing in addition to the image to make for easy removal

let newBooksDynamism2 = (function() {
  let totalDisplayed = 0;
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
      //   console.log(theResults);
      return { theResults, ourRandoms };
      //   bookCoverGrab(result, ourRandoms); //call a function with the full results from the API call and our random numbers.
    })
    .then(results => {
      console.log(results.ourRandoms, results.theResults);
      while (totalDisplayed < 8){
        results.ourRandoms.forEach((i) => {
            totalDisplayed++
            console.log("TD",totalDisplayed);
            console.log(i);
            
        })
    } 
     
    });
    let bookAppender = function(item){console.log(item);}
})();
