var validcategories = ["restaurants", "afghani", "african", "newamerican", "tradamerican", "andalusian", "arabian", "argentine", "armenian", "asianfusion", "asturian", "australian", "austrian", "baguettes", "bangladeshi", "bbq", "basque", "bavarian", "beergarden", "beerhall",
"beisl", "belgian", "bistros", "blacksea", "brasseries", "brazilian", "breakfast_brunch", "british", "buffets", "bulgarian", "burgers", "burmese", "cafes", "cafeteria", "cajun", "cambodian", "newcanadian", "canteen", "caribbean", "catalan", "cheesesteaks", "chickenshop", "chicken_wings", "chilean",
"chinese", "comfortfood", "corsican", "creperies", "cuban", "currysausage", "cypriot", "czech", "czechslovakian", "danish", "delis", "diners", "dinnertheater", "dumplings", "eastern_european", "eritrean", "ethiopian", "hotdogs", "filipino", "fischbroetchen", "fishnchips", "flatbread", "fondue", "food_court",
"foodstands", "freiduria", "french", "sud_ouest", "galician", "gamemeat", "gastropubs", "georgian", "german", "giblets", "gluten_free", "greek", "guamanian", "halal", "hawaiian", "heuriger", "himalayan", "honduran", "hkcafe", "hotdog", "hotpot", "hungarian", "iberian", "indpak", "indonesian", "international",
"irish", "island_pub", "israeli", "italian", "japanese", "jewish", "kebab", "kopitiam", "korean", "kosher", "kurdish", "loas", "loatian", "latin", "raw_food", "lyonnais", "malaysian", "meatballs", "mediterranean", "mexican", "mideastern", "milkbars", "modern_australian", "modern_european", "mongolian",
"moroccan", "newmexican", "newzealand", "nicaraguan", "nightfood", "nikkei", "noodles", "norcinerie", "opensandwiches", "oriental", "pfcomercial", "pakistani", "panasian", "eltern_cafes", "parma", "persian", "peruvian", "pita", "pizza", "polish", "polynesian", "popuprestaurants", "portuguese", "potatoes",
"poutineries", "pubfood", "riceshop", "romanian", "rotisserie_chicken", "russian", "salad", "sandwiches", "scandinavian", "schnitzel", "scottish", "seafood", "serbocroatian", "signature_cuisine", "singaporean", "slovakian", "somali", "soulfood", "soup", "southern", "spanish", "srilankan", "steak", "supperclubs",
"sushi", "swabian", "swedish", "swissfood", "syrian", "tabernas", "taiwanese", "tapas", "tapasmallplates", "tavolacalda", "tex-mex", "norwegian", "traditional_swedish", "trattorie", "turkish", "ukrainian", "uzbek", "vegan", "vegetarian", "venison", "vietnamese", "waffles", "wok", "wraps", "yugoslav"];

var table = document.getElementById("table");

// creates a table that displays the different valid categories that yelp allows
// the table serves as a reference for the user
function populate() {
  var i;
  for (i = 0; i < validcategories.length/12; i++) {
    var newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = validcategories[i*12];
    newRow.insertCell(1).innerHTML = validcategories[i*12 + 1];
    newRow.insertCell(2).innerHTML = validcategories[i*12 + 2];
    newRow.insertCell(3).innerHTML = validcategories[i*12 + 3];
    newRow.insertCell(4).innerHTML = validcategories[i*12 + 4];
    newRow.insertCell(5).innerHTML = validcategories[i*12 + 5];
    newRow.insertCell(6).innerHTML = validcategories[i*12 + 6];
    newRow.insertCell(7).innerHTML = validcategories[i*12 + 7];
    newRow.insertCell(8).innerHTML = validcategories[i*12 + 8];
    newRow.insertCell(9).innerHTML = validcategories[i*12 + 9];
    newRow.insertCell(10).innerHTML = validcategories[i*12 + 10];
    newRow.insertCell(11).innerHTML = validcategories[i*12 + 11];
  }
}

populate();
