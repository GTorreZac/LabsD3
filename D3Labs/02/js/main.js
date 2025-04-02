var data = [25, 20, 15, 10, 5];

// Añadir más datos para tener más barras
var extendedData = [...data, 18, 22, 12, 8, 15];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400);

// Fondo con gradiente
var defs = svg.append("defs");
var gradient = defs.append("linearGradient")
    .attr("id", "bg-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffecd2");

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#fcb69f");

var rect_background = svg.append("rect") 
    .attr("class", "background")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 500)
    .attr("height", 400)
    .attr("fill", "url(#bg-gradient)")
    .attr("rx", 15)  // Bordes redondeados
    .attr("ry", 15);

// Líneas de guía horizontales
for (let i = 0; i < 5; i++) {
    svg.append("line")
        .attr("x1", 40)
        .attr("y1", 350 - i * 50)
        .attr("x2", 460)
        .attr("y2", 350 - i * 50)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5");
}

// Barras con colores dinámicos
var colorScale = d3.scaleLinear()
    .domain([0, d3.max(extendedData)])
    .range(["#03a9f4", "#ff5722"]);

// Crear una escala para distribuir las barras en el eje X
var xScale = d3.scaleBand()
    .domain(extendedData.map((_, i) => i))
    .range([50, 450])
    .padding(0.3);

// Etiquetas del eje Y
for (let i = 0; i <= 5; i++) {
    svg.append("text")
        .attr("x", 30)
        .attr("y", 355 - i * 50)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(i * 5);
}

// Dibujar las barras
svg.selectAll("rect.bar")
    .data(extendedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => 350 - d * 10)
    .attr("width", xScale.bandwidth())
    .attr("height", d => d * 10)
    .attr("fill", d => colorScale(d))
    .attr("rx", 5)  // Barras con bordes redondeados
    .attr("ry", 5)
    .attr("stroke", "#333")
    .attr("stroke-width", 1);

// Añadir etiquetas de valores en las barras
svg.selectAll("text.bar-label")
    .data(extendedData)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => 345 - d * 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "#333")
    .text(d => d);

// Título del gráfico
svg.append("text")
    .attr("x", 250)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Gráfico de barras mejorado");