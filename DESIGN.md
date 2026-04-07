# Design System Strategy: Electric Precision

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Architect."** 

This system moves away from the static, "boxed-in" nature of traditional developer portfolios. Instead of a standard grid, we treat the interface as a living blueprint—a high-energy environment where code meets craftsmanship. By utilizing a "Dark Mode First" philosophy, we leverage high-contrast neon accents against charcoal depths to simulate a terminal-inspired world that feels premium and editorial.

To break the "template" look, we employ **intentional asymmetry**. Large-scale typography should overlap container boundaries, and imagery should bleed off the canvas or sit within "floating" glass containers. We avoid symmetry in favor of dynamic balance, guiding the eye through a rhythmic flow of light and shadow.

---

## 2. Colors & Tonal Depth

This system is built on a foundation of "Dark Charcoal" layers, punctuated by "Electric Lime" to create a sense of high-performance energy.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through tonal shifts. 
- Use `surface_container_low` (#1B1B1C) for a section background.
- Place a `surface_container_lowest` (#0E0E0E) element inside it to create a "well" effect.
- Content is separated by white space and background transitions, never by structural lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#131313).
- **Secondary Depth:** `surface_container_low` for large content blocks.
- **Elevation High:** `surface_container_highest` (#353535) for interactive components like cards.
- **The "Glass & Gradient" Rule:** Floating elements (like navigation bars or modal overlays) must use a semi-transparent `surface_variant` (#353535 at 60% opacity) with a `backdrop-blur` of 12px–20px. This creates a "frosted glass" effect that allows the neon accents to bleed through from the background.

### Signature Textures
Main CTAs and Hero backgrounds should not be flat. Use a subtle linear gradient from `primary_container` (#C9F31C) to `surface_tint` (#AFD500) at a 135-degree angle. This adds a "chemical" vibrancy that feels expensive and custom-built.

---

## 3. Typography: The Editorial Edge

The typography strategy relies on dramatic scale contrasts to convey an "Architectural" feel.

- **Display Scale:** Use **Plus Jakarta Sans** for `display-lg` through `headline-sm`. These should be set with tight letter-spacing (-0.02em) to feel bold and authoritative.
- **Body Scale:** Use **Inter** for all `body` and `label` tiers. Inter’s technical precision balances the expressive nature of Plus Jakarta Sans.
- **Hierarchy Logic:** A `display-lg` headline should often be paired with a `label-md` in all-caps with increased letter-spacing (+0.1em). This "Big-and-Small" approach creates an editorial, magazine-like sophistication.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking" surface tokens. Place a `surface_container_highest` card on a `surface` background. The 10%–15% brightness difference provides enough contrast for the eye without visual clutter.
- **Ambient Shadows:** If a floating effect is required (e.g., a hover state), use a shadow with a blur of 40px, 0px offset, and 6% opacity using a color derived from `surface_tint`. This mimics a soft "glow" rather than a shadow.
- **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use the `outline_variant` token (#444933) at 20% opacity. This "Ghost Border" provides a hint of structure without breaking the seamless aesthetic.
- **Glowing Accents:** For high-impact elements, apply a 2px-4px "inner glow" or "outer bloom" using the `primary_fixed` (#C9F31C) color to simulate an illuminated hardware interface.

---

## 5. Components

### Buttons
- **Primary:** Filled with `primary_container` (#C9F31C). Text color must be `on_primary_container` (#586C00). No border. Roundedness: `md` (0.75rem). 
- **Secondary:** Transparent background with a `Ghost Border`. Text color: `primary_fixed`.
- **Interaction:** On hover, the primary button should emit a subtle glow (Box-shadow: 0 0 15px rgba(201, 243, 28, 0.4)).

### Cards (The "Glass" Container)
- **Styling:** Use `surface_container_low` with a `backdrop-filter: blur(10px)`. 
- **Prohibition:** No divider lines. Use `body-md` for description and `label-sm` for metadata, separated by 24px of vertical space.

### Chips (Tech Tags)
- **Selection Chips:** Use `surface_container_highest` with `label-md` text. Roundedness: `full`.
- **Action Chips:** Use `outline_variant` (20% opacity) border and `on_surface_variant` text.

### Input Fields
- **State:** Resting state has no fill, only a 1px `Ghost Border`. 
- **Active State:** The border glows with `primary_fixed` and the label shifts to the `primary_fixed` color.

### Additional Component: "The Kinetic Divider"
Instead of a horizontal rule, use a 1px tall element that uses a gradient from `primary_container` to transparent. This "fading edge" maintains the flow while providing a subtle structural hint.

---

## 6. Do's and Don'ts

### Do:
- **Use "Breathing Room":** Ensure that high-impact `display-lg` text has at least 80px of padding from other elements.
- **Embrace Asymmetry:** Place a small `label-sm` element off-center to create visual interest.
- **Tonal Transitions:** Use `surface_container_lowest` for footers to "ground" the page.

### Don't:
- **No 100% Black:** Never use #000000. Use `surface_container_lowest` (#0E0E0E) to maintain depth and allow for soft shadows.
- **No Heavy Borders:** Never use a 100% opaque border for a card or section. It destroys the glassmorphism effect.
- **No Generic Icons:** Avoid standard thin-line icons. Use "Duotone" or "Filled" icons that can take on the `primary_fixed` color to act as tiny light sources.
- **No Crowding:** This system is "High-End Editorial." If the UI feels "busy," remove an element or increase the spacing scale.