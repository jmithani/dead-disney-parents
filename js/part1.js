/***** Global variables *****/
var mouseSize = 50;
var mousePadding = 10;
var rowLen = 8; // how many mice per row
var widthTooltip = 250;

var width = (mouseSize + mousePadding) * rowLen;
// var height = (mouseSize + mousePadding) * 11; // this is hardcoded... @todo change with SASS?

var svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", 0); // will fill it later depending on number of mice

/***** TOOLTIPS *****/
d3.select(".tooltip")
   .style("opacity", 0.1);

//var timeScale = d3.scaleTime.domain(new Date(1930, 0, 1), new Date(2018, 0, 1));
var parseDate = d3.timeParse("%d-%b-%y");
//console.log(parseDate("01-Mar-69"));

var formatDate = d3.timeFormat("%Y");

//***** Making the buttons *****/

var buttons = [{ "name": "mom", "count": 30, "desc": "films have a missing mother" },
               { "name": "dad", "count": 23, "desc": "films have a missing father"  },
               { "name": "both", "count": 15, "desc": "films have neither parent present" }];

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
d3.csv("csv/all_final.csv", function(data) {

  // Refining data into an object
  var miceData = makeObjects(data);

  // Changing height of SVG based on number of mice
  svg.attr("height", function(d, i) {
    console.log(miceData.length);
    return (mouseSize + mousePadding) * (miceData.length / rowLen) + (mouseSize/2); });
    // (mouseSize/2) is necessary to show the bottom half of the last row of mice

  svg.selectAll(".mouse")
    .data(miceData)
    .enter()
    .append("image")
    .classed("mouse", true)
    .attr("href", "img/mouse.svg")
    .attr("height", mouseSize)
    .attr("width", mouseSize)
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .each(addClasses)
    .each(makeTooltip);
});

/***** DATA FORMATTING FUNCTIONS *****/

// Function to format raw data set into objects
function makeObjects(dataset) {

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
  if (d.mom == true) {
    d3.select(this).classed("mom-dead", true);
  }

  if (d.dad == true) {
    d3.select(this).classed("dad-dead", true);
  }

  if (d.mom == true && d.dad == true) {
    d3.select(this).classed("both", true);
  }
}

/***** Functions for button filtering *****/

// Function to change the text of the sidebar
function updateSide(d) {
  console.log("updating side");

  // FUTURE @todo make this a smooth transition

  var elDesc = document.getElementById("description");
  var elCount = document.getElementById("count");
  elCount.innerHTML = d.count;
  elDesc.innerHTML = d.desc;

}

// Function to update the mice color based on the button clicked
function updateMice(d) {

  // Right now, .active isn't mapped to anything, it's for debugging

  var opacity = 0.3;
  var duration = 300;

  // d3.selectAll(".mouse")
  //   .classed("active", false)
  //   // .transition()
  //   // .duration(100)
  //   // .attr("href", "img/mouse.svg")
  //   .attr("opacity", opacity);

  switch(d.name) {
    case "both":
      d3.selectAll(".mom-dead")
        .classed("active", true)
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("href", "img/mouse-pink.svg");

        d3.selectAll(".dad-dead")
          .classed("active", true)
          .transition()
          .duration(duration)
          .attr("opacity", 1)
          .attr("href", "img/mouse-pink.svg");
      break;

    case "mom":
      d3.selectAll(".dad-dead")
        .classed("active", false)
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("href", "img/mouse.svg");

        d3.selectAll(".mom-dead")
          .classed("active", true)
          .transition()
          .duration(duration)
          .attr("opacity", 1)
          .attr("href", "img/mouse-pink.svg");
      break;

    case "dad":
      d3.selectAll(".mom-dead")
        .classed("active", true)
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("href", "img/mouse.svg");

      d3.selectAll(".dad-dead")
        .classed("active", true)
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("href", "img/mouse-pink.svg");
      break;
  }
}

/***** TOOLTIP FUNCTION *****/

function adjustDate(date) {
  if (date.getFullYear() > 2017) {
    date.setFullYear(date.getFullYear() - 100);
  }
  return date;
}

function makeTooltip(d) {

  var xPosition = parseFloat(d3.select(this).attr("x")) + widthTooltip * (1.5); // this is guesstimation rn
  var yPosition = parseFloat(d3.select(this).attr("y")) + mouseSize*2;
  //console.log(xPosition + " " + yPosition);

  d3.select(this)
    .on("mouseover", function(d) {
      d3.select(".tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0.9)
        .style("left", xPosition + "px")
        .style("top", yPosition + "px" );

        d3.select(".tooltip-title")
          .text(d.title);
        console.log(parseDate(d.release_date));
        d3.select(".tooltip-date")
          .text(formatDate(adjustDate(parseDate(d.release_date))));
    })
    .on("mouseout", function(d) {
      d3.select(".tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0.1);
    });

}
