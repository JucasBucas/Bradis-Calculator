const funcButtons = document.querySelectorAll('.func-btn');
const calculateBtn = document.getElementById('calculateBtn');
const angleInput = document.getElementById('angleInput');
const resultText = document.getElementById('resultText');
const resultValue = document.getElementById('resultValue');

let currentFunc = 'sin';

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

updateResult();
