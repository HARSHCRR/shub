# Theme Comparison Component

## Overview

The theme comparison component creates an interactive, draggable vertical divider that reveals light and dark theme versions of the entire website in real-time. This is NOT an image comparison — it renders the actual website content twice with different themes and uses CSS `clip-path` to reveal each side.

## Features

### ✨ Interactive Divider
- **Vertical draggable handle** with smooth interaction
- **Mouse support** - Click and drag
- **Touch support** - Mobile-friendly swipe
- **Keyboard support** - Arrow keys (←/→) to move divider
- **Starts at 50%** for balanced initial view

### 🎨 Theme System

#### Light Theme (Left Side)
```css
Background:  #ECECEC
Text:        #000000  
Buttons:     Black
Sphere:      Black (#000000)
Borders:     rgba(0, 0, 0, 0.15)
Cards:       #FFFFFF
Dark Cards:  #E5E5E5
```

#### Dark Theme (Right Side)
```css
Background:  #000000
Text:        #FFFFFF
Buttons:     White
Sphere:      White (#FFFFFF)
Borders:     rgba(255, 255, 255, 0.15)
Cards:       #171717
Dark Cards:  #1C1C1E
```

### 🌐 Sphere Integration

The 21st.dev DitheringShader sphere participates in the theme transition:
- **Single sphere** - no duplication
- **Color changes** based on visible theme
- **Smooth transition** - no flickering
- **Animation preserved** - rotation continues seamlessly
- **Responsive sizing** - adapts to viewport

## Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── theme-comparison.tsx      # Main comparison wrapper
│   │   └── dithering-shader.tsx      # 21st.dev sphere component
│   ├── ThemeAwareHero.tsx            # Hero with dynamic sphere color
│   ├── PageContent.tsx               # All page sections
│   └── [other components...]         # Nav, Work, Services, etc.
└── app/
    ├── page.tsx                      # Wraps content in ThemeComparison
    └── globals.css                   # Theme CSS variables
```

### How It Works

1. **Dual Rendering**
   ```tsx
   <ThemeComparison>
     <PageContent />
   </ThemeComparison>
   ```
   - Renders `PageContent` twice
   - Bottom layer: `.theme-dark` class
   - Top layer: `.theme-light` class + `clip-path`

2. **Clip-Path Reveal**
   ```tsx
   clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`
   ```
   - Clips the light theme layer based on divider position
   - Reveals dark theme underneath
   - GPU-accelerated for smooth performance

3. **Theme CSS Variables**
   ```css
   .theme-light {
     --bg: #ECECEC;
     --fg: #000000;
     --sphere-color: #000000;
   }
   
   .theme-dark {
     --bg: #000000;
     --fg: #FFFFFF;
     --sphere-color: #FFFFFF;
   }
   ```
   - Components inherit colors via CSS variables
   - Automatic color switching per theme
   - No prop drilling required

4. **Sphere Color Sync**
   ```tsx
   const color = getComputedStyle(container)
     .getPropertyValue('--sphere-color');
   ```
   - Reads CSS variable from parent theme
   - Updates sphere color dynamically
   - Uses `MutationObserver` for reactivity

## Usage

### Installation

```bash
npm install
npm run dev
```

### Dependencies

- `lucide-react` - GripVertical icon for handle
- `clsx` + `tailwind-merge` - Utility functions
- WebGL2 support required for sphere rendering

### Customization

#### Change Theme Colors

Edit `src/app/globals.css`:

```css
.theme-light {
  --bg: #YOUR_COLOR;
  --fg: #YOUR_COLOR;
  --sphere-color: #YOUR_COLOR;
}
```

#### Adjust Divider Starting Position

Edit `src/components/ui/theme-comparison.tsx`:

```tsx
const [dividerPosition, setDividerPosition] = useState(50) // 0-100
```

#### Modify Handle Appearance

```tsx
<div className="...your-classes">
  <GripVertical className="w-6 h-6 text-gray-800" />
</div>
```

## Performance Optimizations

### Implemented

- ✅ **useMemo** for clip-path calculation
- ✅ **CSS clip-path** (GPU-accelerated)
- ✅ **Single event listener** cleanup
- ✅ **RequestAnimationFrame** implicit in React state
- ✅ **Ref-based DOM access** (no querySelector)
- ✅ **Passive event listeners** where possible

### Rendering Behavior

- **Two full page renders** - necessary for real-time theme preview
- **Shared component instances** - React optimizes duplicate trees
- **No re-renders during drag** - only state update, no layout thrashing
- **Smooth 60fps** on modern devices

## Browser Support

- ✅ Chrome/Edge (WebGL2 + clip-path)
- ✅ Firefox (WebGL2 + clip-path)
- ✅ Safari 13.1+ (WebGL2 + clip-path)
- ⚠️ IE11 - Not supported (no WebGL2)

## Accessibility

### Keyboard Navigation
- `ArrowLeft` - Move divider left (show more dark theme)
- `ArrowRight` - Move divider right (show more light theme)
- `Tab` - Focus on handle
- `Enter/Space` - Could be enhanced for preset positions

### ARIA Labels
```tsx
<div
  role="slider"
  aria-label="Theme divider handle"
  aria-valuenow={dividerPosition}
  aria-valuemin={0}
  aria-valuemax={100}
  tabIndex={0}
>
```

### Screen Reader Support
- Region labeled "Theme comparison slider"
- Slider announces current position
- Keyboard controls clearly mapped

## Troubleshooting

### Sphere not changing color
- Check CSS variable inheritance
- Verify `--sphere-color` in DevTools
- Ensure `MutationObserver` is active

### Dragging feels laggy
- Reduce sphere `pxSize` (less rendering)
- Check for other heavy animations
- Profile with Chrome DevTools Performance tab

### Theme not applying to components
- Verify component uses semantic classes (`bg-background`, `text-foreground`)
- Check if inline styles override theme
- Ensure parent has `.theme-light` or `.theme-dark` class

### Double scrollbar / layout issues
- Check `overflow-hidden` on comparison container
- Verify no fixed positioning conflicts
- Test with `position: absolute` on theme layers

## Future Enhancements

### Potential Features
- [ ] Preset divider positions (33%, 50%, 66%)
- [ ] Auto-animate divider on mount
- [ ] Invert effect (flip light/dark sides)
- [ ] Horizontal divider option for mobile
- [ ] Theme persistence via localStorage
- [ ] Custom easing for keyboard movements
- [ ] Blur/fade transition effects
- [ ] Multiple theme support (3+ themes)

### Performance
- [ ] Virtualized rendering for long pages
- [ ] Lazy load off-screen sections
- [ ] Debounce divider position updates
- [ ] Web Worker for sphere calculations

## Credits

- **21st.dev Sphere** - DitheringShader WebGL component
- **lucide-react** - Icon library
- **Tailwind CSS** - Utility-first styling
- **Next.js 15** - React framework

## License

Same as parent project.
