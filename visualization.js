
var margin = { top: 30, left: 30, right: 30, bottom: 0 },
   height = 800 - margin.top - margin.bottom,
   width = 800 - margin.left - margin.right;

var svg = d3.select("#map")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var missouri = d3.map()
//var republican
//var dem

var republican = d3.map()
var democrat = d3.map()

var color = d3.scaleOrdinal()
    .range(["blue", "red"])


var projection = d3.geoAlbersUsa()
  .translate([width / 7, height / 6])


var path = d3.geoPath()
  .projection(projection)

 var tooltip = d3.select("body").append("div") 
        .attr("class", "tooltip")       
        .style("opacity", 0)


d3.queue()
  .defer(d3.json, "missouri_TopoExport.json")
  .defer(d3.csv, "MO_National_Voting_Results_1976-percentages.csv", function(d) {republican.set(d.County, +d.Ford_R), democrat.set(d.County, +d.Carter_D); })
  .await(ready)



function ready (error, json, datapoints) {

  var counties = topojson.feature(json, {
      type: "GeometryCollection",
      geometries: json.objects.missouri_export.geometries

  })

  projection.fitSize([width, height], counties)

  svg.selectAll(".county")
      .data(counties.features)
      .enter().append("path")
      .attr("class", "county")
      .attr("d", path)
      .style('stroke', 'white')
      .style("fill", function(d) {
        console.log(counties.features[0].properties.countyname)
          if (+republican.get(d.properties.countyname) > +democrat.get(d.properties.countyname)) {
              //console.log(+republican.get(d.properties.countyname))
              return 'red' 
            }
            else  if (+democrat.get(d.properties.countyname) > +republican.get(d.properties.countyname)) {
          return 'blue'
        }
        else {
          return 'light grey'
        }
     })
      .on('mouseover', function(d) {
      tooltip.transition()   
        .style("opacity", .9); 
        console.log(d.properties.countyname)   
      tooltip.html('County: ' + d.properties.countyname + '<br>' + 'Ford: ' + republican.get(d.properties.countyname) + '%' + '<br>' + 'Carter: ' + democrat.get(d.properties.countyname) + '%')  
        .style("left", (d3.event.pageX) + "px")   
        .style("top", (d3.event.pageY - 28) + "px")
        .attr("id", "tooltip")
      d3.select(this)
        .transition()
        .duration(500)
        // .attr('class', 'hoverin')
        .style('stroke-width', 2)
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
        .duration(500)
        .style('stroke-width', 0)
      tooltip.transition()
        .duration(300)       
        .style("opacity", 0)
    })





// tooltip.html('County: ' + d.properties.countyname + '<br>' + 'Ford: ' + republican.get(d.properties.countyname) + '%' + '<br>' + 'Carter: ' + democrat.get(d.properties.countyname) + '%')  

      // .attr('fill', function(d) {
      //  if ((d.properties.Ford_R / (d.properties.Carter_D + d.properties.Ford_R + d.properties.Other) > (d.properties.Carter_D / (d.properties.Carter_D + d.properties.Ford_R + d.properties.Other)) {
      //    return 'red' 
      //  }
      //  else {
      //    return 'blue'
      //  }





//returns county name from the topojson data
//console.log(counties.features[0].properties.countyname)


//returns county name from the csv data 
   //console.log(datapoints[1].County)















 // var datapoints ("MO_National_Voting_Results_1976-percentages.csv", function)

  // svg.selectAll(".county")
  //     .data(datapoints)
  //     .attr("class", "county")


//       .attr('fill', d => {
//       if (!d.Carter_D) {
//         // console.log(d.properties)
//         return '#e6e6e6'
//       } else {
//         let percent =
//           d.properties.trump / (d.properties.clinton + d.properties.trump)
//         return colorScale(percent)
//       }
//     })
//     .attr('opacity', d => {
//       if (d.properties.state) {
//         let totalVote = d.properties.clinton + d.properties.trump
//         // console.log(totalVote)
//         return transparencyScale(totalVote)
//       }
//       return 1
//     })
// }

  // var states = topojson.feature(data, data.objects.us_states)
  // //console.log(data.objects.us_states)


  //   svg.selectAll(".state")
  //     .data(states.features)
  //     .enter().append("path")
  //     .attr("class", "state")
  //     .attr("d", path)
  

   }
  



