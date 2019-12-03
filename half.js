var pctPromise = d3.csv("percentage.csv")
var rawPromise = d3.csv("raw.csv")



pctPromise.then(
function(data)
    {
      //  drawLegend(data);
        setup(data);
       // drawBar(data);
        console.log("works",data);
    },
function(err)
    {
        console.long("ERROR",err);
    });

/*rawPromise.then(
function(dataTwo)
    {
        console.log("works",dataTwo);
    },
  function(err)
    {
        console.log("ERROR",err);
    }); */

/*Promise.all([pctPromise, rawPromise]).then(

function(data)
    {
       // setup(data)
      //  drawLegend(data)
       // drawArray(data)
        console.log("works",data);
       
    },
function(err)
    {
        console.log("ERROR",err);
    })
   
*/

var setup = function(data)
{
   
    var screen = {width: 800, height: 500}
   
    var margins = {top: 50, bottom: 35, left: 50, right: 25}
   
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
   
    var xScale = d3.scaleLinear()
                    .domain([0,20])
                    .range([0, width])
   
     var xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function(d) {return (d.Beverage)}))
      .padding(0.4)
     
    var yScale = d3.scaleLinear()
                    .domain([0,100])
                    .range([height,0])
 
   
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
   
    //axis
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
   
    var svg = d3.select("body")
    .append("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);
   
    svg.append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
   
    svg.append("text")
    .attr("transform", "translate("+ (width/2)+","+(height+margins.top+30)+")")
    .style("text-anchor", "middle")
    .text("Drinks")
   
    svg.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(35,"+margins.top+")")
    .call(yAxis);
   
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", (margins.left-55))
      .attr("x", 0-(height / 2))
     .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage");  
   

   






       
  //  var svg = d3.select("body")
//bars 1 calories, hopefully
  svg.append("g")
    .attr("id", "bar1")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    console.log("please work",data);
   
    d3.select("#bar1")
    .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return i*165
          +95
       ;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      {
        console.log("parse",parseInt(d.Calories));
        console.log("normal", d.Calories);
        return height - d.Calories;})
    .attr("width", 40)
    .attr("height", function (d)
         {
        //console.log(parseInt(d.Calories));
       
        return  d.Calories;})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Calories*20;})
    .attr("fill", "teal")
    .style("opacity", .50)
   
   
   
  //bars two fat  
     svg.append("g")
    .attr("id", "bar2")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    console.log(height, data);
   
 
    d3.select("#bar2")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*165 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      { return height - (d.Fat);})
    .attr("width", 40)
    .attr("height", function(d)
         { return d.Fat;})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "red")
    .style("opacity", 1)
   
    //bar 3 sodium  
     svg.append("g")
    .attr("id", "bar3")
    .attr("transform", "translate("+margins.left+","+margins.top+")");

    d3.select("#bar3")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*165 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      { return height - (d.Sodium);})
    .attr("width", 40)
    .attr("height", function(d)
         {
        console.log(d.Sodium);
        return (d.Sodium);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "blue")
    //.style("opacity", .1)
   
       //bar 4 carb  
     svg.append("g")
    .attr("id", "bar4")
    .attr("transform", "translate("+margins.left+","+margins.top+")");

    d3.select("#bar4")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*165 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      { return height - (d.Carbohydrate);})
    .attr("width", 40)
    .attr("height", function(d)
         {  return (d.Carbohydrate);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "yellow")
    .style("opacity", .25)
   
    //bar 5 sugar
   
      svg.append("g")
    .attr("id", "bar5")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
   
     d3.select("#bar5")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*165 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      { return height - (d.Sugar);})
    .attr("width", 40)
    .attr("height", function(d)
         {  return (d.Sugar);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "green")
    .style("opacity", .25)
   
   
     //bar 5 caffeine
   
      svg.append("g")
    .attr("id", "bar6")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
   
     d3.select("#bar6")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*165 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out
    .attr("y", function (d)
      {
         console.log("height",height)
         console.log("work pretty please", d.Caffeine);
         return height - (d.Caffeine);})
    .attr("width", 40)
    .attr("height", function(d)
         {  return (d.Caffeine);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.run*20;})
    .attr("fill", "black")
    .style("opacity", .25)
   

var drawLegend = function(data)
{
 
  var width = 200;
  var height = 200;
  var boxWidth = 40;
   
  d3.select("svg")
    .append("g")
    .attr("id","legend")
   .attr("width", width)
    .attr("height", height)
   // .attr("transform","translate(" +(screen.width-margins.right)+"," + (margins.top)+")");

var gs = d3.select("#legend")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("fill",function(d)
         { return cScale(d.Beverage);})
    .attr("transform",function(d,i)
   
    {
          return "translate(700,"+(i*15)+")"; //changing # will space each individual rect + text more
    })
  .attr("width", boxWidth)
    .attr("height", boxWidth-3)
   
   
gs.append("rect")
    .attr("width",10) //size of rectangles
    .attr("height",10)
   

gs.append("text")
    .text(function(d)
         { return d.Beverage })
    .attr("x",15)
    .attr("y",10)
    //.attr("fill",black)
   
}

 drawLegend(data)  

}

//setup(dataOne)
