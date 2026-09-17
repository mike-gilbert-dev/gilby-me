import mayday from '$lib/assets/images/mayday_lg_01.jpg';
import eagleStout from '$lib/assets/images/eagle_stout_lg_01.jpg';
import nova from '$lib/assets/images/nova_lg_01.jpg';
import darkville from '$lib/assets/images/darkville_lg_02.jpg';
import gameday from '$lib/assets/images/gameday_lg_01.jpg';
import chesapeake from '$lib/assets/images/chesapeake_lg_01.jpg';
import marconi from '$lib/assets/images/marconi_lg_01.jpg';
import soul from '$lib/assets/images/soul_logo_lg_01.jpg';
import murphys from '$lib/assets/images/murphys_lg_01.jpg';
import columbus from '$lib/assets/images/columbus_lg_01.jpg';
import horizon from '$lib/assets/images/horizon_lg_01.jpg';
import gorilla from '$lib/assets/images/gorilla_lg_01.jpg';
import xando from '$lib/assets/images/xando_lg_01.jpg';
import csioLogo from '$lib/assets/images/csio_logo.svg';

// Higher-resolution variants, shown in the lightbox only. Pulled from the
// previous gilby.me /img/portfolio directory; the two print pieces were
// 2300-2500px originals, resized to 1400px to keep them web-weight.
import maydayLg from '$lib/assets/images/large/mayday_lg_01.jpg';
import eagleStoutLg from '$lib/assets/images/large/eagle_stout_lg_01.jpg';
import novaLg from '$lib/assets/images/large/nova_lg_01.jpg';
import darkvilleLg from '$lib/assets/images/large/darkville_lg_02.jpg';
import gamedayLg from '$lib/assets/images/large/gameday_lg_01.jpg';
import chesapeakeLg from '$lib/assets/images/large/chesapeake_lg_01.jpg';
import marconiLg from '$lib/assets/images/large/marconi_lg_01.jpg';
import soulLg from '$lib/assets/images/large/soul_logo_lg_01.jpg';
import murphysLg from '$lib/assets/images/large/murphys_lg_01.jpg';
import columbusLg from '$lib/assets/images/large/columbus_lg_01.jpg';
import horizonLg from '$lib/assets/images/large/horizon_lg_01.jpg';
import gorillaLg from '$lib/assets/images/large/gorilla_lg_01.jpg';
import xandoLg from '$lib/assets/images/large/xando_lg_01.jpg';

export const site = {
	name: 'Mike Gilbert',
	wordmark: 'GILBY.ME',
	location: 'BALTIMORE, MD',
	description:
		'Mike Gilbert — designer, developer, and builder in Baltimore. Visual identity, digital products, and web experiments.'
};

/** Design folds into Work — it is deliberately not a nav item. */
export const navLinks = [
	{ id: 'work', label: 'Work' },
	{ id: 'labs', label: 'Labs' },
	{ id: 'about', label: 'About' },
	{ id: 'contact', label: 'Contact' }
] as const;

export type NavId = (typeof navLinks)[number]['id'];

/** Served from static/, so it sits at the site root. Opens in a new tab;
    the browser PDF viewer handles downloading from there. */
export const resume = {
	file: '/Mike_Gilbert_Resume.pdf',
	label: 'Resume'
};

export type CaseStudy = {
	index: string;
	eyebrow: string;
	/** Rendered as two lines in the card title. */
	title: [string, string];
	description: string;
	stats: { value: string; label: string }[];
	/** Optional: cards without a feature panel carry the detail in prose. */
	features?: { label: string; pill: string }[];
	href: string;
	linkLabel: string;
	theme: 'il' | 'csio';
	logo?: string;
	monogram?: string;
};

export const caseStudies: CaseStudy[] = [
	{
		index: '01 / development',
		eyebrow: 'insidelacrosse.com — national sport-media platform',
		title: ['Inside', 'Lacrosse'],
		description:
			'The source for everything lacrosse — news, recruiting, rankings, and community, built and run in production for a national sport-media audience. A full rebuild moved the platform off a legacy stack and onto SvelteKit with a PostgreSQL backend, with the frontend and CMS layer owned end-to-end from there — REST APIs, AWS infrastructure, analytics, ad delivery, and subscription billing, on a technical roadmap directed for over a decade.',
		stats: [
			{ value: '5M+', label: 'Active Users' },
			{ value: '99M+', label: 'Pageviews' }
		],
		href: 'https://www.insidelacrosse.com',
		linkLabel: 'Visit InsideLacrosse.com',
		theme: 'il',
		monogram: 'IL'
	},
	{
		index: '02 / development',
		eyebrow: 'collegesoccer.io — independent product',
		title: ['College', 'Soccer.io'],
		description:
			'All of NCAA D1 soccer in one place — conceived, designed, and engineered solo, from data pipeline to rankings to the interface fans use every week.',
		// Rounded static copy by design — bump by hand as the numbers grow.
		stats: [
			{ value: '600+', label: 'Teams Tracked' },
			{ value: '20K+', label: 'Games Logged' },
			{ value: '40K+', label: 'Player Records' }
		],
		features: [
			{ label: "Women's Game of the Week", pill: 'Live' },
			{ label: "Men's + Women's Rankings", pill: 'Weekly' },
			{ label: 'Data Pipeline → Supabase', pill: 'Automated' }
		],
		href: 'https://collegesoccer.io',
		linkLabel: 'Visit CollegeSoccer.io',
		theme: 'csio',
		logo: csioLogo
	}
];

export type GalleryPiece = {
	/** Grid thumbnail. */
	src: string;
	/** Higher-resolution version for the lightbox; falls back to src. */
	large?: string;
	name: string;
	category: string;
	alt: string;
};

export const galleryPieces: GalleryPiece[] = [
	{
		src: mayday,
		large: maydayLg,
		name: 'Mayday',
		category: 'Brand Identity — Print',
		alt: 'Mayday brand identity'
	},
	{
		src: eagleStout,
		large: eagleStoutLg,
		name: 'Eagle Stout',
		category: 'Packaging — Print',
		alt: 'Eagle Stout packaging design'
	},
	{
		src: nova,
		large: novaLg,
		name: 'Nova',
		category: 'Logo Mark',
		alt: 'Nova logo mark'
	},
	{
		src: darkville,
		large: darkvilleLg,
		name: 'Darkville',
		category: 'Print',
		alt: 'Darkville print design'
	},
	{
		src: gameday,
		large: gamedayLg,
		name: 'Gameday',
		category: 'Logo Mark',
		alt: 'Gameday logo mark'
	},
	{
		src: chesapeake,
		large: chesapeakeLg,
		name: 'Chesapeake',
		category: 'Logo Mark',
		alt: 'Chesapeake logo mark'
	},
	{
		src: marconi,
		large: marconiLg,
		name: 'Marconi',
		category: 'Logo Mark',
		alt: 'Marconi logo mark'
	},
	{
		src: soul,
		large: soulLg,
		name: 'Soul',
		category: 'Logo Mark',
		alt: 'Soul logo mark'
	},
	{
		src: murphys,
		large: murphysLg,
		name: "Murphy's",
		category: 'Print',
		alt: "Murphy's print design"
	},
	{
		src: columbus,
		large: columbusLg,
		name: 'Columbus',
		category: 'Print',
		alt: 'Columbus print design'
	},
	{
		src: horizon,
		large: horizonLg,
		name: 'Horizon',
		category: 'Print',
		alt: 'Horizon print design'
	},
	{
		src: gorilla,
		large: gorillaLg,
		name: 'Gorilla',
		category: 'Logo Mark',
		alt: 'Gorilla logo mark'
	},
	{
		src: xando,
		large: xandoLg,
		name: 'Xando',
		category: 'Print',
		alt: 'Xando print design'
	}
];

export type Lab = {
	num: string;
	title: string;
	description: string;
	tags?: string[];
	cursor: string;
	/** LAB/003 renders the live canvas instead of a tag row. */
	canvas?: boolean;
};

/**
 * Empty on purpose — nothing is ready to show yet, so the Labs section
 * renders its empty-state note instead. Add an entry here and the card
 * grid comes back on its own; no component changes needed.
 */
export const labs: Lab[] = [];

export const skills = [
	{
		label: 'Design',
		items: ['Visual Identity', 'Branding', 'Editorial Layout', 'Print Design', 'Logo Design']
	},
	{
		label: 'Develop',
		items: ['SvelteKit', 'Tailwind CSS', 'Supabase', 'Full-Stack Products', 'Data Pipelines']
	}
];

export const socials = [
	{ id: 'github', label: 'GitHub', href: 'https://github.com/mike-gilbert-dev' },
	{ id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mike-gilbert-54399423/' },
	{ id: 'instagram', label: 'Instagram', href: '#' }
] as const;

export type SocialId = (typeof socials)[number]['id'];
