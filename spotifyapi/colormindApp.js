async function getModels() {
    let url = "http://colormind.io/list/";
    let response = await fetch(url);
    let data = await response.json();
    let models = data.result;
    for (let model of models) {
        let option = document.createElement("option");
        option.innerText = model;
        modelSelect.appendChild(option);
    }
}

async function generatePalette() {
    const mainColor = hexToRgb(mainColorInput.value);
    const input = [
        [mainColor.r, mainColor.g, mainColor.b],
        "N", "N", "N"
    ];
    const model = modelSelect.value;
    const url = `http://colormind.io/api/`;
    const data = {
        model: model,
        input: input,
    };
    const request = {
        headers: {},
        method: 'POST',
        body: JSON.stringify(data),
    };
    const response = await fetch(url, request).catch(err => console.error(err));

    const jsonData = await response.json();
    console.log(jsonData);

    showPalette(jsonData.result);
    console.log(response);
}

function showPalette(colors) {
    paletteMain.innerHTML = "";
    for (let color of colors) {
        let div = document.createElement("div");
        let [r, g, b] = color;
        div.innerHTML = color.join(",");
        div.style.backgroundColor = `rgb(${r},${g},${b})`;
        paletteMain.appendChild(div);
    }
}

// Auxiliary functions

function hexToRgb(hex) {
    // Remove the hash (#) if it's at the beginning of the hex value
    hex = hex.replace(/^#/, '');

    // Parse the hex value into separate RGB components
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return { r, g, b };
}


// Initialization
getModels();

// Event handler for the generate button
generateButton.onclick = () => generatePalette();
