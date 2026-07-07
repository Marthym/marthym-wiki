// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova';

// https://astro.build/config
export default defineConfig({
    site: 'https://wiki.ght1pc9kc.fr',
    integrations: [
        starlight({
            title: 'wiki.ght1pc9kc.fr',
            logo: {
                src: './src/assets/logo.png',
            },
            favicon: './src/assets/logo.png',
            head: [
                // Add ICO favicon fallback for Safari.
                {
                    tag: 'link',
                    attrs: {
                        rel: 'icon',
                        href: './src/assets/logo.png',
                        sizes: '32x32',
                    },
                },
            ],
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Marthym' }],
            sidebar: [
                {
                    label: 'Développement',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'development' } }],
                },
                {
                    label: 'Linux',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'linux' } }],
                },
                {
                    label: 'MacOS',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'macos' } }],
                },
                {
                    label: 'Divers',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'misc' } }],
                },
                {
                    label: 'Outils',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'outils' } }],
                },
                {
                    label: 'Serveurs',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'serveurs' } }],
                },
                {
                    label: 'Figurines',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'figurines' } }],
                },
                {
                    label: 'Cuisine',
                    collapsed: true,
                    items: [{ autogenerate: { directory: 'cuisine' } }],
                },
            ],
            plugins: [starlightThemeNova()],
        }),
    ],
});
