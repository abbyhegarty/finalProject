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

function(values)
    {
        console.log("works",values);
        
    },
function(err)
    {
        console.log("ERROR",err);
    })

