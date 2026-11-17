---
name: icon
description: Select, reuse, generate, and validate icons for the IQB Design System. Use whenever a page, component, pattern, button, menu, navigation item, form control, status, or action needs an icon; when mapping business language to an icon semantic; when creating or reviewing SVG icon markup; or when checking an existing icon against the IQB visual and SVG contracts.
---

# IQB Icon Skill

Use this skill as the single execution contract for IQB UI icons. Preserve the existing IQB icon language. Never invent a parallel style.

## Required workflow

Follow every step in order. Do not jump from a requirement directly to SVG generation.

```text
Detect icon requirement
→ Identify semantic intent
→ Search existing icons
→ Reuse an exact, equivalent, or suitable similar icon
→ Generate only when no suitable icon exists
→ Validate the result
→ Output the reused reference or real SVG
```

### 1. Identify semantic intent

Describe the user action, object, status, or state before choosing a name or shape. Match the functional meaning rather than the business copy or field name.

- Map “保存修改” to `Save`; do not create `SaveEdit` or `SubmitSave`.
- Interpret “导出数据” as `Export` or `Download` according to the actual behavior; do not create `ExportData` by default.
- Distinguish `RemoveUser`, `DeleteUser`, and `UnbindUser` by the operation's real consequence.
- Ask for clarification only when different meanings would lead to materially different icons and repository context does not resolve the ambiguity.

Name a new icon by semantic meaning in PascalCase, for example `Add`, `Delete`, `Search`, `Download`, `Upload`, `Settings`, `Calendar`, `User`, `Edit`, `Refresh`, `ChevronDown`, or `ArrowRight`. Exclude color, size, component, and page names.

### 2. Search the existing library

Search before drawing. Inspect the current project and any icon dependency already used by it. In this repository, search `styles/icon.html`, `styles.html`, component HTML, SVG files, sprite symbols, icon components, and icon-related CSS or tokens.

Search in this priority order:

1. Exact semantic name and visible label.
2. Synonyms and equivalent actions or objects.
3. SVG path, symbol ID, component, or CSS class associated with the meaning.
4. Similar icons whose established semantic already covers the requirement.

Use repository-native search, for example:

```bash
rg -n -i 'download|export|下载|导出|icon' .
rg -n '<svg|<symbol|<use|viewBox=' --glob '*.{html,svg,tsx,jsx,vue}' .
```

Exclude generated dependencies and build output when they create noise. Inspect candidate markup and surrounding labels; do not treat a text match alone as semantic proof.

Apply this decision order:

```text
Exact semantic match
→ Equivalent semantic match
→ Existing similar icon that truthfully represents the action
→ Generate a new icon
```

Reuse the established source/component/reference instead of copying or redrawing it when the project exposes a reusable icon API. Do not create business-specific variants of an existing universal semantic.

### 3. Generate only when necessary

Generate a new SVG only after recording that no candidate accurately represents the intended meaning. Use simple primitives first: `line`, `circle`, rounded `rect`, `polyline`, and simple `path`. Minimize Bézier curves, anchor points, fragments, decoration, and literal detail.

Maintain simple, readable, geometric, balanced construction and match the visual weight of nearby IQB icons. Keep repeated spacing, corner treatment, alignment, and strokes consistent. Prefer gentle rounded corners for rectangular forms. Keep primary paths inside the recommended 2px safe area and optically center the result.

## Visual contract

- Canvas and `viewBox`: `0 0 24 24`.
- Recommended safe area: `2px`; do not place primary paths against the canvas edge.
- Default style: line/outline.
- Stroke width: `2` at every rendered size.
- Line cap: `round`.
- Line join: `round`.
- Default fill: `none`.
- Color: `currentColor` inherited from the parent component's semantic token.
- Geometry: simple, clear, consistent, and optically balanced.
- Display size: let the component control CSS width and height. Do not redraw the icon for a 16px or other display size.

Allow filled icons only when an existing IQB rule uses fill to communicate a state such as selected, active, favorite, status, or another explicitly defined special state. Outline-to-filled must communicate a state change, not decoration.

Do not hardcode HEX or other presentation colors in an ordinary UI icon. Allow fixed or multiple colors only for an explicitly defined multicolor graphic asset outside the default UI icon system.

## Component boundary

Let the component contract define placement, rendered size, gap, interaction, and state. Let this skill define semantic selection, source shape, stroke, reuse/generation, and SVG validity.

For example, a button may specify a 16px start icon with an 8px gap. Keep the icon's drawing canvas at 24×24 and render it at 16px through the component.

Icons normally inherit hover, active, selected, disabled, error, and other colors from their parent. Do not add a second independent state-color system to SVG paths.

## SVG output contract

When generating, output real SVG markup based on this structure:

```html
<svg
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <path
    d="..."
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

Apply the same stroke contract to every `path`, `circle`, `rect`, `line`, and `polyline`, either directly or through equivalent attributes on the root SVG. For decorative icons, keep `aria-hidden="true"` and `focusable="false"`. If an icon-only control needs an accessible name, put it on the control (`aria-label` or visible text), not on a duplicate decorative SVG.

Never substitute an Emoji, Unicode symbol, text character, CSS-border construction, collection of `div` elements, background image, random network image, or unconstrained third-party icon for an IQB UI icon.

## Validation gate

Validate every newly generated icon and every icon explicitly submitted for review. Do not deliver a failed candidate; correct it and validate again.

- [ ] Search confirmed that an identical semantic icon does not already exist.
- [ ] The requirement genuinely needs a new icon.
- [ ] The name reflects semantic meaning, not page, size, color, or copy.
- [ ] `viewBox` is `0 0 24 24`.
- [ ] Primary geometry respects the recommended 2px safe area and is optically centered.
- [ ] Default presentation is outline with `fill="none"`.
- [ ] Every stroke is `2` with round line caps and joins.
- [ ] Color uses `currentColor` and contains no hardcoded HEX.
- [ ] Paths and anchor points are no more complex than the meaning requires.
- [ ] Visual weight, geometry, alignment, and corner treatment match existing IQB icons.
- [ ] Filled treatment, if any, communicates an explicitly supported state.
- [ ] Output is real, accessible SVG and the parent component owns rendered size and state color.

## Deliverable

For reuse, return the chosen existing icon's semantic name and its project source/component reference. For generation, return the semantic name, the search conclusion that justified creation, and the validated SVG. When editing project code, use the established local component or markup pattern and avoid unrelated changes.
