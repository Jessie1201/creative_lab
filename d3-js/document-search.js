import * as d3 from "d3";
import * as dat from 'dat.gui';
import autoBox from "./utils";

const data = {
    "name": "Eve",
    "children": [{
            "name": "Cain"
        },
        {
            "name": "Seth",
            "children": [{
                    "name": "Enos"
                },
                {
                    "name": "Noam"
                }
            ]
        },
        {
            "name": "Abel"
        },
        {
            "name": "Awan",
            "children": [{
                "name": "Enoch"
            }]
        },
        {
            "name": "Azura"
        }
    ]
};

const createDiagram = () => {
    const width = 975;
    const radius = width / 2
    const tree = d3.cluster().size([2 * Math.PI, radius - 100]);
    const root = tree(d3.hierarchy(data));
    const svg = d3.create("svg");

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    // dots indicator
    svg.append("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
    `)
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    // text
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("transform", d => `
      rotate(${d.x * 180 / Math.PI - 90}) 
      translate(${d.y},0) 
      rotate(${d.x >= Math.PI ? 180 : 0})
    `)
        .attr("dy", "0.31em")
        .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke", "white");

    return svg.attr("viewBox", autoBox).node();
}

// ---------- Attach diagram ------------ //
document.body.appendChild(createDiagram());

// -------------- Debug ----------------- //
const gui = new dat.GUI();
gui.add(window, 'innerWidth');