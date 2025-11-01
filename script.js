
// 1. Convert HEX → HSL
const hexToHsl = (hex) => {
  const normalized = String(hex).trim();
  if (!/^#([0-9a-fA-F]{6})$/.test(normalized)) return null;

  const r = parseInt(normalized.slice(1, 3), 16) / 255;
  const g = parseInt(normalized.slice(3, 5), 16) / 255;
  const b = parseInt(normalized.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }

  h = Math.round(((h * 60) + 360) % 360);
  s = Math.round(s * 1000) / 10;
  const light = Math.round(l * 1000) / 10;

  return [h, s, light];
};

// 2. Calculate complementary + triadic harmonies
const calculateHarmonies = (baseHsl) => {
  if (!Array.isArray(baseHsl) || baseHsl.length !== 3) return null;

  const [h, s, l] = baseHsl;
  const rotate = (deg) => ((h + deg) % 360 + 360) % 360;

  return {
    complementary: [rotate(180), s, l],
    triadic1: [rotate(120), s, l],
    triadic2: [rotate(240), s, l]
  };
};

// 3. Convert HSL array → CSS string
const hslToCss = (hsl) =>
  Array.isArray(hsl) && hsl.length === 3
    ? `hsl(${Math.round(hsl[0])}, ${hsl[1]}%, ${hsl[2]}%)`
    : null;

// Helper to display text form
const hslText = (hsl) => hslToCss(hsl) || "";

// STATE SYNCHRONIZATION


const updateColors = () => {
  const hexInput = document.getElementById("hexInput");
  const colorPicker = document.getElementById("colorPicker");
  const errorEl = document.getElementById("error");

  const baseSwatch = document.getElementById("baseSwatch");
  const compSwatch = document.getElementById("compSwatch");
  const tri1Swatch = document.getElementById("tri1Swatch");
  const tri2Swatch = document.getElementById("tri2Swatch");

  const baseMeta = document.getElementById("baseMeta");
  const compMeta = document.getElementById("compMeta");
  const tri1Meta = document.getElementById("tri1Meta");
  const tri2Meta = document.getElementById("tri2Meta");

  const rawHex = String(hexInput.value || "").trim();
  if (!/^#([0-9a-fA-F]{6})$/.test(rawHex)) {
    errorEl.style.display = "block";
    errorEl.textContent = "Please enter a valid 6-digit hex like #1F8FFF.";
    return;
  }
  errorEl.style.display = "none";

  // sync picker
  if (colorPicker.value.toLowerCase() !== rawHex.toLowerCase()) {
    colorPicker.value = rawHex;
  }

  const baseHsl = hexToHsl(rawHex);
  const harmonies = calculateHarmonies(baseHsl);

  const baseCss = hslToCss(baseHsl);
  const compCss = hslToCss(harmonies.complementary);
  const tri1Css = hslToCss(harmonies.triadic1);
  const tri2Css = hslToCss(harmonies.triadic2);

  baseSwatch.style.backgroundColor = baseCss;
  compSwatch.style.backgroundColor = compCss;
  tri1Swatch.style.backgroundColor = tri1Css;
  tri2Swatch.style.backgroundColor = tri2Css;

  baseMeta.textContent = `${rawHex.toUpperCase()} — ${baseCss}`;
  compMeta.textContent = `${hslText(harmonies.complementary)}`;
  tri1Meta.textContent = `${hslText(harmonies.triadic1)}`;
  tri2Meta.textContent = `${hslText(harmonies.triadic2)}`;
};

// EVENT LISTENERS


document.getElementById("colorPicker").addEventListener("input", (e) => {
  document.getElementById("hexInput").value = e.target.value;
  updateColors();
});

document.getElementById("applyBtn").addEventListener("click", updateColors);

document.getElementById("hexInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    updateColors();
  }
});

document.addEventListener("DOMContentLoaded", updateColors);
