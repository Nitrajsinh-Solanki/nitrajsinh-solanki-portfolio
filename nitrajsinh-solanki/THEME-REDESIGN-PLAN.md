# Portfolio Theme Redesign Plan
## Warm Editorial Light

**Status:** Planning only  
**Purpose:** Document the complete visual redesign before implementation.  
**Scope:** Visual styling and layout only. This file is a plan; it does not authorize unrelated code changes.

---

## 1. Design direction

Replace the current dark navy / teal developer look with **Warm Editorial Light**: an airy, premium, editorial-style portfolio with warm off-white surfaces, near-black typography, and controlled indigo accents.

The site should feel like a polished engineering portfolio—not a dashboard, terminal, gaming UI, or neon landing page. The developer's projects and results should be the main visual focus.

### Design principles

- **Quiet, not empty:** use deliberate whitespace and clear section hierarchy.
- **Content first:** project screenshots, engineering contributions, outcomes, and readable copy are more prominent than decoration.
- **One accent color:** reserve indigo for links, primary actions, selected states, and small emphasis.
- **Consistent surfaces:** use a small set of background, card, border, and text colors throughout every route.
- **Restrained motion:** retain only subtle interactions that add clarity. Avoid persistent effects that compete with content.
- **Mobile first:** ensure the hero, project cards, forms, navigation, and case studies remain comfortable to read and use on small screens.

---

## 2. Color system

Define reusable CSS variables in **app/globals.css** and use them consistently instead of repeating unrelated hex values throughout components.

| Token | Hex | Use |
|---|---|---|
| Page background | #F8F7F3 | Default page and section background |
| Surface | #FFFFFF | Project cards, form fields, content panels |
| Surface alternate | #F0EEE8 | Quiet alternate sections and subtle callouts |
| Primary text | #17191D | Headings and important copy |
| Secondary text | #555963 | Body copy and descriptions |
| Muted text | #737780 | Metadata, dates, captions; keep readable |
| Border | #E3E0D8 | Card outlines, dividers, input borders |
| Primary accent | #4F46E5 | Main buttons, links, active states, selected labels |
| Accent hover | #4338CA | Hover/pressed state for primary accent |
| Accent tint | #EEF2FF | Small highlighted surfaces, tags, and active states |
| Dark contrast surface | #17191D | Optional contact CTA/footer panel |
| Dark surface text | #F8F7F3 | Text placed on the dark contrast surface |
| Focus indicator | #4F46E5 | Keyboard-visible focus ring |

### Color rules

- Do not use the current deep navy background as the default page background.
- Retire bright teal as the main accent; do not mix teal, blue, purple, and multiple gradients.
- Do not give every card its own background color. Default cards should be white with a thin neutral border.
- Use the dark contrast surface sparingly—ideally the final contact call-to-action and/or footer only.
- Avoid low-opacity gray text that becomes unreadable on mobile.
- Keep all text and controls at accessible contrast levels; verify actual foreground/background combinations rather than assuming the palette is compliant.
- Use neutral gray for inactive metadata; indigo should communicate interaction or meaningful emphasis.

---

## 3. Typography

Keep the fonts already loaded by the app. Do not add a new font dependency for this redesign.

- **Display/headings:** Syne, using bold weights for strong hero and section headlines.
- **Body/UI:** DM Sans for paragraphs, navigation, buttons, forms, and card descriptions.
- **Technical labels:** DM Mono only for small metadata, project categories, stack labels, and optional code-like details.

### Typography hierarchy

- Desktop hero heading: approximately 56–72px, with tight line height and a readable max width.
- Mobile hero heading: approximately 36–44px; avoid oversized text that pushes the primary action too far below the fold.
- Section headings: approximately 32–44px desktop and 28–34px mobile.
- Card headings: approximately 20–24px.
- Body text: approximately 16–18px, with comfortable line height around 1.6–1.75.
- Metadata / overlines: approximately 12–13px, medium weight, and readable contrast.

### Rules

- Keep paragraphs at a comfortable measure; avoid long full-width lines.
- Use uppercase mono labels sparingly as small section markers, not for every sentence.
- Avoid mixing many font sizes and weights in a single card.
- Ensure headings wrap naturally on small screens without awkward one-word lines.

---

## 4. Global layout and shared components

### Page background and section rhythm

- Set the base page background and text colors to the new theme tokens.
- Alternate white and warm-neutral sections only where that helps distinguish content; do not create a checkerboard effect.
- Use consistent vertical spacing: roughly 88–120px between major sections on desktop and 56–80px on mobile.
- Keep content inside a consistent max-width container, approximately 1120–1200px, with responsive side padding.
- Use subtle 1px borders instead of heavy shadows. If a shadow is needed, keep it soft and low contrast.
- Use consistent corner radii: medium for controls, larger for project/content cards. Avoid excessive pill shapes around large panels.
- Standardize section header spacing, card padding, button heights, borders, and hover behavior.

### Navbar — app/components/Navbar.tsx

**Target appearance:** clean, quiet, and premium.

- Use a warm off-white background with a subtle bottom border.
- Keep the brand/name in strong dark text.
- Use dark neutral navigation links; indicate the active section with indigo text or a small underline.
- Use one indigo primary CTA only if the existing navigation already includes a contact action.
- If sticky, maintain a solid, readable background when scrolling; avoid strong blur or glass effects that reduce clarity.
- Keep the mobile menu compact and easy to tap. Ensure it closes correctly and has visible keyboard focus.
- Remove neon glows, gradients, oversized pill backgrounds, or decorative effects that do not help navigation.

---

## 5. Homepage sections

### Hero — app/components/Hero.tsx

**Target appearance:** strong editorial headline, clear introduction, and two obvious next steps.

- Use the warm background and near-black typography.
- Keep one small, restrained overline for the developer role or location.
- Make the main headline the strongest element; highlight at most one short phrase in indigo.
- Use a short supporting sentence describing full-stack/web/mobile engineering and problem-solving. Preserve truthful existing content.
- Keep the primary project CTA indigo-filled and the secondary contact/resume CTA outlined or text-based.
- Keep profile imagery, if already present, in a clean rectangular or softly rounded frame with a neutral border. No rotating neon ring.
- Remove the dot-grid background, strong gradients, animated orbit decorations, and repeated glowing accents.
- Remove or greatly reduce decorative cursor blinking and typewriter effects if they make the page feel busy. The core introduction must be immediately visible and must not wait for an animation.
- Keep any availability/status indicator small and accessible, not a bright glowing dot.
- At mobile sizes, stack the layout cleanly and keep the headline and primary CTA near the top.

### About — app/components/About.tsx

**Target appearance:** readable biography with restrained supporting details.

- Use plain readable paragraphs on the page or a white content surface.
- Use a two-column layout on desktop only if the existing content benefits from it; stack naturally on mobile.
- Render education, achievements, location, or key facts as tidy rows or small neutral chips.
- Use indigo only for meaningful links or one selected label.
- Replace many bright tag colors, decorative borders, and dense badge clusters with neutral styling.
- Preserve all existing biography and facts; this is a visual redesign, not a content rewrite.

### Tech Stack — app/components/TechStack.tsx

**Target appearance:** organized skill groups, not a wall of glowing chips.

- Group technologies by the existing categories and preserve their labels.
- Use compact white or warm-neutral skill chips with a fine border and dark text.
- Use consistent icon size and baseline alignment. Keep original brand icons/colors only when they remain legible and visually balanced.
- Use small group headings and clear gaps between categories.
- Remove strong colored glows, loud gradients, excessive icon animation, and arbitrary color changes between chips.
- Ensure decorative icon details do not create redundant screen-reader announcements.

### Projects preview — app/components/ProjectsPreview.tsx

**Target appearance:** projects become the visual centerpiece of the homepage.

- Use a clean, consistent grid with large, well-cropped project previews where images already exist.
- Each card should have a clear hierarchy: screenshot/thumbnail, project title, concise description, technology tags, and a clear view-details/live-demo link if available.
- Prefer white cards with thin neutral borders; use a slight border/shadow change on hover.
- Keep the image treatment consistent across cards; avoid applying a different gradient to every project.
- Use muted technology tags and reserve indigo for links or one important action.
- Make title and action links easy to identify without relying on hover alone.
- Keep card heights and spacing consistent where practical; do not truncate key project context just to force equal heights.

### Services — app/components/Services.tsx

**Target appearance:** a clean set of service cards, with clear benefits.

- Use simple white cards, dark headings, readable descriptions, and neutral borders.
- Use small consistent icons if already present; do not add large decorative illustrations just to fill space.
- Make hover states subtle and consistent with project cards.
- Keep pricing/availability claims unchanged unless separately verified.
- Use a single indigo link or CTA where applicable rather than several different accent colors.

### Work history — app/components/WorkHistory.tsx

**Target appearance:** résumé-like experience timeline with a clear reading order.

- Use dark role titles and organization names; keep dates and location as readable muted metadata.
- Use a thin neutral timeline line and small indigo markers only if the existing layout is a timeline.
- Put descriptions and achievements in clean text blocks with comfortable line spacing.
- Make outcomes and responsibilities easy to scan; avoid enclosing every line in a separate badge.
- Keep timeline decorations secondary to the actual experience text.

### Contact — app/components/Contact.tsx

**Target appearance:** a confident, uncluttered closing CTA with a form that feels easy to use.

- Consider making the overall contact section a dark charcoal panel against the warm page background. Use off-white text and indigo for its main CTA.
- Keep form fields high contrast, with white or very light backgrounds, clear labels, neutral borders, and a clearly visible focus ring.
- Do not rely only on placeholder text as a field label.
- Make validation, sending, error, and success states distinguishable and readable.
- Keep required indicators and error messages accessible to assistive technology.
- Preserve the existing submission behavior, fields, integrations, and success/error logic.

### Footer — app/components/Footer.tsx

**Target appearance:** quiet, tidy, and visually connected to the contact area.

- Use either warm off-white with a top border or charcoal if the contact section is light; avoid stacking multiple large dark panels without a reason.
- Use simple text links with consistent spacing.
- Keep social icons the same size and provide accessible names.
- Reduce the prominence of copyright and secondary metadata.
- Remove decorative gradients, glowing borders, and excess motion.

---

## 6. Projects catalogue and individual project pages

Apply the same visual system to every project route, not just the homepage.

### Projects catalogue

- Match the homepage project cards and color tokens.
- Keep filters/categories, if present, compact, keyboard accessible, and visually consistent.
- Make project thumbnails, titles, and links feel like one system.
- Provide clear separation between page heading, any introduction, filters, and the project grid.
- Retain the existing project order, content, URLs, and filtering behavior.

### Project detail / Engineering Case Study pages

- Make the page read like a polished technical case study rather than a dashboard.
- Use a clear project title, concise summary, role/context metadata, and live/source links where already available.
- Present Challenge, Approach, Contribution, Outcome, technology stack, and other existing case-study information as readable sections.
- Use a white or warm-neutral reading surface, dark section headings, neutral dividers, and restrained indigo section markers.
- Make metrics and outcomes prominent with typography rather than large neon tiles.
- Use consistent image sizing and enough whitespace around screenshots.
- Keep long-form text comfortably narrow; avoid full-width paragraphs.
- Preserve all project details, route structures, SEO metadata, structured data, and links.

---

## 7. Secondary pages and shared page chrome

- Apply the Warm Editorial Light tokens to the About page and every other existing page, not only the homepage.
- Ensure page wrappers, headers, breadcrumbs, content cards, empty states, and not-found states follow the same background, text, border, and link rules.
- Use the same navigation and footer styling everywhere.
- Confirm every route has consistent top spacing under the navbar and consistent mobile side padding.
- Where a page intentionally uses a dark panel, treat it as an intentional contrast section—not a separate, competing theme.

---

## 8. Buttons, links, forms, cards, and interaction states

### Buttons

- **Primary:** indigo fill, white text, medium radius, clear hover and active states.
- **Secondary:** transparent/white fill, neutral border, dark text.
- **Text links:** dark by default or indigo where the link needs emphasis, with clear hover/focus styling.
- Standardize control height, font weight, horizontal padding, and disabled states.
- Avoid oversized glowing shadows, animated shine sweeps, gradient fills, and several button styles for the same action.

### Cards

- Use white background, neutral 1px border, consistent padding, and a restrained radius.
- Hover should change border/shadow slightly and optionally lift by a very small amount.
- Do not scale cards dramatically or animate every child separately.
- Preserve a visible distinction between clickable cards and non-interactive panels.

### Forms

- Use persistent labels, clear helper/error text, and neutral borders.
- Focused fields should have a clear indigo ring.
- Ensure placeholder text is supplementary rather than the only indication of what to enter.
- Keep error and success states readable without depending on color alone.

### Links and focus

- All interactive elements need a visible keyboard focus indicator.
- Underline text links where appropriate, especially in long-form content.
- Never communicate hover/active state through color alone if that makes the state unclear.

---

## 9. Motion and decoration cleanup

The redesign should feel calmer than the current theme.

- Remove the full-page dot-grid effect as a default decoration.
- Remove the rotating teal photo ring and persistent neon glow treatments.
- Reduce or remove blinking cursor animations if they distract from the introduction.
- Avoid large entrance animations that delay the visibility of key text or the LCP element.
- Keep only brief, subtle button/card transitions where useful.
- Respect the existing reduced-motion support; no feature should depend on animation to communicate essential information.
- Do not add video backgrounds, animated canvas effects, parallax, or new heavy visual dependencies.

---

## 10. Responsive behavior

### Desktop

- Use the main content width consistently.
- Keep section headings and grids aligned to the same page container.
- Use whitespace to separate sections rather than decorative separators everywhere.
- Avoid excessively wide text columns.

### Tablet

- Reduce grid columns where cards no longer have a comfortable width.
- Allow hero content to stack before text becomes cramped.
- Keep navigation and CTA controls from wrapping awkwardly.

### Mobile

- Use a single-column layout for project cards, case studies, services, and experience when needed.
- Keep side padding consistent, generally around 20–24px on common mobile widths.
- Keep body copy at readable sizes; avoid tiny labels and dense chip rows.
- Ensure buttons and navigation targets have comfortable touch areas.
- Prevent horizontal overflow, clipped shadows, or headings that collide with images.
- Make forms full-width and easy to complete.
- Check the site at narrow mobile widths as well as a typical phone viewport.

---

## 11. Accessibility and readability requirements

- Maintain semantic heading order and do not use headings purely for visual size.
- Check contrast for each text/surface pairing, particularly muted metadata and indigo links.
- Preserve keyboard navigation and visible focus rings.
- Use meaningful accessible names for interactive icons; hide purely decorative icons from assistive technology.
- Keep labels associated with form controls and announce form errors/statuses appropriately.
- Respect reduced-motion preferences.
- Avoid using color as the only way to convey status or selection.
- Recheck the accessibility tree after the redesign.

---

## 12. Performance and SEO guardrails

This task is a visual redesign, not an invitation to alter working SEO or application behavior.

- Do not add new font families, icon libraries, UI frameworks, animation packages, or heavy background assets.
- Reuse current image assets and existing components where practical.
- Keep the hero heading and visible introduction immediately renderable; do not hide them behind entry animations.
- Do not add unnecessary client-side state or JavaScript just for styling.
- Preserve page titles, metadata, canonical URLs, robots rules, sitemap behavior, structured data, and social preview configuration.
- Preserve project content, links, forms, navigation behavior, analytics, and existing data.
- Re-run production build, accessibility checks, and mobile PageSpeed after implementation. Compare results against the current baseline.
- Visual quality improvements must not come at the cost of LCP, accessibility, or navigation.

---

## 13. Suggested implementation order

1. **Design tokens:** add the Warm Editorial Light variables to app/globals.css and make the base body colors consistent in app/layout.tsx and page wrappers.
2. **Shared chrome:** restyle Navbar.tsx, Footer.tsx, and PageChrome.tsx so every route starts with the same visual language.
3. **Homepage foundation:** restyle Hero.tsx and standardize section containers and heading spacing.
4. **Content sections:** update About.tsx, TechStack.tsx, ProjectsPreview.tsx, Services.tsx, WorkHistory.tsx, and Contact.tsx.
5. **Project pages:** align the projects catalogue and each project detail/case-study route.
6. **Responsive and accessibility pass:** validate mobile layouts, keyboard focus, reduced motion, and contrast.
7. **Regression/performance pass:** check all routes, forms, navigation, links, build output, and mobile PageSpeed.

Implement in small, reviewable steps. Do not combine unrelated logic changes with visual changes.

---

## 14. Explicitly out of scope

Unless requested separately, do **not**:

- Rewrite biography, project descriptions, metrics, testimonials, or professional claims.
- Change project URLs, route structure, external links, or navigation behavior.
- Change form fields, API calls, submission logic, authentication, integrations, or backend behavior.
- Change SEO metadata, structured data, sitemap, robots directives, or indexing configuration.
- Add a theme switcher or support multiple competing themes.
- Add new animations, external imagery, or decorative libraries.
- Make unrelated code cleanup or performance configuration changes.

---

## 15. Definition of done

- [ ] Warm off-white, dark text, and indigo accents are used consistently across all routes.
- [ ] The former navy/teal/neon look no longer dominates the interface.
- [ ] Navbar, hero, all homepage sections, project catalogue, project details, secondary pages, and footer share a coherent design.
- [ ] Project screenshots and case-study outcomes are easy to notice and understand.
- [ ] Typography, card spacing, borders, radii, and button states are consistent.
- [ ] Desktop, tablet, and mobile layouts contain no horizontal overflow or broken wrapping.
- [ ] Text and controls remain readable with accessible contrast and keyboard focus.
- [ ] Reduced-motion preferences remain respected.
- [ ] All content, links, routes, forms, and SEO behavior still work.
- [ ] Production build and regression checks pass.
- [ ] Mobile PageSpeed is measured after implementation and does not regress without an identified reason.

**Final design decision:** Warm Editorial Light is the single target theme. Do not mix it with the previous neon terminal style or implement a second theme.
