const gridElement = document.getElementById("grid");
const gridSize = 30;
const grid = [];
let startNode = null;
let endNode = null;

function createGrid() {
    for (let y = 0; y < gridSize; y++) {
        const row = [];
        for (let x = 0; x < gridSize; x++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener("click", () => handleCellClick(cell));
            gridElement.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}

function handleCellClick(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    if (!startNode) {
        startNode = { x, y };
        cell.classList.add("start");
    } else if (!endNode) {
        endNode = { x, y };
        cell.classList.add("end");
    } else {
        cell.classList.toggle("wall");
    }
}

function getNeighbors(node) {
    const neighbors = [];
    const directions = [
        { x: 0, y: 1 },   // down
        { x: 1, y: 0 },   // right
        { x: 0, y: -1 },  // up
        { x: -1, y: 0 },  // left
    ];

    directions.forEach(({ x: dx, y: dy }) => {
        const newX = node.x + dx;
        const newY = node.y + dy;
        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
            neighbors.push({ x: newX, y: newY });
        }
    });
    return neighbors;
}

function dijkstra() {
    const unvisited = new Set();
    const distances = {};
    const previous = {};

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const node = { x, y };
            distances[`${x},${y}`] = Infinity;
            previous[`${x},${y}`] = null;
            unvisited.add(node);
        }
    }

    distances[`${startNode.x},${startNode.y}`] = 0;

    while (unvisited.size > 0) {
        const current = Array.from(unvisited).reduce((minNode, node) => {
            if (distances[`${node.x},${node.y}`] < distances[`${minNode.x},${minNode.y}`]) {
                return node;
            }
            return minNode;
        });

        if (current.x === endNode.x && current.y === endNode.y) {
            reconstructPath(previous);
            return;
        }

        unvisited.delete(current);

        const neighbors = getNeighbors(current);
        neighbors.forEach(neighbor => {
            const neighborCell = grid[neighbor.y][neighbor.x];
            if (neighborCell.classList.contains("wall")) return;

            const alt = distances[`${current.x},${current.y}`] + 1;
            if (alt < distances[`${neighbor.x},${neighbor.y}`]) {
                distances[`${neighbor.x},${neighbor.y}`] = alt;
                previous[`${neighbor.x},${neighbor.y}`] = current;
            }
        });
    }
}

function reconstructPath(previous) {
    let current = endNode;
    while (current) {
        const { x, y } = current;
        grid[y][x].classList.add("path");
        current = previous[`${x},${y}`];
    }
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (startNode && endNode) {
        dijkstra();
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    startNode = null;
    endNode = null;
    gridElement.innerHTML = "";
    createGrid();
});

// Initialize the grid
createGrid();
