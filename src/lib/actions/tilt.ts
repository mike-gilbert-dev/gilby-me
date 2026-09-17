import type { Action } from 'svelte/action';
import { interactiveMotionAllowed } from './motion';

/** Subtle 3D perspective tilt following the cursor. Labs cards only. */
export const tilt: Action = (node) => {
	if (!interactiveMotionAllowed()) return;

	const onMove = (event: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		node.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-2px)`;
	};

	const onLeave = () => {
		node.style.transform = '';
	};

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
		}
	};
};
