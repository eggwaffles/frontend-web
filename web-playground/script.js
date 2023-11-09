document.addEventListener('DOMContentLoaded', function() {
    // Bind the click event to the buttons
    document.getElementById('btnGeneratePalette').onclick = generatePalette;
    document.getElementById('btnDarkenPalette').onclick = function() {
        adjustPaletteLightness(-10);
    };
    document.getElementById('btnLightenPalette').onclick = function() {
        adjustPaletteLightness(10);
    };

    // Generate the initial color palette when the page loads
    generatePalette();
});

// Store the HSL values for each color block
let colorBlocksHSL = [];

function generatePalette() {
    let baseHue = Math.floor(Math.random() * 360);
    let saturation = 50;
    
    for (let i = 1; i <= 4; i++) {
        let hue = (baseHue + (i * 90)) % 360;
        let lightness = (i % 2 === 0) ? 65 : 35;
        colorBlocksHSL[i] = [hue, saturation, lightness];
        let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        document.getElementById('colorBlock' + i).style.backgroundColor = color;
    }

    let backgroundHue = (baseHue + 180) % 360;
    let backgroundLightness = 90;
    document.body.style.backgroundColor = `hsl(${backgroundHue}, ${saturation}%, ${backgroundLightness}%)`;
}

function adjustPaletteLightness(delta) {
    for (let i = 1; i <= 4; i++) {
        colorBlocksHSL[i][2] = Math.max(0, Math.min(100, colorBlocksHSL[i][2] + delta));
        let [hue, saturation, lightness] = colorBlocksHSL[i];
        let newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        document.getElementById('colorBlock' + i).style.backgroundColor = newColor;
    }
}
