# DevSecOpsTest-UI

Single-page React app that renders the "MINI DBP" mobile screen (Figma export `one-screen.json`): greeting, stats, a tip card, trip search/filter, three vehicle trip cards (one with a 30-second accept countdown), and a bottom navigation bar.

## Stack

- [React](https://react.dev) 19 + TypeScript
- [Vite](https://vite.dev) 8
- [Tailwind CSS](https://tailwindcss.com) 4
- [Phosphor Icons](https://phosphoricons.com) for React
- oxlint for linting

## Scripts

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check and build for production
npm run lint    # run oxlint
npm run preview # serve the production build
```

## Notes

- The Figma export contains no image bytes, so the photo and illustration areas use gradient placeholders.
- All content is static sample data defined at the top of `src/App.tsx`.
