# CLAUDE.md

Project-specific guidance for AI coding agents.

<!-- XDS:START -->
Astryx v0.1.0 — 148 components

Before writing any UI code:
1. `npx astryx template --list` — find a related page pattern
2. `npx astryx template <name> --skeleton` — study layout structure (gap, padding, nesting)
3. `npx astryx component <Name>` — read props + examples for EVERY component you use

Templates are reference code — read them for composition patterns, not just scaffolding.
Full pages → dashboard (uses AppShell). Forms → contact-form. Tables → data-table. Settings → settings-sidebar.

No <div> anywhere — not for layout, not for wrappers, not for spacing. Use components.
Full-page shells → AppShell (not Layout). Sidebar nav → SideNav (not List).
No style={{}} — use the xstyle prop on components for custom styling.
If a component prop does what you need, use it — never replicate with CSS/stylex.
No magic values — run `npx astryx docs tokens` for spacing/color/radius.
To change accent/brand colors: `npx astryx theme` — never override --astryx-color-* in :root.

npx astryx component --list         148 components by category
npx astryx component <Name>         props, types, examples
npx astryx docs color                Semantic color tokens for surfaces, text, icons...
npx astryx docs elevation            Shadow tokens for visual elevation and inset st...
npx astryx docs icons                Semantic icon names available in the design sys...
npx astryx docs illustrations        Illustration guidelines for empty states, onboa...
npx astryx docs migration            How to migrate an existing Tailwind, shadcn, or...
npx astryx docs motion               Duration and easing tokens for animations and t...
npx astryx docs principles           Core design principles and rules for building w...
npx astryx docs shape                Border radius tokens for consistent component r...
npx astryx docs spacing              Spacing scale tokens for padding, gap, and marg...
npx astryx docs styling              How to customize component appearance: xstyle p...
npx astryx docs theme                Theme provider, custom themes, theme build for ...
npx astryx docs tokens               tokens
npx astryx docs typography           Font families, geometric type scale, weight, li...
npx astryx template --list           page recipes with component lists
npx astryx template <name> [path]     scaffold from template
npx astryx swizzle <Name>            eject source (--gap to report why)
npx astryx upgrade --apply            codemods after version bump
after @astryxdesign/core bump, always run npx astryx upgrade --apply
<!-- XDS:END -->
