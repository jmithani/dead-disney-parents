var width = 800;
var height = 600;

var mouseSize = 20;
var mousePadding = 2;
var rowLen = 10; // how many mice per row

var svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
/*
var rect = svg.append("rect")
            .attr("height", squareSize)
            .attr("width", squareSize)
            .attr("x", 10)
            .attr("y", 10);
            */

d3.csv("../csv/all_films_nosequels.csv", function(data) {

  console.log(data);

  var miceData = makeObjects(data);
  console.log(miceData);

  svg.selectAll(".mouse")
    .data(miceData)
    .enter()
    .append("rect")
    .classed("image", true)
    .attr("height", mouseSize)
    .attr("width", mouseSize)
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });
});

function makeObjects(dataset) {
  //console.log(data);

  return dataset.map(function(d, i) {
    //console.log(d);
    //console.log(i);
    d.title = d.title; // string
    d.date = d.date; // keeping as a string right now
    d.studio = d.studio; // string
    d.mom = function(d) {
      if (d.mom === 1) {
        return true;
      }
      else {
        return false;
      }
    }; // bool
    d.dad = function(d) {
      if (d.dad === 1) {
        return true;
      }
      else {
        return false;
      }
    }; // bool
    d.x = (i % rowLen) * (mouseSize + mousePadding); // int
    //console.log(d.x);
    d.y = Math.floor(i / (mouseSize + mousePadding)) * (mouseSize + mousePadding); // int
    return d; // new object
    //console.log(d.y);
  });
}

// var squares = svg.selectAll("rect")
