var pctPromise = d3.csv("percentage.csv")
var rawPromise = d3.csv("raw.csv")


/*
pctPromise.then(
function(data)
    {
        
        console.log("works",data);
    },
function(err)
    {
        console.long("ERROR",err);
    })
*/

Promise.all([pctPromise, rawPromise]).then(

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
    

var screen = {width:400, height:400}
var margins = {top:10,right:50,bottom:50,left:50}


var setup = function(data)
{
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    //oh no
    var xScale = d3.scaleBand()
                    .domain([0,4])  //(d3.range(data.length)) //should be the diff beverages- do i put this in manually or select from my dataset
                    .range([0,width])
                    .paddingInner(.05);
    
    
 /*   var xScale = d3.scaleBand()
                    .domain(d3.range(16, 67))
                    .range([0, width]);
    */
    
/*  xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.language))
      .padding(0.4)
    */
    
    var yScale = d3.scaleLinear()
                    .domain([0,160])
                    .range([height,0])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis",true);
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)
    
    drawLegend(dataset, cScale)
    drawArray(dataset,xScale,yScale,cScale,0)
 
}


var drawLegend = function(dataset, cScale)
{
    
    d3.select("svg")
        .append("g")
        .attr("id","legend")
        .attr("transform","translate(" + (screen.width-margins.right)+"," + (margins.top)+")");
    
    var gs = d3.select("#legend")
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("fill",function() //help
                     
                    {
                
                    return cScale(arr,data.Beverages) //help
                    })
                .attr("transform",function()
                     
                    {
                    
                    return "translate(0, "+(i*14)+")";
                    
                    })
    gs.append("rect")
        .attr("width",10)
        .attr("height",10);
    
    gs.append("text")
        .text(function(arr) //help
             
            {
                return //help
            })
        .attr("x",15)
        .attr("y",10)
        .attr("fill","black")
  
}

var drawArray = function(data,xScale,yScale,cScale)
{
    //creates svg element
    var arrays = d3.select("#graph")
        .selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
    
    //
    .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width", 20)
        .attr("height", 100)
    
    arrays.datum(function(obj){return obj.arr})
        

}

var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
