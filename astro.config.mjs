// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'wiki.ght1pc9kc.fr',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Développement',
                    collapsed: true,
					autogenerate: { directory: 'development' },
				},
				{
					label: 'Linux',
                    collapsed: true,
					autogenerate: { directory: 'linux' },
				},
				{
					label: 'macos',
                    collapsed: true,
					autogenerate: { directory: 'macos' },
				},
				{
					label: 'Divers',
                    collapsed: true,
					autogenerate: { directory: 'misc' },
				},
				{
					label: 'Outils',
                    collapsed: true,
					autogenerate: { directory: 'outils' },
				},
				{
					label: 'Serveurs',
                    collapsed: true,
					autogenerate: { directory: 'serveurs' },
				},
				{
					label: 'Cuisine',
                    collapsed: true,
					autogenerate: { directory: 'cuisine' },
				},
			],
		}),
	],
});
