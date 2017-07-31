var width = 800;
var height = 600;

var squareSize = 50;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var rect = svg.append("rect")
            .attr("height", squareSize)
            .attr("width", squareSize)
            .attr("x", 10)
            .attr("y", 10);

d3.csv("csv/all_films.csv", function(data) {
  //console.log(data);
  dataset = data;

  var numberFilms = dataset.length;
  //console.log(numberFilms);

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("height", squareSize)
    .attr("width", squareSize)
    .attr("y", "50%")
    .attr("x", function(d, i) {
      var x = (i * 50) + 2;
      console.log(x)
      return x;
    });



});

// var squares = svg.selectAll("rect")
