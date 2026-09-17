import type { Action } from 'svelte/action';
import { prefersReducedMotion } from './motion';

/**
 * Fade/translate an element in once when it scrolls into view, then
 * stop observing it. Mirrors the prototype's observer settings exactly.
 */
export const reveal: Action = (node) => {
	if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
		node.classList.add('in');
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('in');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
