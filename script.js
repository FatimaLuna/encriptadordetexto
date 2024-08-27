function processText(isEncrypting) {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');

    if (!inputText) {
        alert("Por favor, ingresa algún texto.");
        clearOutput();
        return;
    }

    if (!/^[a-z\s]*$/.test(inputText)) {
        alert("Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales.");
        clearOutput();
        return;
    }

    const rules = [
        { find: 'e', replace: 'enter' },
        { find: 'i', replace: 'imes' },
        { find: 'a', replace: 'ai' },
        { find: 'o', replace: 'ober' },
        { find: 'u', replace: 'ufat' }
    ];

    let processedText = inputText;

    rules.forEach(rule => {
        const pattern = isEncrypting ? new RegExp(rule.find, 'g') : new RegExp(rule.replace, 'g');
        const replacement = isEncrypting ? rule.replace : rule.find;
        processedText = processedText.replace(pattern, replacement);
    });

    outputText.value = processedText;
    toggleOutputBackground();
}

function encryptText() {
    processText(true);
}

function decryptText() {
    processText(false);
}

function copyText() {
    const outputText = document.getElementById('outputText').value;
    if (!outputText) {
        alert("No hay texto para copiar.");
        return;
    }

    navigator.clipboard.writeText(outputText).then(() => {
        alert("Texto copiado al portapapeles");
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
}

document.getElementById('inputText').addEventListener('input', () => {
    if (document.getElementById('inputText').value === "") {
        clearOutput();
    }
});

function clearOutput() {
    document.getElementById('outputText').value = "";
    toggleOutputBackground();
}

document.addEventListener('DOMContentLoaded', () => {
    toggleOutputBackground();
});

function toggleOutputBackground() {
    const outputText = document.getElementById('outputText');
    const backgroundImage = document.getElementById('backgroundImage');
    if (outputText.value.trim() !== "") {
        backgroundImage.style.display = "none";
    } else {
        backgroundImage.style.display = "block";
    }
}
