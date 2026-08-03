import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_HEADINGS = [
    '1. Bases',
    '2. Ombrage',
    '3. Éclaircissements',
    '4. Finitions',
    '5. Socle',
];

const SUMMARY_FIELDS = [
    'Style recherché',
    'Couleurs dominantes',
    "Couleurs d'accent",
    'Niveau de difficulté',
    'Temps estimé',
];

const REFERENCE_PATTERN = /\b\d{2}\.\d{3}\b/g;
const PRODUCT_PATTERN = /\*\*(\d{2}\.\d{3})\s+([^*\n]+)\*\*/g;

export function parsePaintingSet(markdown) {
    const products = new Map();

    for (const line of markdown.split(/\r?\n/)) {
        const match = line.match(/^\|\s*(\d{2}\.\d{3})\s*\|\s*(.*?)\s*\|$/);
        if (match) products.set(match[1], match[2]);
    }

    return products;
}

function hasQuotedFrontmatterField(frontmatter, field) {
    const match = frontmatter.match(new RegExp(`^${field}\\s*:\\s*("(?:[^"\\\\]|\\\\.)*")\\s*$`, 'm'));
    if (!match) return false;

    try {
        return JSON.parse(match[1]).trim().length > 0;
    } catch {
        return false;
    }
}

export function validateTutorial(markdown, products, tutorialPath = 'tutorial.md') {
    const errors = [];
    const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!frontmatter || !hasQuotedFrontmatterField(frontmatter[1], 'title')) {
        errors.push('Le frontmatter doit contenir un title non vide entre guillemets doubles.');
    }
    if (!frontmatter || !hasQuotedFrontmatterField(frontmatter[1], 'description')) {
        errors.push('Le frontmatter doit contenir une description non vide entre guillemets doubles.');
    }
    if (!frontmatter || !/^tags\s*:\s*\[\s*leasure\s*,\s*painting\s*,\s*figurines\s*,\s*tuto\s*\]\s*$/m.test(frontmatter[1])) {
        errors.push('Le frontmatter doit contenir tags: [leasure, painting, figurines, tuto].');
    }
    if (extname(tutorialPath) !== '.md') {
        errors.push('Le tutoriel doit être une page .md.');
    }

    const pageBody = frontmatter ? markdown.slice(frontmatter[0].length) : markdown;
    const bodyWithoutCodeBlocks = pageBody.replace(/```[\s\S]*?```/g, '');
    if (/^(?:import|export)\s/m.test(bodyWithoutCodeBlocks) || /<\/?[A-Z][A-Za-z0-9.]*(?:\s|\/?>)/m.test(bodyWithoutCodeBlocks)) {
        errors.push('Une page .md ne doit contenir ni import, ni export, ni composant MDX.');
    }
    if (/^#\s+/m.test(bodyWithoutCodeBlocks)) {
        errors.push('Ne pas ajouter de titre de niveau 1 : Starlight affiche déjà le title du frontmatter.');
    }

    const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
    if (headings.length !== REQUIRED_HEADINGS.length || headings.some((heading, index) => heading !== REQUIRED_HEADINGS[index])) {
        errors.push(`Les chapitres doivent être exactement : ${REQUIRED_HEADINGS.join(', ')}.`);
    }

    for (const field of SUMMARY_FIELDS) {
        if (!markdown.includes(`**${field} :**`)) errors.push(`Résumé incomplet : champ « ${field} » absent.`);
    }

    const formattedRanges = [];
    for (const match of markdown.matchAll(PRODUCT_PATTERN)) {
        const [token, reference, name] = match;
        const expectedName = products.get(reference);
        formattedRanges.push([match.index, match.index + token.length]);

        if (!expectedName) {
            errors.push(`Référence absente du painting set : ${reference}.`);
        } else if (name.trim() !== expectedName) {
            errors.push(`Nom incorrect pour ${reference} : « ${name.trim()} » au lieu de « ${expectedName} ».`);
        }
    }

    for (const match of markdown.matchAll(REFERENCE_PATTERN)) {
        if (!formattedRanges.some(([start, end]) => match.index >= start && match.index < end)) {
            errors.push(`La référence ${match[0]} doit apparaître avec son nom exact en gras.`);
        }
    }

    const withoutFormattedProducts = markdown.replace(PRODUCT_PATTERN, '');
    for (const [reference, name] of products) {
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const bareNamePattern = new RegExp(`(^|[^\\p{L}\\p{N}])${escapedName}(?=$|[^\\p{L}\\p{N}])`, 'imu');
        if (bareNamePattern.test(withoutFormattedProducts)) {
            errors.push(`Produit écrit sans nomenclature complète : **${reference} ${name}**.`);
        }
    }

    return [...new Set(errors)];
}

function main() {
    const [tutorialPath, paintingSetPath = 'src/content/docs/figurines/painting-set.md'] = process.argv.slice(2);
    if (!tutorialPath) {
        console.error('Usage: node validate-tutorial.mjs <tutoriel.md> [painting-set.md]');
        process.exitCode = 2;
        return;
    }

    const products = parsePaintingSet(readFileSync(paintingSetPath, 'utf8'));
    const errors = validateTutorial(readFileSync(tutorialPath, 'utf8'), products, tutorialPath);

    if (errors.length) {
        for (const error of errors) console.error(`- ${error}`);
        process.exitCode = 1;
        return;
    }

    console.log(`Tutoriel valide : ${resolve(tutorialPath)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
