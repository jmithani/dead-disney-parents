/***** Global variables *****/

var width = 800;
var height = 600;

var mouseSize = 50;
var mousePadding = 10;
var rowLen = 10; // how many mice per row

var svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var buttons = [{ "name": "mom", "count": 30, "desc": "of films have a missing mother" },
               { "name": "dad", "count": 20, "desc": "of films have a missing father"  },
               { "name": "both", "count": 20, "desc": "of films have neither parent present" }];

var btns = d3.select("#controls").selectAll("button")
  .data(buttons)
  .enter()
  .append("button")
  .attr("height", 70)
  .attr("width", 200)
  .text( function(d, i) {
    return d.name;
  });

  btns.on("click", updateSide);

/***** Reading in CSV data in order to make mice grid *****/
d3.csv("../csv/all_films_nosequels.csv", function(data) {

  console.log(data);

  // Refining data into an object
  var miceData = makeObjects(data);
  //console.log(miceData);

  svg.selectAll(".mouse")
    .data(miceData)
    .enter()
    .append("image")
    .classed("image", true)
    .attr("href", "/img/mouse.svg")
    .attr("height", mouseSize)
    .attr("width", mouseSize)
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });
});

// Function to format raw data set into objects
function makeObjects(dataset) {
  //console.log(dataset);

  return dataset.map(function(d, i) {
    // keeping date as a string right now, d.release_date
    d.title = d.title; // string
    d.studio = d.studio; // string

    d.mom = (+d.mom === 1) ? true : false; // bool
    d.dad = (+d.dad === 1) ? true : false; // bool

    d.x = (i % rowLen) * (mouseSize + mousePadding); // int
    d.y = Math.floor(i / rowLen) * (mouseSize + mousePadding); // int
    return d; // new object
  });
}

/***** Functions for button filtering *****/

// Function to change the text of the sidebar
function updateSide(d) {
  
  var elDesc = document.getElementById("description");
  var elCount = document.getElementById("count");
  elCount.innerHTML = d.count;
  elDesc.innerHTML = d.desc;

}

// Function to update the mice color based on the
