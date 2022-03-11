const board = document.querySelector('#puzzle');
const solver = document.querySelector('#btn-solve');
const squares = 81;

for (let i = 0; i < squares; ++i) {
    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'number');
    inputEl.setAttribute('min', '1');
    inputEl.setAttribute('max', '9');

    board.appendChild(inputEl);
}

const getSubmission = () => {
    const problemInput = document.querySelectorAll('input');
    console.log(problemInput);
    const submission = [];
    problemInput.forEach(cell => {
        const cur = Math.min(9, Math.max(Number(cell.value), 0));
        console.log(cur);
        if (cur) {
            submission.push(cur);
        } else {
            submission.push('.');
        }
    })

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
    console.log(submission);

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

solver.addEventListener('click', getSolution);
