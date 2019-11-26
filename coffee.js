var coffeePromise = d3.csv("percentage.csv")

coffeePromise.then(
function(data)
    {
        
        console.log("works",data);
    },
function(err)
    {
        console.long("ERROR",err);
    })