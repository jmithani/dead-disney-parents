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

d3.select("#controls").selectAll("button")
  .data(buttons)
  .enter()
  .append("button")
  .classed("btn-style", true)
  .attr("height", 70)
  .attr("width", 200)
  .text( function(d, i) {
    return d.name;
  });

// When a button is clicked, the sidebar and the mice update
d3.select("#controls").selectAll("button")
  .on("click", function(d) {
    updateSide(d);
    updateMice(d);
  });

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
    .classed("mouse", true)
    .attr("href", "/img/mouse.svg")
    .attr("height", mouseSize)
    .attr("width", mouseSize)
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .each(addClasses);
});

/***** DATA FORMATTING FUNCTIONS *****/

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

// Function to add classes based on data object
function addClasses(d) {
  //console.log(this);
  if (d.mom == true) {
    // console.log("mom true");
    d3.select(this).classed("mom-dead", true);
  }

  if (d.dad == true) {
    // console.log("dad true");
    d3.select(this).classed("dad-dead", true);
  }

  if (d.mom == true && d.dad == true) {
    console.log(d.title);
    d3.select(this).classed("both", true);
  }
}

/***** Functions for button filtering *****/

// Function to change the text of the sidebar
function updateSide(d) {
  console.log("updating side");
  var elDesc = document.getElementById("description");
  var elCount = document.getElementById("count");
  elCount.innerHTML = d.count;
  elDesc.innerHTML = d.desc;

}

// Function to update the mice color based on the button clicked
function updateMice(d) {
  // Right now, .active isn't mapped to anything, it's for debugging

  var opacity = 0.3;
  console.log("updating mice");

  d3.selectAll(".mouse")
    .classed("active", false)
    .attr("href", "/img/mouse.svg")
    .attr("opacity", opacity);

  switch(d.name) {
    case "both":
      console.log("matched both");
      d3.selectAll(".both")
        .classed("active", true)
        .attr("opacity", 1)
        .attr("href", "/img/mouse-pink.svg");
      break;

    case "mom":
      console.log("matched mom");
      d3.selectAll(".mom-dead")
        .classed("active", true)
        .attr("opacity", 1)
        .attr("href", "/img/mouse-pink.svg");
      break;

    case "dad":
      console.log("matched dad");
      d3.selectAll(".dad-dead")
        .classed("active", true)
        .attr("opacity", 1)
        .attr("href", "/img/mouse-pink.svg");
      break;
  }
}
