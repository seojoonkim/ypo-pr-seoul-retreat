# Implementation Plan for Retreat and Schedule Tabs (Tone and Manner Revamp)

## Objective
The user requested to redesign the 1st ("Retreat Information") and 2nd ("Schedule") tabs so that their "tone and manner," density, and sizing match the 3rd ("Landmarks") and 4th ("Restaurants") tabs. Additionally, the content should be much more detailed. For the Schedule tab, the user explicitly asked for a 3-day calendar visible on a single screen without needing to switch tabs.

## 1. Redesign "Retreat Information" Tab
- **Structure Update (`retreat/index.html`)**:
  - Add a styled header analogous to the Landmark/Restaurant sections if necessary (or keep the `hero` section but stylize it to match the banner aesthetics).
  - Expand the "행사 개요" (Overview), "핵심 테마" (Core Themes) sections with more dense content and visually appealing grids (like the Landmark cards).
  - Include specific details from the `pdf_content.txt` (e.g., specific venue names like Westin Josun Parnas, Grand InterContinental Seoul Parnas, expected attendees, exact dates, and purpose).
  - Implement a sleek "About" section format similar to the one used in the Restaurant tab.

- **Style Update (`retreat/style.css`)**:
  - Adopt CSS variables, fonts, colors, and shadow treatments strictly matching `landmark/style.css` and `restaurant/style.css`.
  - Use card layouts with badges, icons, and dense typography (smaller font sizes, tighter line heights but clean readability).

## 2. Redesign "Schedule" Tab
- **Structure Update (`schedule/index.html`)**:
  - Remove the horizontal Day Selector (since all 3 days will be shown at once).
  - Use a 3-column grid layout (`grid-template-columns: repeat(3, 1fr)`) to show Day 1, Day 2, and Day 3 side by side on desktop.
  - On mobile (`@media (max-width: 768px)`), stack them vertically.
  - Ensure the cards/timeline items inside each day's column are dense, clean, and match the detail-rich look of the Landmark cards. Include times, icons, titles, and locations.

- **Logic Update (`schedule/app.js`)**:
  - Instead of switching days and rendering one day, iterate over `scheduleData` and render all 3 days simultaneously into a 3-column container.
  - The modal logic remains, but we add more details from the PDF (e.g., specifying locations like Hwigyeomjae, Seonhaewon, Onjium, or bus transportation) to the data source if needed.

- **Data Update (`schedule/data.js`)**:
  - Verify if we can add more specific details from `pdf_content.txt` to the `desc` and `details` fields to meet the "much more detailed content" requirement. 

- **Style Update (`schedule/style.css`)**:
  - Implement the 3-column CSS grid.
  - Refine timeline details (dots, connecting lines, spacing) to look sharp and dense, using the exact color tokens (`var(--accent-violet)`, etc.).

## 3. Step-by-Step Execution
1. [ ] Rewrite `schedule/index.html`, `schedule/style.css`, and `schedule/app.js` for the 3-day view.
2. [ ] Enhance `retreat/index.html` and `retreat/style.css` to add density and more PDF content. 
3. [ ] Verify Vercel deployment if time permits (or verify no syntax errors exist).
