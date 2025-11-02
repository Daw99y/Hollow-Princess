# NE-S / California Mountain Snake [SS26]

A high-end fashion capsule collection website that combines medical aesthetics with luxury fashion storytelling. Built with Next.js, Tailwind CSS, and Framer Motion for an immersive design experience.

## Project Overview

NE-S presents "California Mountain Snake [SS26]" - a fashion capsule that merges sterile, futuristic medical aesthetics with high-end fashion design. The website serves as an immersive showcase rather than an e-commerce platform, focusing on visual storytelling and brand experience.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D**: Spline 3D
- **Smooth Scrolling**: Lenis
- **Typography**: Geist font family (Geist Sans, Geist Mono, UnifrakturMaguntia, Spectral)

## Design Principles

- **Aesthetic**: Surgical minimalism with glass, metal, and lab-like lighting
- **Color Palette**: White, glass, and neutral tones
- **Typography**: Wide-spaced, soft text using Geist fonts
- **Animation**: Subtle, precise, and cinematic transitions
- **Layout**: Negative space with central object focus

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/
│   ├── CapsuleHeader.tsx      # Frosted glass header with brand name
│   ├── ScrollIndicator.tsx    # Animated scroll indicator
│   ├── SplineScene.tsx        # 3D scene with camera controls
│   ├── WallNav.tsx            # Wall-based navigation
│   └── sections/              # Page sections
│       ├── Section1.tsx
│       ├── Section2.tsx
│       ├── Section3.tsx
│       └── Section4.tsx
├── hooks/
│   ├── useActiveSection.ts    # Track active section
│   └── useSmoothScroll.ts     # Smooth scroll with camera control
└── types/
    └── camera.ts              # Camera state types
```

## Key Features

- **3D Scene Integration**: Spline 3D scene with camera state management
- **Smooth Scrolling**: Lenis-powered smooth scrolling with section tracking
- **Wall Navigation**: Four-wall navigation system positioned at screen edges
- **Glass Morphism**: Frosted glass effects throughout the UI
- **Responsive Design**: Desktop-first with simplified mobile experience

## Development Guidelines

- Follow the surgical minimalism aesthetic in all design choices
- Use Tailwind classes for styling (no inline styles)
- Keep animations subtle and cinematic (under 1.2s for UI, under 2s for scroll)
- Maintain negative space and central object focus
- Use Geist font family with wide spacing for typography
- Implement glass effects with backdrop-blur for UI elements

## Performance Considerations

- Optimize Spline scene loading
- Use GPU-accelerated transforms for animations
- Implement proper cleanup in useEffect hooks
- Minimize re-renders with proper dependency arrays

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Spline](https://spline.design/) - 3D design tool

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
