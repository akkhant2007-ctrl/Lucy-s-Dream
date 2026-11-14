# Mission Architect
A complete NASA Space Apps 2026 Space Mission Design Game vertical slice.

## Implemented phases
1. Mission objective
2. Mission architecture
3. Orbit selection
4. Spacecraft configuration
5. Launch, ground and operations segments
6. Mission simulation
7. Post-mission design review

The simplified engineering model couples mass, power, data, budget, launch compatibility, science return and risk. Values are gameplay abstractions and should be replaced with sourced mission/component data for a competition submission.

## Run locally
```bash
npm install
npm run dev
```

## Deploy on Vercel
1. Upload this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
