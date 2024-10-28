let gridCount = 16;

function createGrids() {
    const gridContainer = document.querySelector('.grid-container');
    const boxRect = gridContainer.getBoundingClientRect();
    const gridSizeText = document.getElementById("grid-size");
    gridSizeText.textContent = `${gridCount}x${gridCount}`;
    for (let i = 0; i < gridCount; i++) {
        for (let j = 0; j < gridCount; j++) {
            let grid = document.createElement('div');
            grid.classList.add('grid');
            grid.style.width = `${((boxRect.width - (4 * gridCount))) / gridCount}px`; //with 2 x 2 border width px
            grid.style.height = `${(boxRect.height - (4 * gridCount)) / gridCount}px`;
            grid.addEventListener("mouseover", function () { changeGridBackground(grid); }, false);
            gridContainer.appendChild(grid);
        }
    }
}

function destroyGrid() {
    const gridContainer = document.querySelector('.grid-container');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function resetGrid() {
    destroyGrid();
    createGrids();
}

function changeGridSize() {
    let changedGridSize = 0;
    changedGridSize = prompt("Number of squares per side? (between 2 and 100)", `${gridCount}`);
    if (!isNaN(changedGridSize) || changedGridSize < 2 || changedGridSize > 100) {
        gridCount = changedGridSize;
        resetGrid();
    }
}

function changeGridBackground(grid) {
    const r = Math.floor(Math.random() * 256); // Red value
    const g = Math.floor(Math.random() * 256); // Green value
    const b = Math.floor(Math.random() * 256);
    grid.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

createGrids();