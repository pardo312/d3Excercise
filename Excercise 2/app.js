const canvas = d3.select("#canvas");
const url = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

   
d3.json(url)
.then(data => {
    
    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;
    
    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    
    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear() 
        .domain([0, 120])
        .range([iheight, 0]);

    const x = d3.scaleLinear()
    .domain([0, 42000])
    .range([0, iwidth]);
    
    const r = d3.scaleLinear()
    .domain([0, 2000000000])
    .range([0, iwidth]);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("circle")
    .style("fill", "steelblue")
    .attr("cx", d => x(d.purchasingpower))
    .attr("cy", d => y(d.lifeexpectancy))
    .attr("r", d => r(d.population))

    bars.enter().append("text")
    .attr("x", d => x(d.purchasingpower))
    .attr("y", d => y(d.lifeexpectancy)-r(d.population)-10)
    .text(d => d.country)
    
    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
    }
);

