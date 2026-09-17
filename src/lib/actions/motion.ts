import { browser } from '$app/environment';

/**
 * Every custom animation on this site is gated on these two checks
 * (see HANDOFF.md → "Interaction conventions"). On reduced-motion or
 * touch-only devices elements simply render in their resting state.
 */
export function prefersReducedMotion(): boolean {
	if (!browser) return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function pointerIsFine(): boolean {
	if (!browser) return false;
	return window.matchMedia('(pointer: fine)').matches;
}

/** True only when motion is allowed *and* there's a precise pointer. */
export function interactiveMotionAllowed(): boolean {
	return pointerIsFine() && !prefersReducedMotion();
}
