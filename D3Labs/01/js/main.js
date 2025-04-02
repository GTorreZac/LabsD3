// Crear el SVG con dimensiones mejoradas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 450)
    .style("background-color", "#f5f5f5");  // Añadir fondo gris claro

// Añadir el techo de la casa
var triangle = svg.append("path")
    .attr("d", "M80,180 L180,120 L280,180 Z")
    .attr("fill", "#8B4513");  // Color marrón para el techo

// Rectángulo principal (casa)
var rect_1 = svg.append("rect")
    .attr("x", 100)
    .attr("y", 180)
    .attr("width", 160)
    .attr("height", 120)
    .attr("fill", "#FF8C00")  // Naranja más cálido
    .attr("stroke", "#663300")  // Borde marrón
    .attr("stroke-width", 2);

// Puerta
var rect_2 = svg.append("rect")
    .attr("x", 150)
    .attr("y", 235)
    .attr("width", 30)
    .attr("height", 65)
    .attr("fill", "#8B4513")  // Marrón para la puerta
    .attr("stroke", "#663300")
    .attr("stroke-width", 1);

// Pomo de la puerta
var doorknob = svg.append("circle")
    .attr("cx", 172)
    .attr("cy", 265)
    .attr("r", 3)
    .attr("fill", "#FFD700");  // Dorado para el pomo

// Ventanas (ahora con marco)
function createWindow(x, y) {
    // Marco de la ventana
    svg.append("rect")
        .attr("x", x - 2)
        .attr("y", y - 2)
        .attr("width", 34)
        .attr("height", 34)
        .attr("fill", "#8B4513");
    
    // Ventana con dos paneles
    svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 15)
        .attr("height", 30)
        .attr("fill", "#ADD8E6");
    
    svg.append("rect")
        .attr("x", x + 15)
        .attr("y", y)
        .attr("width", 15)
        .attr("height", 30)
        .attr("fill", "#ADD8E6");
}

// Crear dos ventanas
createWindow(120, 195);
createWindow(210, 195);

// Sol
var sun = svg.append("circle")
    .attr("cx", 400)
    .attr("cy", 80)
    .attr("r", 40)
    .attr("fill", "#FFD700");

// Rayos de sol
for (let i = 0; i < 8; i++) {
    let angle = (i * Math.PI) / 4;
    let x1 = 400 + Math.cos(angle) * 40;
    let y1 = 80 + Math.sin(angle) * 40;
    let x2 = 400 + Math.cos(angle) * 60;
    let y2 = 80 + Math.sin(angle) * 60;
    
    svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "#FFD700")
        .attr("stroke-width", 3);
}

// Césped
svg.append("rect")
    .attr("x", 0)
    .attr("y", 300)
    .attr("width", 500)
    .attr("height", 150)
    .attr("fill", "#7CFC00");