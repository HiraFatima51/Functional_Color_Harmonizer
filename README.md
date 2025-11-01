# Functional_Color_Harmonizer
A single-page JavaScript web app that dynamically calculates and displays color harmonies — including complementary and triadic colors — for any base color selected by the user.

This project follows a purely functional programming approach, using immutable helper functions for all color conversions and logic.
Only the updateColors() function interacts with the DOM for synchronization.

Key Features:

🎨 Real-time color harmony visualization
🧩 Functional JavaScript (no classes or prototypes)
⚙️ Converts HEX → HSL and back to CSS color format
🔄 Automatically updates color panels and labels

Core Functions:

hexToHsl(hex) → Converts HEX to HSL
calculateHarmonies(baseHsl) → Computes complementary + triadic colors
hslToCss(hsl) → Formats HSL into CSS-compatible string
updateColors() → Syncs UI with computed values
