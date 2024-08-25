function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift().element;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Simple Queue implementation
class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
    }

    dequeue() {
        return this.queue.shift(); // Fixed to return the correct element
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

const gridElement = document.getElementById("grid");
const gridSize = 16;
const grid = [];
let startNode = null;
let endNode = null;

// Create the grid and initialize event listeners for each cell
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

// Handle clicks on the grid cells
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

// Get valid neighboring cells for a given node
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

// Reconstruct the path from the end node to the start node
async function reconstructPath(previous) {
    let current = endNode;
    while (current) {
        const { x, y } = current;
        await delay(100);  // Add a 100ms delay between steps
        grid[y][x].classList.add("path");
        current = previous[`${x},${y}`];
    }
}

// Event listeners for Start and Reset buttons
document.getElementById("startBtnDijkis").addEventListener("click", () => {
    if (startNode && endNode) {
        dijkstra();
        document.getElementById("heading").innerHTML="Dijkstra Algorithm";
    }
});


document.getElementById("startBtnBfs").addEventListener("click", () => {
    if (startNode && endNode) {
        bfs();
        document.getElementById("heading").innerHTML="Breadth First Search";
    }
});


document.getElementById("resetBtn").addEventListener("click", () => {
    startNode = null;
    endNode = null;
    gridElement.innerHTML = ""; 
    grid.length = 0; 
    createGrid();
});

// Initialize the grid
createGrid();
