// STRING to INTEGER
d3.json("data/buildings.json").then((data) => {
    data.forEach((d) => {
        d.height = +d.height; 
    });

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // Band Scale
    var x = d3.scaleBand()
        .domain(data.map(d => d.name)) 
        .range([40, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // Linear Scale
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height)]) 
        .range([400, 0]);
    
    var color = d3.scaleOrdinal(d3.schemeSet3);

    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.name)) 
        .attr("y", d => y(d.height)) 
        .attr("width", x.bandwidth()) 
        .attr("height", d => 400 - y(d.height)) 
        .attr("fill", (d, i) => color(d.name)); 

    
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => x(d.name) + x.bandwidth() / 2) 
        .attr("y", 420) 
        .attr("fill", "black")

    
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    svg.append("g")
        .attr("transform", "translate(0,400)") 
        .call(xAxis)
        .selectAll("text") 
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("transform", "translate(40,0)") 
        .call(yAxis);
});