# Product Requirements Document (PRD)
# SOHub Digital Landing Page with Interactive Theme Comparison

**Version**: 1.0  
**Last Updated**: June 15, 2026  
**Status**: Complete Implementation  
**Repository**: https://github.com/HARSHCRR/temp

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technical Stack](#technical-stack)
4. [Architecture](#architecture)
5. [Component Specifications](#component-specifications)
6. [Theme System](#theme-system)
7. [Design Tokens](#design-tokens)
8. [Features & Functionality](#features--functionality)
9. [User Interactions](#user-interactions)
10. [File Structure](#file-structure)
11. [Implementation Details](#implementation-details)
12. [Dependencies](#dependencies)
13. [Deployment](#deployment)
14. [Performance Requirements](#performance-requirements)
15. [Accessibility](#accessibility)
16. [Browser Support](#browser-support)

---

## 1. Executive Summary

SOHub Digital is a modern, minimalist agency landing page featuring:
- **Interactive theme comparison** with draggable divider
- **Real-time light/dark mode switching** without page reload
- **3D animated sphere** using WebGL2 that transitions between themes
- **Smooth scroll animations** and hover effects
- **Responsive design** optimized for all devices
- **Production-ready** Next.js 15 application

**Key Innovation**: Dual rendering technique that shows actual website content in both light and dark themes simultaneously, revealed by a draggable divider (not image comparison).

---

## 2. Project Overview

### 2.1 Purpose
Create a visually striking landing page that demonstrates design versatility by allowing users to interactively compare light and dark theme versions in real-time.

### 2.2 Target Audience
- Potential clients evaluating the agency
- Design-conscious businesses
- Modern tech startups
- Users who appreciate interactive, innovative web experiences

### 2.3 Goals
1. Showcase agency's design and development capabilities
2. Provide memorable, interactive user experience

3. Demonstrate technical excellence through smooth animations and performance
4. Present portfolio and services in an elegant, minimalist style

---

## 3. Technical Stack

### 3.1 Core Framework
- **Next.js 15.1.6** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.7.2** - Type safety

### 3.2 Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Custom CSS Variables** - Theme system
- **PostCSS 8.4.49** - CSS processing

### 3.3 3D Graphics
- **WebGL2** - Hardware-accelerated sphere rendering
- **Custom GLSL Shaders** - Dithering effect
- **21st.dev DitheringShader** - Procedural sphere generation

### 3.4 UI Components
- **lucide-react 0.460.0** - Icon library (GripVertical)
- **clsx 2.1.1** - Conditional className utility
- **tailwind-merge 2.5.5** - Tailwind class merging

### 3.5 Development Tools
- **ESLint 9.18.0** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

---

## 4. Architecture

### 4.1 High-Level Architecture

```
Next.js App Router (src/app/)
├── Layout (globals.css + theme CSS variables)
└── Page
    └── ThemeComparison Component
        ├── Dark Theme Layer (bottom, full page)
        │   └── PageContent (all sections)
        └── Light Theme Layer (top, clipped)
            └── PageContent (all sections, same as dark)
```

### 4.2 Rendering Strategy

**Dual Rendering Approach**:
1. Render entire website twice simultaneously
2. Bottom layer: Dark theme (`.theme-dark` class)
3. Top layer: Light theme (`.theme-light` class)
4. Use CSS `clip-path` on top layer based on divider position
5. Divider position controls what percentage of light theme is visible

**Why This Works**:
- No image comparison - actual DOM elements
- Real-time theme switching without re-rendering
- Smooth 60fps performance via GPU-accelerated clip-path

- All interactive elements work in both themes

### 4.3 Component Hierarchy

```
main
└── ThemeComparison
    └── PageContent
        ├── Nav (navigation bar)
        ├── ThemeAwareHero (hero with sphere)
        ├── Work (portfolio grid)
        ├── Services (stacking cards)
        ├── CTA (call-to-action)
        └── Footer (footer with pill nav)
```

---

## 5. Component Specifications

### 5.1 ThemeComparison Component

**File**: `src/components/ui/theme-comparison.tsx`

**Purpose**: Wrapper that renders entire page twice with theme-specific styling and manages the draggable divider.

**Props**:
```typescript
interface ThemeComparisonProps {
  children: ReactNode  // Page content to render twice
}
```

**State**:
```typescript
const [dividerPosition, setDividerPosition] = useState(50)  // 0-100
const [isDragging, setIsDragging] = useState(false)
```

**Key Features**:
- Renders children twice (dark layer + light layer)
- Applies `.theme-dark` and `.theme-light` classes
- Calculates `clip-path` based on divider position
- Handles mouse, touch, and keyboard events
- Displays draggable handle with GripVertical icon

**Clip-Path Formula**:
```typescript
clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`
```
- `inset(top right bottom left)`
- Clips from right edge based on percentage
- 50% position = half light, half dark
- 0% = all dark visible
- 100% = all light visible

**Event Handlers**:
1. **Mouse**: `onMouseDown`, `onMouseMove`, `onMouseUp`
2. **Touch**: `onTouchStart`, `onTouchMove`, `onTouchEnd`
3. **Keyboard**: Arrow keys (←/→) for 1% increments

**Accessibility**:
- `role="slider"`
- `aria-label="Theme divider handle"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `tabIndex={0}` for keyboard focus


### 5.2 ThemeAwareHero Component

**File**: `src/components/ThemeAwareHero.tsx`

**Purpose**: Hero section with 3D sphere that dynamically changes color based on active theme.

**Key Features**:
- Reads `--sphere-color` CSS variable from parent theme
- Uses `MutationObserver` to detect theme changes
- Passes color to DitheringShader component
- Handles responsive sphere sizing

**State**:
```typescript
const [dimensions, setDimensions] = useState({ width: 600, height: 600 })
const [sphereColor, setSphereColor] = useState('#000000')
```

**Sphere Size Calculation**:
```typescript
const size = Math.min(
  window.innerWidth * 0.4,   // 40% of viewport width
  window.innerHeight * 0.5,  // 50% of viewport height
  600                        // Maximum 600px
)
```

**Color Detection**:
```typescript
const color = getComputedStyle(container)
  .getPropertyValue('--sphere-color')
  .trim()
```

**Layout**:
- Full viewport height (`h-screen`)
- Sphere centered absolutely
- Text positioned at bottom left
- Scroll hint at bottom right

### 5.3 Nav Component

**File**: `src/components/Nav.tsx`

**Purpose**: Fixed navigation bar with logo and menu button.

**Features**:
- Fixed positioning at top
- Logo (uppercase "SOHUB")
- "Chat with SOHub" button (hidden on mobile)
- "Menu" button with dropdown
- Animated menu reveal (CSS transitions)

**Menu Items**:
- Studio
- Work
- Services
- Contact

**Animation**:
- Dropdown: `scaleY(0.8) opacity(0)` → `scaleY(1) opacity(1)`
- Links: Translate right 8px on hover
- Timing: 250ms cubic-bezier(0.25,1,0.5,1)

### 5.4 Work Component

**File**: `src/components/Work.tsx`

**Purpose**: Portfolio grid showcasing projects.

**Structure**:
- Section header with fade-up animation
- 2-column grid (1 column on mobile)
- 4 project cards with images and metadata


**Project Data**:
```typescript
const projects = [
  { title: 'Project Alpha', category: 'Brand Identity', img: '/work/alpha.webp' },
  { title: 'Project Beta',  category: 'Web Design',    img: '/work/beta.webp' },
  { title: 'Project Gamma', category: 'Motion',        img: '/work/gamma.webp' },
  { title: 'Project Delta', category: 'Development',   img: '/work/delta.webp' }
]
```

**Card Interactions**:
- Image scales to 1.05 on hover (contained by overflow-hidden)
- Arrow icon translates from `-translate-x-4 opacity-0` to `translate-x-0 opacity-100`
- 500ms transition with quart-out easing

### 5.5 Services Component

**File**: `src/components/Services.tsx`

**Purpose**: Stacking cards showcasing services using CSS `position: sticky`.

**Services Data**:
```typescript
const services = [
  {
    title: 'Brand Identities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Brand Guidelines'],
    description: 'Building brands that resonate...',
    offset: 'calc(10vh + 0px)'
  },
  {
    title: 'Web Design',
    tags: ['UI/UX', 'Prototyping', 'Motion Design', 'Design Systems'],
    offset: 'calc(10vh + 20px)'
  },
  {
    title: 'Development',
    tags: ['React', 'Next.js', 'GSAP', 'Three.js'],
    offset: 'calc(10vh + 40px)'
  },
  {
    title: 'Motion & 3D',
    tags: ['GSAP', 'Spline', 'WebGL', 'Lottie'],
    offset: 'calc(10vh + 60px)'
  }
]
```

**Stacking Effect**:
- Each card has `position: sticky`
- Increasing `top` offset (0px, 20px, 40px, 60px)
- Creates layered stack as user scrolls
- No JavaScript required - pure CSS

**Card Design**:
- Dark background (`bg-darkCard`)
- White text
- Rotating asterisk (✳) - 4s linear infinite
- Tags in pill format with borders
- Min height 50vh

### 5.6 CTA Component

**File**: `src/components/CTA.tsx`

**Purpose**: Call-to-action section encouraging user contact.

**Content**:
- Eyebrow: "Let's Talk"
- Heading: "Ready to build something great?"
- Button: "Book a Call"
- 3D element placeholder (can be replaced with Spline scene)

**Styling**:
- 80vh height
- Centered content
- FadeUp animation on scroll


### 5.7 Footer Component

**File**: `src/components/Footer.tsx`

**Purpose**: Site footer with navigation and social links.

**Content**:
- Large background wordmark "sohub" (18vw, opacity 10%)
- 3D element placeholder
- Pill-style navigation bar (Studio, Work, Contact)
- Social links (Twitter, Instagram, LinkedIn, Dribbble)

**Layout**:
- Full viewport height
- Centered content
- Floating pill nav at bottom
- Social links below nav

### 5.8 DitheringShader Component

**File**: `src/components/ui/dithering-shader.tsx`

**Purpose**: WebGL2-based procedural sphere with dithering effect.

**Props**:
```typescript
interface DitheringShaderProps {
  width?: number        // Canvas width (default: 800)
  height?: number       // Canvas height (default: 800)
  colorBack?: string    // Background color (default: "#000000")
  colorFront?: string   // Sphere color (default: "#ffffff")
  shape?: DitheringShape  // "sphere" | "simplex" | "warp" | etc.
  type?: DitheringType    // "random" | "2x2" | "4x4" | "8x8"
  pxSize?: number       // Pixel size for dithering (default: 4)
  speed?: number        // Animation speed (default: 1)
  className?: string
  style?: React.CSSProperties
}
```

**Shader Pipeline**:
1. **Vertex Shader**: Passes position to fragment shader
2. **Fragment Shader**: 
   - Calculates 3D sphere with lighting
   - Applies procedural dithering
   - Outputs pixelated appearance

**Sphere Shape**:
```glsl
shape_uv *= 2.;
float d = 1. - pow(length(shape_uv), 2.);
vec3 pos = vec3(shape_uv, sqrt(d));
vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
shape = .5 + .5 * dot(lightPos, pos);
```

**Dithering Types**:
- Random: Hash-based noise
- Bayer 2x2, 4x4, 8x8: Ordered dithering matrices

**Performance**:
- RequestAnimationFrame loop
- Uniform updates per frame
- GPU-accelerated rendering
- Automatic cleanup on unmount

### 5.9 FadeUp Component

**File**: `src/components/FadeUp.tsx`

**Purpose**: Reusable scroll-triggered fade-up animation.

**Implementation**:
- Uses Intersection Observer API
- Triggers when element enters viewport (10% threshold)

- Applies CSS class `fade-up-visible`
- CSS handles animation (transform + opacity)
- Optional delay prop for staggered animations

**CSS Animation**:
```css
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s, transform 0.8s;
}
.fade-up.fade-up-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 6. Theme System

### 6.1 Theme Architecture

**CSS Variable Approach**:
- Define colors as CSS custom properties
- Apply via theme classes (`.theme-light`, `.theme-dark`)
- Components inherit colors automatically
- No prop drilling required

### 6.2 Light Theme

**CSS Variables**:
```css
.theme-light {
  --bg: #ECECEC;           /* Background */
  --fg: #000000;           /* Foreground (text) */
  --card: #FFFFFF;         /* Card backgrounds */
  --border: rgba(0, 0, 0, 0.15);  /* Borders */
  --highlight: #666666;    /* Secondary text */
  --dark-card: #E5E5E5;    /* Dark card variant */
  --sphere-color: #000000; /* Sphere color */
}
```

**Applied Colors**:
- Page background: `#ECECEC` (light gray)
- Text: `#000000` (black)
- Buttons: Black background, white text
- Cards: `#FFFFFF` (white)
- Sphere: `#000000` (black)
- Borders: Semi-transparent black

### 6.3 Dark Theme

**CSS Variables**:
```css
.theme-dark {
  --bg: #000000;           /* Background */
  --fg: #FFFFFF;           /* Foreground (text) */
  --card: #171717;         /* Card backgrounds */
  --border: rgba(255, 255, 255, 0.15);  /* Borders */
  --highlight: #999999;    /* Secondary text */
  --dark-card: #1C1C1E;    /* Dark card variant */
  --sphere-color: #FFFFFF; /* Sphere color */
}
```

**Applied Colors**:
- Page background: `#000000` (black)
- Text: `#FFFFFF` (white)
- Buttons: White background, black text
- Cards: `#171717` (dark gray)
- Sphere: `#FFFFFF` (white)
- Borders: Semi-transparent white

### 6.4 Theme Application

**Method 1: CSS Classes**:
```css
.theme-light .bg-background { background-color: var(--bg) !important; }
.theme-light .text-foreground { color: var(--fg) !important; }
```

**Method 2: JavaScript**:
```typescript
const color = getComputedStyle(element)
  .getPropertyValue('--sphere-color')
```


---

## 7. Design Tokens

### 7.1 Color Palette

```typescript
colors: {
  background: '#F2F4F5',  // Default off-white (overridden by themes)
  foreground: '#121212',  // Default near-black
  darkCard:   '#1C1C1E',  // Services card background
  highlight:  '#A0A0A0',  // Secondary text / accents
  white:      '#FFFFFF',
}
```

### 7.2 Typography

**Font Family**:
```typescript
fontFamily: {
  sans: ['var(--font-neue)', 'sans-serif']
}
```
- Primary: PP Neue Montreal (or Inter fallback)

**Font Sizes**:
```typescript
fontSize: {
  hero:    ['20vw', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
  section: ['4rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
  card:    ['3.5rem',{ lineHeight: '1.1',  letterSpacing: '-0.01em' }],
  body:    ['1.125rem', { lineHeight: '1.5', letterSpacing: '0em' }],
  eyebrow: ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
}
```

**Usage**:
- `text-hero`: Large "sohub" heading (20vw)
- `text-section`: Section headings (4rem)
- `text-card`: Card titles (3.5rem)
- `text-body`: Body text (1.125rem)
- `text-eyebrow`: Small labels (0.875rem)

### 7.3 Spacing

**Padding**:
- Horizontal: `px-[4vw]` (4% of viewport width)
- Vertical sections: `py-24` (6rem)

**Gaps**:
- Grid gaps: `gap-4` (1rem) mobile, `gap-8` (2rem) desktop
- Card gaps: `gap-2` to `gap-6` depending on context

### 7.4 Border Radius

```typescript
borderRadius: {
  card: '2rem',  // 32px for cards
}
```

### 7.5 Transitions

**Custom Easings**:
```typescript
transitionTimingFunction: {
  'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
  'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
  'smooth':    'cubic-bezier(0.65, 0, 0.35, 1)',
}
```

**Usage**:
- Fade-ups: 800ms with quart-out
- Hover effects: 200-500ms with quart-out
- Menu animations: 400ms with expo-out

---

## 8. Features & Functionality

### 8.1 Core Features

1. **Interactive Theme Comparison**
   - Draggable vertical divider
   - Real-time light/dark theme reveal
   - Smooth 60fps performance


2. **3D Animated Sphere**
   - WebGL2 procedural generation
   - Dynamic color based on theme
   - Continuous rotation animation
   - Responsive sizing

3. **Scroll Animations**
   - Fade-up on viewport entry
   - Hero heading entrance animation
   - Staggered card reveals

4. **Hover Effects**
   - Image scale on portfolio cards
   - Arrow slide-in on hover
   - Button opacity changes
   - Navigation link translations

5. **Responsive Navigation**
   - Fixed header
   - Animated dropdown menu
   - Mobile-optimized

6. **Portfolio Grid**
   - 2-column layout (desktop)
   - 1-column layout (mobile)
   - Image hover effects
   - Category labels

7. **Stacking Cards**
   - CSS sticky positioning
   - Progressive offset stacking
   - No JavaScript required

8. **Call-to-Action**
   - Prominent CTA section
   - Button with hover state
   - Optional 3D element

9. **Footer Navigation**
   - Pill-style nav bar
   - Social links
   - Large background wordmark

### 8.2 Animation Details

**Hero Heading**:
- Initial: `opacity: 0`, `translateY(100px)`
- Animated: `opacity: 1`, `translateY(0)`
- Duration: 1s
- Easing: expo-out
- Delay: 200ms

**Fade-Up Elements**:
- Initial: `opacity: 0`, `translateY(40px)`
- Animated: `opacity: 1`, `translateY(0)`
- Duration: 800ms
- Easing: quart-out
- Trigger: 10% viewport intersection

**Portfolio Card Hover**:
- Image: `scale(1)` → `scale(1.05)`
- Arrow: `translateX(-16px) opacity(0)` → `translateX(0) opacity(1)`
- Duration: 500ms
- Easing: quart-out

**Rotating Asterisk**:
- Animation: `rotate(0deg)` → `rotate(360deg)`
- Duration: 4s
- Easing: linear
- Iteration: infinite

**Menu Dropdown**:
- Open: `scaleY(0.8) opacity(0)` → `scaleY(1) opacity(1)`
- Close: `scaleY(1) opacity(1)` → `scaleY(0.8) opacity(0)`
- Duration: 400ms (open) / 250ms (close)
- Origin: top right

**Sphere Animation**:
- Lighting rotation
- Continuous at 1.5x speed
- 60fps via requestAnimationFrame


---

## 9. User Interactions

### 9.1 Theme Divider Interaction

**Mouse**:
1. User hovers over handle
2. Cursor changes to grab cursor
3. User clicks and holds
4. Cursor changes to grabbing
5. User drags left/right
6. Divider follows mouse position
7. Theme reveal updates in real-time
8. User releases mouse
9. Divider stays at release position

**Touch**:
1. User taps handle
2. User drags finger left/right
3. Divider follows touch position
4. Theme reveal updates in real-time
5. User lifts finger
6. Divider stays at release position

**Keyboard**:
1. User tabs to focus handle
2. User presses ← (left arrow)
   - Divider moves 1% left
   - More dark theme visible
3. User presses → (right arrow)
   - Divider moves 1% right
   - More light theme visible
4. Repeatable for fine control

### 9.2 Navigation Interaction

1. User clicks "Menu" button
2. Dropdown animates open from top-right
3. Menu items appear
4. User hovers over menu item
5. Item translates 8px to right
6. User clicks item
7. (Navigate to section - not implemented yet)
8. User clicks "Close" or outside menu
9. Dropdown animates closed

### 9.3 Portfolio Interaction

1. User hovers over project card
2. Image scales to 1.05x (contained)
3. Arrow icon slides in from left
4. User clicks card
5. (Navigate to project - not implemented yet)

### 9.4 Scroll Behavior

1. User scrolls down page
2. Elements in viewport trigger fade-up
3. Services cards stack progressively
4. Smooth scroll (CSS scroll-behavior)
5. No jump or jank

---

## 10. File Structure

```
temp/
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS config
├── tailwind.config.ts          # Tailwind theme config
├── tsconfig.json               # TypeScript config
├── README.md                   # Project overview
├── SETUP_COMPLETE.md           # Setup instructions
├── THEME_COMPARISON.md         # Theme system docs
├── PRD.md                      # This document
├── public/
│   └── work/
│       └── README.md           # Image placeholder instructions
└── src/
    ├── app/
    │   ├── globals.css         # Global styles + theme CSS
    │   ├── layout.tsx          # Root layout
    │   └── page.tsx            # Main page (wraps ThemeComparison)
    ├── components/
    │   ├── Nav.tsx             # Navigation bar
    │   ├── Hero.tsx            # Original hero (with props)
    │   ├── ThemeAwareHero.tsx  # Hero with dynamic sphere
    │   ├── Work.tsx            # Portfolio grid
    │   ├── Services.tsx        # Stacking cards
    │   ├── CTA.tsx             # Call-to-action
    │   ├── Footer.tsx          # Footer
    │   ├── FadeUp.tsx          # Scroll animation wrapper
    │   ├── SmoothScroll.tsx    # Smooth scroll provider (minimal)
    │   ├── PageContent.tsx     # All sections wrapper
    │   └── ui/
    │       ├── theme-comparison.tsx    # Theme divider component
    │       └── dithering-shader.tsx    # WebGL sphere
    └── lib/
        └── utils.ts            # Utility functions (cn)
```


---

## 11. Implementation Details

### 11.1 Key Algorithms

**Divider Position Calculation**:
```typescript
const handleMove = (clientX: number) => {
  const rect = container.getBoundingClientRect()
  const x = clientX - rect.left
  const percentage = (x / rect.width) * 100
  setDividerPosition(Math.max(0, Math.min(100, percentage)))
}
```

**Clip-Path Generation**:
```typescript
const clipPathStyle = {
  clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`
}
```
- `inset(top right bottom left)`
- Clips light theme from right edge
- Example: 30% position → clips 70% from right

**Sphere Color Detection**:
```typescript
const updateSphereColor = () => {
  const color = getComputedStyle(container)
    .getPropertyValue('--sphere-color')
    .trim()
  if (color) setSphereColor(color)
}
```

**MutationObserver for Theme Changes**:
```typescript
const observer = new MutationObserver(updateSphereColor)
observer.observe(parent, {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true
})
```

### 11.2 Performance Optimizations

1. **useMemo for Clip-Path**:
   ```typescript
   const clipPathStyle = useMemo(
     () => ({ clipPath: `inset(0 ${100 - dividerPosition}% 0 0)` }),
     [dividerPosition]
   )
   ```

2. **CSS clip-path (GPU)**:
   - Hardware-accelerated
   - No layout recalculation
   - Smooth 60fps

3. **Event Listener Cleanup**:
   ```typescript
   useEffect(() => {
     if (isDragging) {
       document.addEventListener('mousemove', handleMouseMove)
       document.addEventListener('mouseup', handleMouseUp)
     }
     return () => {
       document.removeEventListener('mousemove', handleMouseMove)
       document.removeEventListener('mouseup', handleMouseUp)
     }
   }, [isDragging])
   ```

4. **Intersection Observer for Scroll Animations**:
   - Only animates elements entering viewport
   - No continuous scroll listening
   - Battery-friendly

5. **WebGL RequestAnimationFrame**:
   - Synced with browser refresh rate
   - Pauses when tab inactive
   - Efficient GPU usage

6. **React Key for Sphere**:
   ```typescript
   <DitheringShader key={sphereColor} ... />
   ```
   - Forces remount on color change
   - Prevents color transition artifacts

### 11.3 State Management

**Component State Only**:
- No global state management
- No Redux, Context API, or Zustand
- Props and local useState
- Keeps complexity low

**State Locations**:
- `ThemeComparison`: dividerPosition, isDragging
- `ThemeAwareHero`: sphereColor, dimensions
- `Nav`: menuOpen
- `FadeUp`: Element visibility (implicit via Intersection Observer)

### 11.4 Side Effects

**useEffect Dependencies**:
- Always include all dependencies
- Clean up event listeners
- Disconnect observers

**Example**:
```typescript
useEffect(() => {
  const handleResize = () => setDimensions(...)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])  // Empty deps = mount/unmount only
```


---

## 12. Dependencies

### 12.1 Production Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "next": "^15.1.6",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5",
  "lucide-react": "^0.460.0"
}
```

**Purpose of Each**:
- `react` + `react-dom`: UI library
- `next`: Framework with App Router, SSR, etc.
- `clsx`: Conditional className helper
- `tailwind-merge`: Merge Tailwind classes without conflicts
- `lucide-react`: Icon library (GripVertical for handle)

### 12.2 Development Dependencies

```json
{
  "typescript": "^5.7.2",
  "@types/node": "^22.10.5",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.17",
  "eslint": "^9.18.0",
  "eslint-config-next": "^15.1.6"
}
```

**Purpose of Each**:
- `typescript`: Type checking
- `@types/*`: Type definitions
- `postcss`: CSS processing (Tailwind requirement)
- `tailwindcss`: Utility CSS framework
- `eslint` + config: Code linting

### 12.3 Installation Commands

```bash
# Install all dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint code
npm run lint
```

---

## 13. Deployment

### 13.1 Build Process

```bash
npm run build
```

**Output**:
- `.next/` directory with optimized production build
- Static assets in `.next/static/`
- Server code in `.next/server/`

### 13.2 Recommended Platforms

1. **Vercel** (Optimal for Next.js)
   - Zero-config deployment
   - Automatic HTTPS
   - CDN edge caching
   - Command: `vercel deploy`

2. **Netlify**
   - Good Next.js support
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **AWS Amplify**
   - Enterprise-grade
   - Custom domain support
   - Continuous deployment

4. **Docker** (Self-hosted)
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

### 13.3 Environment Variables

None required for current implementation.

**Future additions might include**:
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics
- `SPLINE_SCENE_URL`: 3D scene URLs


### 13.4 Pre-Deployment Checklist

- [ ] Run `npm run build` locally
- [ ] Test production build with `npm start`
- [ ] Verify all images load (add real images to `/public/work/`)
- [ ] Test theme divider on all devices
- [ ] Check WebGL2 support (fallback message if needed)
- [ ] Test keyboard navigation
- [ ] Verify responsive breakpoints
- [ ] Run lighthouse audit (aim for 90+ scores)
- [ ] Check browser console for errors
- [ ] Test with JavaScript disabled (graceful degradation)

---

## 14. Performance Requirements

### 14.1 Target Metrics

**Lighthouse Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

**Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Frame Rate**:
- Divider drag: 60fps
- Scroll animations: 60fps
- Sphere rotation: 60fps

### 14.2 Bundle Size

**JavaScript Bundle**:
- Target: < 300KB (gzipped)
- Current estimate: ~250KB

**CSS Bundle**:
- Target: < 50KB (gzipped)
- Current estimate: ~30KB

**Images**:
- Portfolio images: WebP format, < 200KB each
- Lazy loading for off-screen images
- Responsive srcset for different sizes

### 14.3 Optimization Strategies

1. **Code Splitting**:
   - Next.js automatic route-based splitting
   - Dynamic imports for heavy components

2. **Image Optimization**:
   ```tsx
   <Image 
     src="/work/project.webp"
     width={800}
     height={500}
     loading="lazy"
     alt="Project"
   />
   ```

3. **Tree Shaking**:
   - Import only used icons from lucide-react
   - Unused Tailwind classes purged automatically

4. **Caching**:
   - Static assets cached indefinitely
   - Next.js automatic caching headers

5. **Compression**:
   - Gzip/Brotli enabled by default on Vercel
   - Assets served from CDN

### 14.4 Rendering Strategy

**Static Generation (SSG)**:
- Pre-render at build time
- Serve static HTML
- Fastest possible delivery

**Client-Side Rendering**:
- Theme comparison (requires interactivity)
- Sphere animation (WebGL)
- Scroll animations (Intersection Observer)

**Hybrid Approach**:
- Static shell with interactive widgets
- Best of both worlds
