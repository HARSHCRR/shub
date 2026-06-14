# SOHub Digital — Landing Page Clone

A pixel-perfect recreation of a creative agency landing page built with Next.js, GSAP, Lenis smooth scroll, and Spline 3D elements.

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design tokens
- **GSAP** with ScrollTrigger for animations
- **Lenis** for smooth scrolling
- **Spline** for 3D elements (placeholders included)

## Features

✅ Smooth scroll with Lenis synced to GSAP ScrollTrigger  
✅ Hero section with animated heading  
✅ Scroll-triggered fade-up animations throughout  
✅ Portfolio grid with hover effects and image scaling  
✅ Stacking services cards using CSS `position: sticky`  
✅ Rotating asterisk icons  
✅ Animated dropdown navigation menu  
✅ 3D element placeholders for Spline scenes  
✅ Responsive design with mobile support  
✅ Reduced motion support for accessibility  

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building for Production

```bash
npm run build
npm start
```

## Adding Spline 3D Scenes

The project includes placeholders for three Spline 3D scenes:

1. **Hero Robot** — `src/components/Hero.tsx`
2. **CTA Chair** — `src/components/CTA.tsx`
3. **Footer Battery** — `src/components/Footer.tsx`

To add real 3D scenes:

1. Visit [spline.design](https://spline.design)
2. Find or create scenes for: Robot Arm, Chair/Furniture, Battery
3. Export as public URLs
4. Uncomment the `<Spline>` components and replace the placeholder URLs

## Adding Project Images

Place your project images in `public/work/` with these filenames:
- `alpha.webp`
- `beta.webp`
- `gamma.webp`
- `delta.webp`

Or update the image paths in `src/components/Work.tsx`.

## Design Tokens

All design tokens are configured in `tailwind.config.ts`:

- **Colors**: Background, foreground, darkCard, highlight
- **Typography**: Hero, section, card, body, eyebrow sizes
- **Custom easings**: expo-out, quart-out, smooth
- **Border radius**: card (2rem)

## Animation Details

### Hero
- Large heading animates up on load: `y: 100 → 0`, `opacity: 0 → 1`, 1s expo.out

### Scroll Animations
- All sections use `FadeUp` component
- Trigger at 80% viewport entry
- `y: 40 → 0`, `opacity: 0 → 1`, 0.8s power3.out

### Portfolio Cards
- Images scale to 1.05 on hover (contained by `overflow-hidden`)
- Arrow icon translates from `-translate-x-4 opacity-0` to `translate-x-0 opacity-100`

### Services Cards
- Pure CSS sticky positioning (no JavaScript)
- Each card has increasing `top` offset: 0px, 20px, 40px, 60px
- Asterisks rotate continuously at 4s linear

### Navigation
- Menu animates with `scaleY: 0.8 → 1` + `opacity: 0 → 1`
- Transform origin: top right
- Links shift right 8px on hover

## Accessibility

- `prefers-reduced-motion` support — all GSAP animations check for user preference
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed

## Performance

- Lenis lerp: 0.1 (snappy, not floaty)
- Dynamic imports for Spline components (avoid SSR issues)
- Optimized scroll performance with GSAP ticker
- No layout overflow on mobile

## Fidelity Checklist

- [x] Lenis smooth scroll active (~0.1 lerp)
- [x] GSAP ScrollTrigger synced with Lenis
- [x] Hero heading animates on load
- [x] All text blocks fade up at 80% viewport
- [x] Portfolio card images scale on hover without overflow
- [x] Portfolio arrows animate on card hover
- [x] Services cards stack via `position: sticky`
- [x] Service cards have increasing offsets (0, 20, 40, 60px)
- [x] Asterisks rotate continuously (4s linear)
- [x] Navbar menu animates from top-right
- [x] Navbar links shift right on hover
- [x] Footer pill nav is dark, rounded, bottom-centered
- [x] Footer wordmark is giant, low-opacity, behind 3D
- [x] No overflow on mobile (4vw padding)
- [x] Reduced motion support implemented

## License

This is a code reconstruction exercise for educational purposes.
