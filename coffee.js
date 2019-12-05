var pctPromise = d3.csv("percentage.csv")
var rawPromise = d3.csv("raw.csv")


pctPromise.then(
function(data)
    {
        setup(data);
      
        drawLegend(data);
        makeButton(data);
        console.log("Pworks",data);
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

var screen = {width: 800, height: 500}
//var margins = {top: 50, bottom: 35, left: 50, right: 25}
  

var setup = function(data)
{
    
    var margins = {top: 50, bottom: 35, left: 55, right: 50}
    
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
                    .domain([0,160])
                    //.domain([0, d3.max(data, function(d) {return d[1];})])
                    .range([height,0])
                   // .tick
                  //  .nice()
 
    
    var cScale = d3.scaleOrdinal(d3.schemeSet1)
    
    //axis
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
                  //  .ticks(5)
                  // .tickValues([0,50,100,150,200])
    
var svg = d3.select("#graph")
    .append("svg")
    .attr("id","graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    svg.append("text")
    .attr("transform", "translate(400,"+(height+margins.top+32)+")")
    .style("text-anchor", "middle")
    .text("Drinks")
    
    svg.append("g")
    .attr("id","yAxis")
    .attr("transform","translate(50,"+margins.top+")")
    //.attr("height",500px)
    .call(yAxis);
    
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", (margins.left-55))
      .attr("x", 0-(height / 2))
     .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage of Daily Recommendation");  
    
drawBar(data,xScale,yScale,cScale);
    
}


var drawBar = function(data,xScale,yScale,cScale)
{
  
var margins = {top: 50, bottom: 35, left: 50, right: 25}
    
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    var svg = d3.select("#graph1")
    
    var cScale = d3.scaleOrdinal(d3.schemeSet1)
    
//bars 1 calories, hopefully
    
  //  d3.select("#graph")
  svg.append("g")
    .attr("id", "bar1")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    console.log("please work",data);
    
   var bar1 = d3.select("#bar1")
    .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")

     .attr("x", function(d,i)
      { return i*158
          +95
       ;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
  /*  .attr("y", function (d)
      { 
        console.log("pls be height", height)
       // console.log("parse",parseInt(d.Calories));
        console.log("normal", d.Calories);
        return height - (d.Calories);}) */
    .attr("height",function(d)
          {
          
      //  return height - (d.Calories);
        return height -(yScale(d.Calories));
          })
    .attr("width", 40)
    .attr("y", function (d) 
         { 
        //console.log(parseInt(d.Calories));
        return  yScale(d.Calories);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Calories*20;})
    .attr("fill", "#377eb8") 
    .style("opacity", .7)
    
   .append("title")
   .text(function(d) {return d.Calories;})
   
    .on("mouseover", function(d) 
        {
      d3.select("#tooltip")
        
        .style("left", (d3.event.pageX + 20) + "px")
        .style("top", (d3.event.pageY) + "py")
       // .select("#name")
        g.append("text")
        
        .append("text")
        console.log(d.Calories)
        .text(function(d){ return "work" + d.Calorie})
      d3.select("#tooltip").classed("hidden",false)
    })
    .on("mouseout", function()
       {
        d3.select("#tooltip")
        .classed("hidden",true)
    })
    
  
    
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
      { return i*158 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("height", function (d)
      { return height - yScale(d.Fat);})
    .attr("width", 40)
    .attr("y", function(d)
         { return yScale(d.Fat);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Fat*20;})
    .attr("fill", "#e41a1c")
    .style("opacity", .3)
    
    
    
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
      { return i*158 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("height", function (d)
      { return height - yScale(d.Sodium);})
    .attr("width", 40)
    .attr("y", function(d)
         { 
        console.log(d.Sodium);
        return yScale(d.Sodium);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Sodium*20;})
    .attr("fill", "#4daf4a")
    .style("opacity", 1)
    
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
      { return i*158 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("height", function (d)
      { return height - yScale(d.Carbohydrate);})
    .attr("width", 40)
    .attr("y", function(d)
         {  return yScale(d.Carbohydrate);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Carbohydrate*20;})
    .attr("fill", "#984ea3")
    .style("opacity", .5)
    
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
      { return i*158 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("height", function (d)
      { return height - yScale(d.Sugar);})
    .attr("width", 40)
    .attr("y", function(d)
         {  return yScale(d.Sugar);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Sugar*20;})
    .attr("fill", "#ffff33")
   .style("opacity", .4)
    
    
     //bar 6 caffeine
    
      svg.append("g")
    .attr("id", "bar6")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
     d3.select("#bar6")
    .selectAll("rect")
     .data(data)
     .enter()
    .append("rect")
     .attr("x", function(d,i)
      { return i*158 +95;}) //more than 20, match to my x scale or whatev, 70 to space, 40 moves it out 
    .attr("height", function (d)
      { 
         console.log("work pretty please", d.Caffeine);
         return height - yScale(d.Caffeine);})
    .attr("width", 40)
    .attr("y", function(d)
         {  return yScale(d.Caffeine);})
   // .attr("width", barWidth)
  //  .attr("height", function(d)
   //   { return d.Caffeine*20;})
    .attr("fill", "#188FA7")
    .style("opacity", .5) 
    
    
}

  

var drawLegend = function(data, cScale)
{
  
    
 //works, 
    
 var dataset = [{name: "Calories", color: "#76A5CE"},
               {name: "Fat", color: "#FAC1BE"}, 
               {name: "Sodium", color: "#4daf4a"}, 
               {name: "Carbohydrate", color: "#CDA8D2"}, 
               {name: "Sugar", color: "#FEFFB8"},
               {name: "Caffeine", color: "#96C8D4"} ] 
    
  var width = 600;
  var height = 400;
  var boxWidth = 100; 
    
   var cScale = d3.scaleOrdinal(d3.schemeSet1) 
    
  d3.select("svg")
    .append("g")
    .attr("id","legend")
   .attr("width", width)
    .attr("height", height)
    .attr("transform" , "translate(-60,20)") //where the whole legend is located
  // .attr("transform","translate("+(screen.width-margins.right)+","+(margins.top)+")"); 

var gs = d3.select("#legend")
    .selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("fill",function(d)
         { return (d.color);})
    .attr("transform",function(d,i)
    
    {
          return "translate(700,"+(i*15)+")"; //changing # will space each individual rect + text more
    })
 // .attr("width", boxWidth)
 //   .attr("height", boxWidth-3)
    
    
gs.append("rect")
    .attr("width",15) //size of rectangles
    .attr("height",12)
   

gs.append("text")
    .text(function(d)
         { return d.name})
    .attr("x",15)
    .attr("y",10)
   .attr("fill", "black")
         
         //function(d)
     //    { return (d.color);})
}

var makeButton = function(data)
{
//#allButton is a div, creating a button w/ id of Calories inside a div
    // calorie button 1
    d3.select("#allButton")
    .append("button")
    .attr("id","Calories")
    .text("Calories")
    .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar1").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar1")
            .style("opacity", currentOpacity == 1 ? 0:1)
                  
        
    //   .exit()
     //  .remove() 
        
       // currentOpacity = d3.selectAll("."+d).style("opacity")
       // d3.selectAll(".", + d).transition().style("opacity", currentOpacity == 1 ? 0:1)
        
    })
    
    //fat button 2
     d3.select("#allButton")
    .append("button")
    .attr("id","Fat")
    .text("Fat")
    /*.on("click", function()
        {
        
        d3.selectAll("#graph")
            .selectAll("#bar2")
       
        .remove()
    }) */
     .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar2").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar2")
            .style("opacity", currentOpacity == 1 ? 0:1)
     })
    
    //sodium button 3
     d3.select("#allButton")
    .append("button")
    .attr("id","Sodium")
    .text("Sodium")
  /*  .on("click", function()
        {
        
        d3.selectAll("#graph")
            .selectAll("#bar3")
       
        .remove()
    }) */
    .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar3").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar3")
            .style("opacity", currentOpacity == 1 ? 0:1)
     })
    
    
    
    //carbohydrate button 4
     d3.select("#allButton")
    .append("button")
    .attr("id","Carbohydrate")
    .text("Carbohydrate")
   /* .on("click", function()
        {
        
        d3.selectAll("#graph")
            .selectAll("#bar4")
       
        .remove()
    }) */
    
    .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar4").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar4")
            .style("opacity", currentOpacity == 1 ? 0:1)
     })
    
    //sugar button 5
     d3.select("#allButton")
    .append("button")
    .attr("id","Sugar")
    .text("Sugar")
   /* .on("click", function()
        {
        
        d3.selectAll("#graph")
            .selectAll("#bar5")
       
        .remove()
    }) */
    .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar5").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar5")
            .style("opacity", currentOpacity == 1 ? 0:1)
     })
    
    
    //caffeine button 6
     d3.select("#allButton")
    .append("button")
    .attr("id","Caffeine")
    .text("Caffeine")
   /* .on("click", function()
        {
        
        d3.selectAll("#graph")
            .selectAll("#bar6")
       
        .remove()
    }) */
    
    .on("click", function()
        {
        
        var currentOpacity = d3.selectAll("#bar6").style("opacity")
     d3.selectAll("#graph")
            .selectAll("#bar6")
            .style("opacity", currentOpacity == 1 ? 0:1)
     })
} //end of makebutton var



// drawLegend(data)  



//setup(dataOne)
