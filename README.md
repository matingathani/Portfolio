# Matin Gathani Portfolio

Production-ready personal portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, React Three Fiber, and react-pdf.

## Setup
```bash
npm install
npm run dev
```

## Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=your_smtp_host
SMTP_PORT=465
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
CONTACT_TO_EMAIL=you@domain.com
CONTACT_FROM_EMAIL=portfolio@domain.com
```

## Resume PDF
Replace `public/MatinGathaniResume2026.pdf` with your latest resume (or update the path in `app/page.tsx`).

## Local Development
```bash
npm run dev
```

## Production Build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push the repo to GitHub.
2. Create a new Vercel project and import the repo.
3. Add the environment variables listed above.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

## Editing Content
All editable content lives in `lib/content.ts`. Update experience, projects, skills, and contact info there.

## Routes
- `/` Single-page experience (hero, experience, projects, skills, resume, contact)
- `/about` Narrative background
- `/blog` Notes and insights

## 3D Scene
The hero scene is in `components/Hero3D.tsx`. The secondary 3D element is in `components/Signal3D.tsx`.

## Notes
- `react-pdf` uses `/public/pdf.worker.min.js` copied via `scripts/copy-pdf-worker.js` on install.
- The contact API route is `/app/api/contact/route.ts` using Nodemailer.
