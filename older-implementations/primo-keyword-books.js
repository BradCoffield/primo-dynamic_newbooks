let url =
//   "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=sub,exact,Alchemy%20--%20Fiction&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47";
//   "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=sub,exact,War%20fiction&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47";
  "https://api-na.hosted.exlibrisgroup.com/primo/v1/search?q=any,contains,War%20fiction&vid=01TRAILS_ROCKY&tab=default_tab&limit=150&scope=P-01TRAILS_ROCKY&apikey=l8xx79d281ecc1e44f9f8b456a23c8cb1f47";
fetch(url)
  .then(resp => resp.json())
  .then(function(result) {
    console.log(result);
    // result.docs.forEach((params) => {
    //     console.log(params.pnx.display.title[0]);
    // })
  });
