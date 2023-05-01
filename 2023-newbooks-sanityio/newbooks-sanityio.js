(async () => {
  console.log("hey sanity");

  const getRandomNumbers = function (howMany, upperLimit) {
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

  const initializeDomForBooks = () => {
    let baseDom = document.getElementById("new-books-display-wrapper");
    baseDom.insertAdjacentHTML("beforeend", "<ul id='new-books'></ul>");
    // let nextDom = document.getElementById("new-books");
    // nextDom.style.display = "none";
  };
  const appendToDom = (itemData, number) => {
    var domsn = document.getElementById("new-books");



    var forDisplay = `
               <li class="new-books-li" id="new-books-li-${number}">
                 <div class="content" >
                  
                     <a href="${itemData.permalink}">
                         <div class="content-overlay" ></div>
                         <img class="content-image book-cover" id="cover${number}" src="${itemData.coverImageURL}"  >
                         <div class="content-details fadeIn-bottom">
                             <div class="content-title">${itemData.title}</div>
                     </a>
                 </div> 
             </li>`;

    domsn.insertAdjacentHTML("beforeend", forDisplay);
  };

  const sanityQuery = `*[_type == "newBooks"]`;
  const sanityCdnUrl = `https://wzuhalz9.apicdn.sanity.io/v2021-06-07/data/query/production?query=${sanityQuery}`;

  const fetchBooks = await fetch(sanityCdnUrl);
  if (!fetchBooks.ok) {
    throw new Error(`HTTP error! status: ${fetchBooks.status}`);
  }
  const booksData = await fetchBooks.json();
  const newBooksData = booksData.result;
  console.log(newBooksData);
  const ourRandoms = getRandomNumbers(5, newBooksData.length);
  initializeDomForBooks();
  ourRandoms.forEach((rando) => {
    console.log(newBooksData[rando].title);
    appendToDom(newBooksData[rando], rando);
  });
})();
