var causes = [
  { "title": "Lilo & Stitch", "cause": "Car accident during rainstorm" },
  { "title": "Bambi, The Fox and the Hound", "cause": "Killed by hunter" },
  { "title": "The Hunchback of Notre Dame", "cause": "Skull cracked on the steps of a cathedral while fleeing from a judge" },
  { "title": "Tarzan", "cause": "Killed by leopard" },
  { "title": "Frozen, The Emperor's New Groove", "cause": "Drowned" },
  { "title": "Finding Nemo", "cause": "Devoured by hungry barracuda" },
  { "title": "Brother Bear", "cause": "Killed by hunter for revenge" },
  { "title": "The Princess and the Frog", "cause": "Died in World War II" },
  { "title": "The Good Dinosaur", "cause": "Died saving child from perishing in a flood" },
  { "title": "The Lion King", "cause": "Murdered by brother for control of the crown" },
  { "title": "Atlantis: The Lost Empire", "cause": "Sacrificed as life energy in attempt to save a city" }
];

var numCauses = causes.length;
console.log(numCauses);


d3.select("#cycle")
  .data(causes)
  .transition()
  .duration(15000)
  .on

// Initiaizing the divs containing text
d3.select("#cycle").selectAll(".cause")
  .data(causes)
  .enter()
  .append("div")
  .classed("cause", true)
  .html(function(d) { return d.cause; })
  .append("div")
  .classed("cause-title", true)
  .html(function(d) { return d.title; });

d3.selectAll(".cause")
  .data(causes)


function cycleText(d, i) {
  var i = ++i % numCauses; // ensures constant loop

  d3.select("#cycle").selectAll(".cause")
    .data(causes)
    .transition
    .style("opacity: 0;")


}
