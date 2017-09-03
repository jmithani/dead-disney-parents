var genderData = [ { "gender": "male", "parent": "dad", "total": 19 },
                   { "gender": "male", "parent": "mom", "total": 19 },
                   { "gender": "male", "parent": "both parent", "total": 7 },
                   { "gender": "female", "parent": "mom", "total": 12 },
                   { "gender": "female", "parent": "dad", "total": 5 },
                   { "gender": "female", "parent": "both parent", "total": 3 }];

var labels = [ "Missing a Mom", "Missing a Dad", "Missing Both Parents"];

var barHeight = 40;
var maxBarLength = 300;
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

// Drawing the actual pyramid bars
bars.selectAll("rect")
    .data(genderData)
    .enter()
    .append("rect")
    .attr("height", barHeight)
    .attr("width", function(d) {
      //console.log(d);
      return barLenScale(d.total)})
    .attr("x", function(d) {
      if (d.gender == "female") {
        return ((width/2) - barLenScale(d.total));
      } else {
        return (width/2);
      }
    })
    .attr("y", function(d, i) { return (barHeight + (i % 3) * (barHeight * 2))})
    .attr("fill", function(d) {
      if (d.gender == "female") {
        return "purple";
      } else {
        return "green";
      }
    });

bars.selectAll(".values")
    .data(genderData)
    .enter()
    .append("text")
    .classed("values", true)
    .attr("font-size", (barHeight / 2))
    .attr("fill", "white")
    .attr("x", function(d) {
      console.log(d);
      if (d.gender == "female") {
        return ((width/2) - barLenScale(d.total) + padding);
      } else {
        return ((width/2) + barLenScale(d.total) - (padding * 3)); // padding * 3 accounts for double digits on far right
      }
    })
    .attr("y", function(d, i) { return (barHeight * 1.75) + ((i % 3) * (barHeight * 2)) })
    .text(function(d) { return d.total; });

// Drawing labels for the pyramid chart
bars.selectAll(".labels")
  .data(labels)
  .enter()
  .append("text")
  .classed("labels", true)
  .attr("font-size", (barHeight / 1.5))
  .attr("x", function(d) {
    //console.log(d);
    return (width/2) - (d.length/2 * (barHeight/4) +5); })
  .attr("y", function(d, i) { return (barHeight + (i % 3) * (barHeight * 2) - padding);
  })
  .text(function(d) { return d; });
