# Amritanshu Singh — Developer Portfolio

The personal portfolio of Amritanshu Singh, a full-stack developer and
Computer Science student based in Bengaluru. The site presents selected
projects, development services, education, problem-solving work, and contact
links in an editorial-style single-page experience.

**Live site:** [amrittt22.me](https://amrittt22.me/)

## What is on the site

The portfolio is organized into five sections:

- **Hero:** Introduction, availability status, portrait, and links to GitHub,
  LinkedIn, LeetCode, GeeksforGeeks, and email.
- **Selected Work:** Filterable project cards with `All`, `Full Stack`, and
  `Systems & Tools` views. Selecting a card opens a detailed project view with
  tags, tools, description, screenshots, and a relevant external link.
- **Services:** Expandable descriptions for full-stack development, backend and
  data systems, core programming and DSA, and tools and automation.
- **Experience:** Education at NMIT Bengaluru, independent full-stack and
  systems work, the DayFlow hackathon project, and competitive programming.
- **Contact:** A project invitation and direct email CTA, followed by social
  links in the footer.

## Featured projects

| Project | Description | Status |
|---|---|---|
| [DayFlow](https://dayflowhrm-eq7f4z79.manus.space/app) | Full-stack HRMS with employee and HR/Admin views, attendance, leave, payroll, announcements, chat, and Google Meet collaboration. | Live platform |
| [DevFlow](https://github.com/Amrittt22/DevFlow) | Team collaboration platform with workspaces, projects, Kanban, list and calendar views, labels, assignments, invitations, and workspace roles. | In development |
| [Live Leaderboard Using Redis](https://github.com/Amrittt22/live-leaderboard-using-redis) | Node.js and Express leaderboard backed by Redis Sorted Sets, with a browser UI, JSON API, automatic refresh, and Docker Compose setup. | Open source |
| [Zonify](https://github.com/Amrittt22/Zonify-Extension) | Manifest V3 Chrome focus timer and site blocker with persistent timers, declarative blocking, options, statistics, CI, and tagged releases. | Chrome extension |

## Technology

- **Portfolio:** Semantic HTML, CSS, and vanilla JavaScript
- **Languages:** C++, JavaScript, TypeScript, HTML, and CSS
- **Frontend:** React, React 18, Tailwind CSS, Vite, and CRXJS
- **Backend and data:** Node.js, Express, tRPC, PostgreSQL, Supabase,
  Prisma, Redis Sorted Sets, and REST APIs
- **Tools:** Git, GitHub, Docker Compose, Postman, Linux, and Vercel
- **Problem solving:** 500+ problems across LeetCode and GeeksforGeeks

## Interactive features

- Responsive editorial layout with an animated cloud backdrop and floating
  project previews.
- Project filtering and accessible project detail dialog with keyboard-aware
  navigation and scroll locking.
- Expandable service rows with preview imagery.
- Cursor-following previews in the Experience section.
- LeetCode statistics loaded live on first interaction; GeeksforGeeks
  statistics use the available profile data with a static fallback when the
  external request is unavailable.

## Local development

This repository does not require a frontend framework or package installation
to edit the source. Node.js is used for the static build script and the
development server.

```bash
git clone https://github.com/Amrittt22/portfolio.git
cd portfolio
npm run build
npm run start
```

Available scripts:

| Command | Purpose |
|---|---|
| `npm run dev` | Serve the repository locally |
| `npm run build` | Copy the site into `dist/` and syntax-check `dist/script.js` |
| `npm run start` | Serve the repository locally |

The build copies `index.html`, `styles.css`, `script.js`, and `assets/` into
`dist/`. Vercel uses `npm run build` and deploys `dist/`, as configured in
[`vercel.json`](./vercel.json).

## Repository structure

```text
index.html       Page structure and project detail dialog
styles.css       Layout, responsive styles, animation, and visual system
script.js        Project data and interactive behavior
build.js         Static production build
assets/          Portfolio imagery, project screenshots, and stats graphics
public/images/   Additional source imagery
vercel.json      Vercel build and output configuration
```

## Connect

- [GitHub](https://github.com/Amrittt22)
- [LinkedIn](https://www.linkedin.com/in/amritanshu-kumar-singh-203254333/)
- [LeetCode](https://leetcode.com/u/amrittt_22)
- [GeeksforGeeks](https://www.geeksforgeeks.org/profile/amritansh35xf/)
- [Email](mailto:amritanshusingh2205@gmail.com)
