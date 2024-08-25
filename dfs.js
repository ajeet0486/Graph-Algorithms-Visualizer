async function dfs() {
    const visited = {};
    let stack = [];

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            visited[`${x},${y}`] = false;
        }
    }
    
    stack.push(startNode);

    while (stack.length > 0) {
        const current = stack.pop();

        if (!visited[`${current.x},${current.y}`]) {
            visited[`${current.x},${current.y}`] = true;
            await delay(12);
            grid[current.y][current.x].classList.add("path");

            if (current.x === endNode.x && current.y === endNode.y) {
                break;
            }

            const neighbors = getNeighbors(current);
            for (let i = neighbors.length - 1; i >= 0; i--) { 
                const neighbor = neighbors[i];
                if (!visited[`${neighbor.x},${neighbor.y}`]) {
                    stack.push(neighbor);
                }
            }
        }
    }
}
