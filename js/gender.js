var genderData = [ { "gender": "male", "parent": "dad", "total": 19 },
                   { "gender": "female", "parent": "dad", "total": 5 },
                   { "gender": "male", "parent": "mom", "total": 19 },
                   { "gender": "female", "parent": "mom", "total": 12 },
                   { "gender": "male", "parent": "both parent", "total": 7 },
                   { "gender": "female", "parent": "both parent", "total": 3 }];

var barHeight = 40;
var maxBarLength = 500;
var padding = 10;
var barsNum = genderData.length;

var width = maxBarLength * 2;
var height = ((barsNum + 1) * (barHeight + padding)) + (padding * 2);

var bars = d3.select("#genderBars")
             .append("svg")
             .attr("height", height)
             .attr("width", width);

// Hard coding this because so few values...shh...
var barLenScale = d3.scaleLinear()
                    .domain([0, 20])
                    .range([0, maxBarLength]);


bars.selectAll("rect")
    .data(genderData)
    .enter()
    .append("rect")
    .attr("height", barHeight)
    .attr("width", function(d) {
      //console.log(barLenScale(d.total));
      return barLenScale(d.total)})
    .attr("x", 0)
    .attr("y", function(d, i) { return (i * (barHeight + padding))})
    .attr("fill", function(d) {
      if (d.gender == "female") {
        return "purple";
      } else {
        return "green";
      }
    });

bars.selectAll("text")
  .data(genderData)
  .enter()
  .append("text")
  .attr("font-family", "Karla")
  .attr("font-size", (barHeight / 2))
  .attr("x", function(d) {
    return (barLenScale(d.total) + padding)
  })
  .attr("y", function(d, i) {
    return (i * (barHeight + padding) + 5 + (barHeight/2))
  })
  .text(function(d) {
      //console.log("this is d");
      //console.log(d);
      return (d.total + " " + d.gender + " characters are missing " + d.parent + "s");
    });
