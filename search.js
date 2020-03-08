//the main valid categories according to yelp
var validcategories = ["restaurants", "afghani", "african", "newamerican", "tradamerican", "andalusian", "arabian", "argentine", "armenian", "asianfusion", "asturian", "australian", "austrian", "baguettes", "bangladeshi", "bbq", "basque", "bavarian", "beergarden", "beerhall",
"beisl", "belgian", "bistros", "blacksea", "brasseries", "brazilian", "breakfast_brunch", "british", "buffets", "bulgarian", "burgers", "burmese", "cafes", "cafeteria", "cajun", "cambodian", "newcanadian", "canteen", "caribbean", "catalan", "cheesesteaks", "chickenshop", "chicken_wings", "chilean",
"chinese", "comfortfood", "corsican", "creperies", "cuban", "currysausage", "cypriot", "czech", "czechslovakian", "danish", "delis", "diners", "dinnertheater", "dumplings", "eastern_european", "eritrean", "ethiopian", "hotdogs", "filipino", "fischbroetchen", "fishnchips", "flatbread", "fondue", "food_court",
"foodstands", "freiduria", "french", "sud_ouest", "galician", "gamemeat", "gastropubs", "georgian", "german", "giblets", "gluten_free", "greek", "guamanian", "halal", "hawaiian", "heuriger", "himalayan", "honduran", "hkcafe", "hotdog", "hotpot", "hungarian", "iberian", "indpak", "indonesian", "international",
"irish", "island_pub", "israeli", "italian", "japanese", "jewish", "kebab", "kopitiam", "korean", "kosher", "kurdish", "loas", "loatian", "latin", "raw_food", "lyonnais", "malaysian", "meatballs", "mediterranean", "mexican", "mideastern", "milkbars", "modern_australian", "modern_european", "mongolian",
"moroccan", "newmexican", "newzealand", "nicaraguan", "nightfood", "nikkei", "noodles", "norcinerie", "opensandwiches", "oriental", "pfcomercial", "pakistani", "panasian", "eltern_cafes", "parma", "persian", "peruvian", "pita", "pizza", "polish", "polynesian", "popuprestaurants", "portuguese", "potatoes",
"poutineries", "pubfood", "riceshop", "romanian", "rotisserie_chicken", "russian", "salad", "sandwiches", "scandinavian", "schnitzel", "scottish", "seafood", "serbocroatian", "signature_cuisine", "singaporean", "slovakian", "somali", "soulfood", "soup", "southern", "spanish", "srilankan", "steak", "supperclubs",
"sushi", "swabian", "swedish", "swissfood", "syrian", "tabernas", "taiwanese", "tapas", "tapasmallplates", "tavolacalda", "tex-mex", "norwegian", "traditional_swedish", "trattorie", "turkish", "ukrainian", "uzbek", "vegan", "vegetarian", "venison", "vietnamese", "waffles", "wok", "wraps", "yugoslav"];

var cat = "restaurants"; //default category is all restaurants

//used to store coordinates
var lat = document.getElementById("lat");
var long = document.getElementById("long");

//used to inform the user that the site is loading - prevents user from leaving site or clicking again
var load = document.getElementById("load");

var city; //stores name of city/zipcode entered
var currCount = 0; //keeps track of which businesses have been displayed (resets every 50 since 50 is the highest limit)
var table = document.getElementById("table"); //table where the list of business and info are displayed

var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/'; //cors used to make request
//search url used with GET to obtain the set of businesses, placeholders LAT, LONG, and CAT are replaced before using
var yelp_search_url = cors_anywhere_url + "https://api.yelp.com/v3/businesses/search?latitude=LAT&longitude=LONG&limit=50&categories=CAT";

//uses html5 geolocation to get the current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//stores the latitude and longitude information from the current position
function showPosition(position) {
  lat.innerHTML = position.coords.latitude;
  long.innerHTML = position.coords.longitude;
}


//initializes the map using the latitude and longitude
function initMap() {
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  //creates the map using googlemaps api - centered at given lat and long
  //zoom 12 allows the user to see the location of the restaurants initially
  //user can then zoom in and out depending on where the restaurants are located
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: cent});
}

//displayes the results of the search for restaurants
function display(body){
  resetTable(); //makes sure the table is intially clear

  var num = 10; //number of business displayed at a time

  //used to display map
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: cent});

  var count; //keeps track of how many business are available to be displayed
  //if no businesses found, tell user there are no restaurants nearby
  if (body.total == 0) {
    count = 0;
    var newRow = table.insertRow(table.length);
    var cell0 = newRow.insertCell(0);
    cell0.innerHTML = "No restaurants found";
  }
  //if there are less than num restaurants, only display the number available
  else if (body.total < num) {
    count = body.total;
    currCount = 0;
  }
  //if there are less than num+currCount restaurants, reset currCount and show the first restaurants displayed again
  else if (body.total < num + currCount) {
    count = num;
    currCount = 0;
  }
  //there are more than enough restaurants available, so go to display
  else {
    count = num;
  }
  //if we have surpassed the 50 restaurants returned, display the first restaurants again
  if (50 < count + currCount) {
    currCount = 0;
  }

  //for loop to display the restaurants
  var i;
  for (i = currCount; i < count + currCount; i++)
  {
    //make marker on map with label repesenting each business
    var latn = parseFloat(body.businesses[i].coordinates.latitude);
    var longn = parseFloat(body.businesses[i].coordinates.longitude);

    var pos = {lat: latn, lng: longn}
    var marker = new google.maps.Marker({position: pos, label: body.businesses[i].name, map: map})

    //add a table to a row with information about each businesses
    //make the cell blank if info is not available
    var newRow = table.insertRow(table.length);

    var cell0 = newRow.insertCell(0); //for restaurant name
    if (typeof(body.businesses[i].name) === 'undefined')
    {
      cell0.innerHTML = " ";
    }
    else {
      cell0.innerHTML = body.businesses[i].name;
    }

    var cell1 = newRow.insertCell(1); //for restaurant address
    if (typeof(body.businesses[i].location.address1) === 'undefined')
    {
      cell1.innerHTML = " ";
    }
    else {
      cell1.innerHTML = body.businesses[i].location.address1;
    }

    var cell2 = newRow.insertCell(2); //for restaurant rating
    if (typeof(body.businesses[i].rating) === 'undefined')
    {
      cell2.innerHTML = " ";
    }
    else {
      cell2.innerHTML = body.businesses[i].rating;
    }

    var cell3 = newRow.insertCell(3); //for restaurant price range
    if (typeof(body.businesses[i].price) === 'undefined')
    {
      cell3.innerHTML = " ";
    }
    else {
      cell3.innerHTML = body.businesses[i].price;
    }

    var cell4 = newRow.insertCell(4); //for restaurant phone number
    if (typeof(body.businesses[i].phone) === 'undefined')
    {
      cell4.innerHTML = " ";
    }
    else {
      cell4.innerHTML = body.businesses[i].phone;
    }
  }

  load.innerHTML = ""; //it is done loading
  currCount = currCount + count; //update which business have been displayed already
}

function performSearch() {
  load.innerHTML = "Currently Loading"; //signify to reader that search has begun

  var latitude = parseFloat(lat.innerHTML); //get lat/long info
  var longitude = parseFloat(long.innerHTML);

  //add relevant search criteria to search URL
  var search_url = yelp_search_url.replace("LAT",latitude);
  var search_url = search_url.replace("LONG",longitude);
  var search_url = search_url.replace("CAT",cat);

  //make request and send what is received to the display function
  var xhr = new XMLHttpRequest();
  xhr.open('GET', search_url, true);

  xhr.setRequestHeader("Authorization", "Bearer " + "tUt_Mg6HvQqVlea9-FWuYIXVOY8UeVJ28zLPgQVanAT_it7m5TykzgMn4-m008g2UJHeS50P5o3knVsRBs1V2BIbsCJbBrEQMn0P5b0Zy-sOsPEfCv-H9cSWyrheXnYx");
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
             display(JSON.parse(xhr.response));
           }
    };
  xhr.send();
}

//use googlemaps api geocoder to get lat/long of entered city/zipcode
//lat/long are used for displaying the map and the yelp search URL
function nearByEventsMap() {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
            address: city
        }, function (results, status) {
            if (status === 'OK') {
                const result = results[0].geometry.location;
                lat.innerHTML = result.lat().toString();
                long.innerHTML = result.lng().toString();
            }
        })
}

//signals that user has entered a Location
function changeCity() {
  //makes sure that the category entered is valid, alerts if not valid
  //sets to default of restaurants if nothing is entered
  cat = document.getElementById("inputCat").value;
  if (cat == "")
    cat = "restaurants";
  if (!validcategories.includes(cat)) {
    alert("Enter a valid category");
    return false;
  }

  //makes sure that something was entered, alerts if empty
  city = document.getElementById("inputCity").value;
  if (city == "") {
    alert("Enter a location");
    return false;
  };

  //changes to display screen by switching divs
  document.getElementById("home").style.display="none";
	document.getElementById("new").style.display="block";

  //calls function to get lat/long info of entered city/zipcode
  nearByEventsMap();
}

//signifies that user has chosen to use current location
function changeCurr() {
  //makes sure that the category entered is valid, alerts if not valid
  //sets to default of restaurants if nothing is entered
  cat = document.getElementById("inputCat").value;
  if (cat == "")
    cat = "restaurants";
  if (!validcategories.includes(cat)) {
    alert("Enter a valid category");
    return false;
  }

  //changes to display screen by switching divs
  document.getElementById("home").style.display="none";
	document.getElementById("new").style.display="block";

  //calls method to get current location
  getLocation();
}

//erase everything but the header row of the table
function resetTable() {
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  for (var x=rowCount-1; x>0; x--) {
     table.deleteRow(x);
  }
}

//go back to home screen by switching which divs are visible
//reset latitude and longitude, currCount, and the map - ensures that the map does not show previous location
function restart() {
  document.getElementById("home").style.display="block";
	document.getElementById("new").style.display="none";
  lat.innerHTML = "";
  long.innerHTML = "";
  resetTable();
  currCount = 0;
  initMap();
}
