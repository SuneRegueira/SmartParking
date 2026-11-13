const parkingSpaces = [];
const parkingLot = document.getElementById("parkingLot");

function getOccupancyProbability() {

    const hour = new Date().getHours();

    return 0.03 + 0.97 *
        ((Math.sin((hour - 6) * Math.PI / 12) + 1) / 2);
}

const layout = [];

// Top
layout.push("PPPPPPPPPPPPPPPP");

// Road
layout.push("PGGGGGGGGGGGGGGG");

// Middle (18 rows)
for (let i = 0; i < 18; i++) {
    layout.push("PGPPGPPGPPGPPGPP");
}

// Road
layout.push("PGGGGGGGGGGGGGPP");

// Bottom
layout.push("PPPPPPPPPPPPPPPP");

for (let row = 0; row < layout.length; row++) {

    const tr = document.createElement("tr");

    for (let col = 0; col < layout[row].length; col++) {

        const td = document.createElement("td");

        if (layout[row][col] === "G") {

            td.style.backgroundColor = "lightgray";

        } else {

            const occupied =
                Math.random() < getOccupancyProbability();

            if (occupied) {

                td.style.backgroundColor = "#FF0000";
                td.dataset.status = "occupied";

            } else {

                td.style.backgroundColor = "#0f970f";
                td.dataset.status = "available";

            }

            parkingSpaces.push(td);

            td.addEventListener("click", () => {

                if (td.dataset.status === "available") {

                    td.style.backgroundColor = "#FF0000";
                    td.dataset.status = "occupied";

                } else {

                    td.style.backgroundColor = "#0f970f";
                    td.dataset.status = "available";

                }

                updateDashboard();

            });
        }

        tr.appendChild(td);
    }

    parkingLot.appendChild(tr);
}

function updateDashboard() {

    const total = parkingSpaces.length;

    let occupied = 0;

    parkingSpaces.forEach(space => {

        if (space.dataset.status === "occupied") {
            occupied++;
        }

    });

    const available = total - occupied;

    const occupancy =
        ((occupied / total) * 100).toFixed(1);

    document.getElementById("total").textContent = total;
    document.getElementById("occupied").textContent = occupied;
    document.getElementById("available").textContent = available;
    document.getElementById("occupancy").textContent = occupancy + "%";

    document.getElementById("updated").textContent =
        new Date().toLocaleTimeString();
}

// Første opdatering
updateDashboard();

// Sensor-opdatering hvert minut
setInterval(() => {

    const probability = getOccupancyProbability();

    parkingSpaces.forEach(space => {

        if (Math.random() < probability) {

            space.style.backgroundColor = "#FF0000";
            space.dataset.status = "occupied";

        } else {

            space.style.backgroundColor = "#0f970f";
            space.dataset.status = "available";

        }

    });

    updateDashboard();

}, 60000);