// TODO: select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML
const suggestionList = document.querySelector("#suggestions") as HTMLUListElement
const sun = document.querySelector("#sun") as HTMLSelectElement
const moon = document.querySelector("#moon") as HTMLSelectElement
const rising = document.querySelector("#rising") as HTMLSelectElement

// Here, when the value of sun is changed, we will call the method postAndUpdate.
// TODO: Do the same for moon and rising
sun.addEventListener("change", postAndUpdate)
moon.addEventListener("change", postAndUpdate)
rising.addEventListener("change", postAndUpdate)

// TODO: Define a type for the request data object here.
type MatchesRequestData = {[key: string]: string}

// TODO: Define a type for the response data object here.
type Matches = {"data": string[]}

function postAndUpdate(): void {
  // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
  //  HINT: use .innerHTML
  suggestionList.innerText = ""

  // TODO: add a type annotation to make this of type MatchesRequestData
  const postParameters: MatchesRequestData = {
    // TODO: get the text inside the input box
    //  HINT: use sun.value to get the value of the sun field, for example
    "sun": sun.value,
    "moon": moon.value,
    "rising": rising.value,
  };

  console.log(postParameters)

  // TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
  //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
  //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
  //  Remember to add a type annotation for the response data using the Matches type you defined above!
  fetch("http://localhost:4567/matches", {
    // Request method
    method: 'post',
    // Data in JSON format to send in the request
    body: JSON.stringify(postParameters),
    // HTTP headers to tell the receiving server what format the data is in
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    },
  })

      // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
      //  Parse the JSON in the response object
      //  HINT: remember to get the specific field in the JSON you want to use
      .then((response) => response.json())
      .then((jsonResponse: Matches) => {
        updateSuggestions(jsonResponse.data)})
}

function updateSuggestions(matches: string[]): void {
  // TODO: for each element in the set of matches, append it to the suggestionList
  //  HINT: use innerHTML += to append to the suggestions list
  //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  //  This makes each element selectable via screen reader.
  for (let i = 0; i < matches.length; i++) {
    suggestionList.innerHTML += `<li tabindex=\"${i}\">${matches[i]}</li>\n`
  }
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sun.value = sunval;
  moon.value = moonval;
  rising.value = risingval;
}

document.addEventListener(
    "keyup",
    () => updateValues("Leo", "Leo", "Leo")
        .then(postAndUpdate))