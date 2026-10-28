# PsyLab Practicals

Interactive study site for the M.Sc. Psychology practical record **Assessment of Personality and Cognition (24MPSYS151)**.

- Viva intros: Cognition, Memory, Personality, Viva essentials
- 8 experiments, each split into: introduction, aim & plan, materials & variables, procedure, precautions, scoring & norms, results & discussion, rapport questions
- Live mini-experiments: cueing on recall, chunking, MIQ, SOLAT scoring
- Norms checkers: sten, EPQ-R cut-offs, NEO T-scores, Bell's Adjustment Inventory, z/T/sten/percentile converter
- 60 flashcards, 36-question viva quiz (15 random per round)
- 65 situational rapport questions (8–9 per experiment)

It's one static file (`index.html`), with no build step and no dependencies.

## Put it on GitHub

```sh
cd psych-practicals-study
gh repo create psylab-practicals --public --source=. --push
```

No `gh`? Create an empty repo on github.com, then:

```sh
git remote add origin https://github.com/<you>/psylab-practicals.git
git push -u origin main
```

## Deploy on Vercel

1. vercel.com → **Add New → Project** → import the `psylab-practicals` repo.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. **Deploy**. Every push to `main` redeploys automatically.

Or from a terminal: `npx vercel --prod`.

## Editing

Edit `src/page.html`, then run `sh build.sh` to regenerate `index.html`.
