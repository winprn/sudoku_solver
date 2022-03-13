const board = document.querySelector('.main-grid');
const solver = document.querySelector('#btn-solve');
const clearer = document.querySelector('.btn-clear');
const squares = 81;

for (let i = 0; i < squares; ++i) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const inputEl = document.createElement('input');
    inputEl.setAttribute('class', 'cell');
    inputEl.setAttribute('type', 'number');
    inputEl.setAttribute('min', '1');
    inputEl.setAttribute('max', '9');

    if (row === 2 || row === 5) inputEl.style.marginBottom = '10px';
    if (col === 2 || col === 5) inputEl.style.marginRight = '10px';

    board.appendChild(inputEl);
}
const problemInput = document.querySelectorAll('input');

const getSubmission = () => {
    const submission = [];
    for (let i = 0; i < problemInput.length; ++i) {
        console.log(problemInput[i].value);
        const cur = Number(problemInput[i].value);
        if ((Number(cur) <= 0 || Number(cur) > 9) && problemInput[i].value !== '') {
            alert('Wrong input!');
            return [];
        }
        if (cur) {
            submission.push(cur);
        } else {
            submission.push('.');
        }
    }

    return submission;
}

const displaySolution = (data) => {
    const cells = document.querySelectorAll('input');
    if (data.solvable) {
        cells.forEach((cell, idx) => {
            cell.value = data.solution[idx];
        })
    }
}

const getSolution = () => {
    const submission = {numbers: getSubmission().join('')};
    // console.log(submission);

    fetch('http://localhost:3000/get-solution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(submission),
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            displaySolution(data);
        })
        .catch(err => console.log(err))
}

const clearBoard = () => {
    for (let i = 0; i < problemInput.length; ++i) {
        problemInput[i].value = '';
    }
}

solver.addEventListener('click', getSolution);
clearer.addEventListener('click', clearBoard);
