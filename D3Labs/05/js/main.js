d3.json("data/buildings.json").then((data) => {
    // Parsear los datos
    data.forEach((d) => {
        d.name = d.name;
        d.height = +d.height;
        // Añadir un campo de país para usar en tooltip
        d.country = d.country || "Unknown";
    });
    console.log(data);
    
    // Configuración de márgenes y tamaño mejorados
    var margin = {top: 30, right: 30, bottom: 160, left: 100};
    var width = 700;
    var height = 450;
    
    // Crear SVG con fondo y bordes
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "#f8f9fa")
        .style("border-radius", "8px")
        .style("box-shadow", "0 4px 8px rgba(0,0,0,0.1)");
    
    // Contenedor principal con transformación
    var g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Agregar título principal
    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", "#333")
        .text("Los edificios más altos del mundo");
    
    // Escala X (bandas)
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width]) 
        .paddingInner(0.4)
        .paddingOuter(0.4);
    
    // Escala Y (lineal)
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height) * 1.1]) // Agregar espacio extra arriba
        .range([height, 0]);
    
    // Escala de colores mejorada - usando colores por país
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.country))
        .range(d3.schemeTableau10);
    
    // Añadir líneas de guía horizontales
    g.selectAll("line.horizontalGrid")
        .data(y.ticks(8))
        .enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");
    
    // Dibujar las barras con transición y colores por país
    g.selectAll("rect.bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", height)  // Empezar desde abajo para la animación
        .attr("height", 0)  // Altura inicial 0 para la animación
        .attr("fill", d => color(d.country))
        .attr("stroke", "#333")
        .attr("stroke-width", 0.5)
        .attr("rx", 3)  // Bordes redondeados
        .attr("ry", 3)
        .transition()  // Añadir transición
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.height))
        .attr("height", d => height - y(d.height));
    
    // Añadir etiquetas de altura encima de cada barra
    g.selectAll("text.bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.height) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("fill", "#333")
        .style("opacity", 0)  // Inicialmente invisible
        .text(d => d.height + "m")
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 500)
        .style("opacity", 1);  // Hacerlo visible
    
    // Eje X mejorado
    var xAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("x", -5)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("font-size", "12px");
    
    // Eje Y mejorado
    var yAxis = d3.axisLeft(y)
        .ticks(8)
        .tickFormat(d => d + "m");
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "12px");
    
    // Etiqueta del eje X
    g.append("text")
        .attr("x", width / 2)
        .attr("y", height + 120) 
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#555")
        .text("Nombre del edificio");
    
    // Etiqueta del eje Y
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#555")
        .text("Altura (m)");
    
    // Añadir leyenda para los países
    const countries = [...new Set(data.map(d => d.country))];
    const legend = g.append("g")
        .attr("transform", `translate(${width - 150}, ${height + 70})`);
    
    countries.forEach((country, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);
        
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", color(country));
        
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text(country);
    });
    
    // Añadir interactividad a las barras
    g.selectAll("rect.bar")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(300)
                .attr("opacity", 0.7)
                .attr("stroke-width", 2);
            
            // Mostrar tooltip
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "rgba(0,0,0,0.8)")
                .style("color", "white")
                .style("padding", "10px")
                .style("border-radius", "5px")
                .style("pointer-events", "none")
                .style("opacity", 0);
            
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            
            tooltip.html(`
                <strong>${d.name}</strong><br>
                Altura: ${d.height}m<br>
                País: ${d.country}
            `)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
                .transition()
                .duration(300)
                .attr("opacity", 1)
                .attr("stroke-width", 0.5);
            
            // Ocultar tooltip
            d3.selectAll(".tooltip").remove();
        });
    
}).catch((error) => {
    console.log(error);
    
    // Manejo de errores
    d3.select("body").append("div")
        .style("color", "red")
        .style("padding", "20px")
        .style("font-size", "16px")
        .html(`<strong>Error cargando los datos:</strong> ${error.message}`);
});