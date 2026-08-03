import assert from 'node:assert/strict';
import test from 'node:test';

import { renderColorSchemes } from '../scripts/render-color-schemes.mjs';

test('affiche trois schémas avec un cercle ANSI et leurs couleurs', () => {
    const output = renderColorSchemes([
        { name: 'Forêt', dominant: '#244c36', secondary: '#9aae57', accent: '#d98a32' },
        { name: 'Désert', dominant: '#b97a45', secondary: '#e1bd72', accent: '#34728c' },
        { name: 'Nocturne', dominant: '#20283d', secondary: '#694f89', accent: '#c64545' },
    ]);

    assert.match(output, /\x1b\[48;2;/);
    assert.match(output, /1\. Forêt/);
    assert.match(output, /2\. Désert/);
    assert.match(output, /3\. Nocturne/);
    assert.match(output, /D .*#244C36/);
    assert.match(output, /S .*#9AAE57/);
    assert.match(output, /A .*#D98A32/);
});

test('refuse un nombre de schémas différent de trois', () => {
    assert.throws(() => renderColorSchemes([]), /trois schémas/);
});
