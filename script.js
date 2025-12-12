const funcButtons = document.querySelectorAll('.func-btn');
const calculateBtn = document.getElementById('calculateBtn');
const angleInput = document.getElementById('angleInput');
const resultText = document.getElementById('resultText');
const resultValue = document.getElementById('resultValue');
const tableBody = document.getElementById('tableBody');

let currentFunc = 'sin';

const commonAngles = [0, 15, 30, 45, 60, 75, 90];

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateSin(degrees) {
    return Math.sin(toRadians(degrees));
}

function calculateCos(degrees) {
    return Math.cos(toRadians(degrees));
}

function calculateTan(degrees) {
    return Math.tan(toRadians(degrees));
}

function calculateCtg(degrees) {
    const tanValue = calculateTan(degrees);
    return tanValue !== 0 ? 1 / tanValue : Infinity;
}

function formatValue(value) {
    if (value === Infinity || value === -Infinity) return "∞";
    if (Math.abs(value) < 0.0001) return "0";
    return value.toFixed(4);
}

function updateResult() {
    const angle = parseFloat(angleInput.value);
    let value;
    let funcName;
    
    switch(currentFunc) {
        case 'sin':
            value = calculateSin(angle);
            funcName = 'sin';
            break;
        case 'cos':
            value = calculateCos(angle);
            funcName = 'cos';
            break;
        case 'tan':
            value = calculateTan(angle);
            funcName = 'tan';
            break;
        case 'ctg':
            value = calculateCtg(angle);
            funcName = 'ctg';
            break;
    }
    
    resultText.textContent = `${funcName}(${angle}°) =`;
    resultValue.textContent = formatValue(value);
    
    updateTableHighlight(angle);
}

function updateTableHighlight(angle) {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        row.classList.remove('highlight');
        const rowAngle = parseInt(row.cells[0].textContent);
        if (rowAngle === Math.round(angle)) {
            row.classList.add('highlight');
        }
    });
}

function generateTable() {
    tableBody.innerHTML = '';
    
    commonAngles.forEach(angle => {
        const row = document.createElement('tr');
        
        const angleCell = document.createElement('td');
        angleCell.textContent = angle;
        row.appendChild(angleCell);
        
        const sinCell = document.createElement('td');
        sinCell.textContent = formatValue(calculateSin(angle));
        row.appendChild(sinCell);
        
        const cosCell = document.createElement('td');
        cosCell.textContent = formatValue(calculateCos(angle));
        row.appendChild(cosCell);
        
        const tanCell = document.createElement('td');
        tanCell.textContent = formatValue(calculateTan(angle));
        row.appendChild(tanCell);
        
        const ctgCell = document.createElement('td');
        ctgCell.textContent = formatValue(calculateCtg(angle));
        row.appendChild(ctgCell);
        
        tableBody.appendChild(row);
    });
}

funcButtons.forEach(button => {
    button.addEventListener('click', () => {
        funcButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFunc = button.getAttribute('data-func');
        updateResult();
    });
});

calculateBtn.addEventListener('click', updateResult);

angleInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        updateResult();
    }
});

angleInput.addEventListener('change', () => {
    let value = parseFloat(angleInput.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 360) value = 360;
    angleInput.value = value;
    updateResult();
});

generateTable();
updateResult();
