import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RESET = '\x1b[0m';
const WHEEL = [
    '#FF0000', '#FF8000', '#FFFF00', '#80FF00',
    '#00C853', '#00FFB3', '#00FFFF', '#0080FF',
    '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
];
const POSITIONS = [
    [0, 6], [1, 9], [2, 11], [3, 12], [4, 11], [5, 9],
    [6, 6], [5, 3], [4, 1], [3, 0], [2, 1], [1, 3],
];

function parseHex(hex) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`Couleur RGB invalide : ${hex}`);
    return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
}

function hue(hex) {
    const [red, green, blue] = parseHex(hex).map((value) => value / 255);
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    if (delta === 0) return 0;
    if (max === red) return 60 * (((green - blue) / delta) % 6 + 6) % 360;
    if (max === green) return 60 * ((blue - red) / delta + 2);
    return 60 * ((red - green) / delta + 4);
}

function foreground(hex, text) {
    const [red, green, blue] = parseHex(hex);
    return `\x1b[38;2;${red};${green};${blue}m${text}${RESET}`;
}

function background(hex, text) {
    const [red, green, blue] = parseHex(hex);
    const ink = red * 0.299 + green * 0.587 + blue * 0.114 > 150 ? '0;0;0' : '255;255;255';
    return `\x1b[48;2;${red};${green};${blue}m\x1b[38;2;${ink}m${text}${RESET}`;
}

function renderScheme(scheme, number) {
    const selected = [
        ['D', scheme.dominant],
        ['S', scheme.secondary],
        ['A', scheme.accent],
    ];
    const markers = new Map();

    for (const [label, color] of selected) {
        const index = Math.round(hue(color) / 30) % 12;
        const marker = markers.get(index) ?? { labels: [], color };
        marker.labels.push(label);
        markers.set(index, marker);
    }

    const grid = Array.from({ length: 7 }, () => Array(13).fill('  '));
    for (let index = 0; index < POSITIONS.length; index += 1) {
        const [row, column] = POSITIONS[index];
        const marker = markers.get(index);
        grid[row][column] = marker
            ? background(marker.color, marker.labels.join('').padEnd(2).slice(0, 2))
            : foreground(WHEEL[index], '● ');
    }

    return [
        `${number}. ${scheme.name}`,
        ...grid.map((row) => row.join('').replace(/\s+$/, '')),
        `D ${background(scheme.dominant, '    ')} ${scheme.dominant.toUpperCase()}`,
        `S ${background(scheme.secondary, '    ')} ${scheme.secondary.toUpperCase()}`,
        `A ${background(scheme.accent, '    ')} ${scheme.accent.toUpperCase()}`,
    ].join('\n');
}

export function renderColorSchemes(schemes) {
    if (schemes.length !== 3) throw new Error('Fournir exactement trois schémas.');
    for (const scheme of schemes) {
        if (!scheme.name?.trim()) throw new Error('Chaque schéma doit avoir un nom.');
        parseHex(scheme.dominant);
        parseHex(scheme.secondary);
        parseHex(scheme.accent);
    }
    return schemes.map((scheme, index) => renderScheme(scheme, index + 1)).join('\n\n');
}

function main() {
    const args = process.argv.slice(2);
    if (args.length !== 12) {
        console.error('Usage: node render-color-schemes.mjs <nom> <dominante> <secondaire> <accent> × 3');
        process.exitCode = 2;
        return;
    }

    const schemes = [];
    for (let index = 0; index < args.length; index += 4) {
        schemes.push({ name: args[index], dominant: args[index + 1], secondary: args[index + 2], accent: args[index + 3] });
    }
    console.log(renderColorSchemes(schemes));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
