async function bfs() {

    const visited={};
    const q = new Queue();

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            visited[`${x},${y}`] = false;
        }
    }
    q.enqueue(startNode);//

    while (!q.isEmpty()) {
        const current = q.dequeue();

        if (current.x === endNode.x && current.y === endNode.y) {
            break;
        }
        if(visited[`${current.x},${current.y}`])
        {
            continue;
        }
        visited[`${current.x},${current.y}`]=true;
        await delay(12);
        grid[current.y][current.x].classList.add("path");
        const neighbors = getNeighbors(current);
        neighbors.forEach(neighbor => {
            const neighborCell = grid[neighbor.y][neighbor.x];
            if (neighborCell.classList.contains("wall")) return;
            if(!visited[`${neighbor.x},${neighbor.y}`])
            {
                q.enqueue(neighbor);
            }
        });
    }
}
