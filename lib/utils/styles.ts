/** Shared layout / typography class names — defined in app/globals.css @layer components. */

export const sectionTitleClass = "section-title";
export const sectionTitleAccentClass = "section-title-em";
export const badgeKickerClass = "badge-kicker";
export const kickerLabelClass = "kicker-label";
export const cardPanelClass = "card-panel";
export const cardPanelSoftClass = "card-panel-soft";
export const cardPanelDarkClass = "card-panel-dark";
export const tileSoftClass = "tile-soft";
export const bodyLgClass = "body-lg";
export const bodySmClass = "body-sm";
export const modalShellClass = "modal-shell";
export const transitionLiftClass = "transition-lift";
export const formInputClass = "form-input";
export const formInputShadowClass = "form-input-shadow";
export const formLabelClass = "form-label";
/** Full-screen modal layer — explicit z-index; theme `z-modal` is not emitted by Tailwind. */
export const modalOverlayClass = "fixed inset-0 z-[100]";
/** Stacked above timed CTA and other modals (e.g. contact form after CTA). */
export const modalOverlayTopClass = "fixed inset-0 z-[110]";
export const sectionScrollClass = "scroll-mt-24";
export const sectionPaddingClass = "py-20 sm:py-24";
