var genderData = [ { "gender": "M", "parent": "dad", "total": 19 },
                   { "gender": "F", "parent": "dad", "total": 5 },
                   { "gender": "M", "parent": "mom", "total": 19 },
                   { "gender": "F", "parent": "mom", "total": 12 },
                   { "gender": "M", "parent": "both", "total": 7 },
                   { "gender": "F", "parent": "both", "total": 3 }];

var barHeight = 20;
var maxBarLength = 500;
var padding = 10;
var barsNum = genderData.length;

var width = maxBarLength + (padding * 2);
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
      console.log(barLenScale(d.total));
      return barLenScale(d.total)})
    .attr("x", 0)
    .attr("y", function(d, i) { return (i * (barHeight + padding))})
    .attr("fill", function(d) {
      if (d.gender == "F") {
        return "purple";
      } else {
        return "green";
      }
    });;
