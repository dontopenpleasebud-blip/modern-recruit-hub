# Circular theme transition

## What will change
- Replace the straight side wipe with a circular reveal originating from the theme button.
- Give the expanding edge a subtle blur so the theme change feels like a soft wave rather than a sharp line.
- Keep the existing animated sun/moon icon, saved theme preference, fallback behavior, and reduced-motion support.

## Technical details
- Capture the theme button’s center point when clicked and expose it to the View Transition styling.
- Animate a radial mask large enough to cover every screen corner from that point.
- Fall back to the immediate theme switch when View Transitions are unavailable.

## Verification
- Check the transition from the live navbar on desktop and mobile-sized screens.
- Confirm the main page remains free of runtime and build errors.
