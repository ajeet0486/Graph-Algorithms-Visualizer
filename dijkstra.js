// Dijkstra's algorithm implementation using a priority queue
async function dijkstra() {
    const distances = {};
    const pq = new PriorityQueue();
    const previous = {};

    // Initialize distances and previous nodes
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            distances[`${x},${y}`] = Infinity;
            previous[`${x},${y}`] = null;
        }
    }

    distances[`${startNode.x},${startNode.y}`] = 0;
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
        const current = pq.dequeue();

        // If we reached the end node, reconstruct the path
        if (current.x === endNode.x && current.y === endNode.y) {
            await reconstructPath(previous);
            return;
        }

        const neighbors = getNeighbors(current);
        neighbors.forEach(neighbor => {
            const neighborCell = grid[neighbor.y][neighbor.x];
            if (neighborCell.classList.contains("wall")) return;

            const alt = distances[`${current.x},${current.y}`] + 1;

            if (alt < distances[`${neighbor.x},${neighbor.y}`]) {
                distances[`${neighbor.x},${neighbor.y}`] = alt;
                previous[`${neighbor.x},${neighbor.y}`] = current;
                pq.enqueue(neighbor, alt);
            }
        });
    }
}
