# 🪽 Chris-Star.com
A company portal website for **Chris Star Enterprises**.

Undertook this task despite not being a developer myself, with the help of AI tools for free. I later found out this is referred to as "vibe coding." See the credited LLMs below.

## Credits
- [v0 Agent](https://v0.app) (initial generation)
- [DeepSeek Chat](https://chat.deepseek.com) (thereafter)
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) (testing)

---

## Package Manager & Build System
- **Package Manager**: **NPM**, not **PNPM** nor **Yarn**.
- **Build System**: **Next.js** + **TypeScript**, not **Gulp**.

---

## Core Framework Stack
- **Next.js** – React framework with App Router
- **React** – Frontend library
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling framework

---

## UI Component Libraries
- **Radix UI** – comprehensive headless component library (accordion, dialog, dropdown, etc.)
- **Lucide React** – icon library  
- **Geist** – font family  

---

## Styling & Animation
- **Tailwind CSS** – utility-first CSS framework  
- **tw-animate-css** – animation utilities for Tailwind  
- **tailwindcss-animate** – additional animations  
- **class-variance-authority** – component variant management  

---

## Form Handling
- **React Hook Form** – form state management  
- **Zod** – schema validation  
- **@hookform/resolvers** – form validation integration  

---

## Additional Libraries
- **next-themes** – theme switching  
- **sonner** – toast notifications  
- **recharts** – data visualization  
- **embla-carousel-react** – carousel component  
- **date-fns** – date utilities  

---

## Development Tools
- **PostCSS** – CSS processing  
- **Autoprefixer** – CSS vendor prefixing  

---

## Self-Hosting
```bash
git clone https://github.com/ChrisStarOfficial/Chris-Star.com.git
npm install
npm run dev
```

---

## 📦 Hosting Notes
- Root domain is hosted by Vercel.
- Wiki subdomain is self-hosted with MediaWiki.

---

## 📜 License
- This project (excluding the items listed below) is released under the **CC BY-NC-SA 4.0** license. You may remix and share with attribution, but no commercial use.
- 2D Minigame: This component is separately licensed from the main application. It is released under the **BSD-3-Clause** license, as per the original [t-rex-runner](https://github.com/wayou/t-rex-runner) code it's based on.
- Prime Radiant Model: This component is separately licensed from the main application. It is released under the **CC BY-SA 3.0** license, as per the original [Prime Radiant by SC1](https://www.thingiverse.com/thing:6340485/files) half-model it's based on.

---

## File Tree
    ├── 📂 app
    │   ├── 📂 api
    │   │   ├── 📂 debug-youtube
    │   │   │   └── 📄 route.ts
    │   │   └── 📂 youtube-videos
    │   │       └── 📄 route.ts
    │   ├── 📂 archives
    │   │   ├── 📂 compendia
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📂 vault
    │   │   │   └── 📄 page.tsx
    │   │   ├── 📂 wiki
    │   │   │   └── 📄 page.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📂 community
    │   │   ├── 📁 components
    │   │   │   ├── 📄 CommunityBenefits.tsx
    │   │   │   ├── 📄 CommunityCTA.tsx
    │   │   │   ├── 📄 CommunityFeatures.tsx
    │   │   │   ├── 📄 CommunityHero.tsx
    │   │   │   ├── 📄 CommunityNavigation.tsx
    │   │   │   ├── 📄 CommunityTestimonials.tsx
    │   │   │   ├── 📄 StarseedAcademyIcon.tsx
    │   │   │   └── 📄 StarseedCentralIcon.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📁 components
    │   │   ├── 📂 home
    │   │   │   ├── 📄 CommunityCTAHero.tsx
    │   │   │   ├── 📄 CompanySloganHero.tsx
    │   │   │   ├── 📄 LatestVideos.tsx
    │   │   │   ├── 📄 NextStep.tsx
    │   │   │   └── 📄 TransformationalLeadership.tsx
    │   │   └── 📂 not-found
    │   │       ├── 📄 ActivateProtocol.tsx
    │   │       ├── 📄 AnimatedTransition.tsx
    │   │       ├── 📄 BullRun.tsx
    │   │       ├── 📄 NavigationErrorHeader.tsx
    │   │       ├── 📄 PrimeRadiant.tsx
    │   │       └── 📄 ProtocolOverlay.tsx
    │   ├── 📂 feedback
    │   │   ├── 📁 components
    │   │   │   └── 📄 FeedbackOverlay.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📂 music
    │   │   └── 📄 page.tsx
    │   ├── 📂 navigation
    │   │   ├── 📁 components
    │   │   │   ├── 📂 effects
    │   │   │   │   └── 📄 AudioManager.tsx
    │   │   │   ├── 📂 grid-navigation
    │   │   │   │   └── 📄 navigation-grid.tsx
    │   │   │   ├── 📂 orbital-navigation
    │   │   │   │   ├── 📄 DestinationInfoPanel.tsx
    │   │   │   │   ├── 📄 DestinationOrbits.tsx
    │   │   │   │   └── 📄 NavigationSection.tsx
    │   │   │   ├── 📂 ship-interface
    │   │   │   │   └── 📄 NavigationControls.tsx
    │   │   │   ├── 📂 three 🎮
    │   │   │   │   └── 📄 TexturedEarth.tsx
    │   │   │   ├── 📄 EarthBriefingOverlay.tsx
    │   │   │   ├── 📄 ShipDecks.tsx
    │   │   │   └── 📄 StatusReport.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📂 sitemap
    │   │   ├── 📁 components
    │   │   │   ├── 📄 CategoryCard.tsx
    │   │   │   ├── 📄 PageLink.tsx
    │   │   │   ├── 📄 SitemapLayout.tsx
    │   │   │   └── 📄 SitemapNotice.tsx
    │   │   └── 📄 page.tsx
    │   ├── 📂 favicon.ico
    │   ├── 📄 globals.css
    │   ├── 📄 layout.tsx
    │   ├── 📄 not-found.tsx
    │   ├── 📄 page.tsx
    │   └── 📄 sitemap.ts
    ├── 📁 components
    │   ├── 📂 layout
    │   │   ├── 📂 footer
    │   │   │   ├── 📄 Footer.tsx
    │   │   │   └── 📄 InteractiveLogo.tsx
    │   │   ├── 📂 header
    │   │   │   ├── 📄 Header.tsx
    │   │   │   ├── 📄 NavigationIcon.tsx
    │   │   │   └── 📄 NavigationText.tsx
    │   │   ├── 📄 ClientLayout.tsx
    │   │   ├── 📄 HyperspaceEffect.tsx
    │   │   ├── 📄 NavigationEffect.tsx
    │   │   └── 📄 ScrollSection.tsx
    │   ├── 📂 shared
    │   │   ├── 📂 contexts
    │   │   │   ├── 📄 LoadingContext.tsx
    │   │   │   └── 📄 LoadingScreen.tsx
    │   │   └── 📁 hooks
    │   │       ├── 📄 useBullRun.ts
    │   │       ├── 📄 useEasterEggs.ts
    │   │       ├── 📄 useMousePosition.ts
    │   │       ├── 📄 useOptionSelection.ts
    │   │       └── 📄 useYouTubeVideos.ts
    │   └── 📂 ui
    │       ├── 📂 background
    │       │   ├── 📄 GeometricBackground.tsx
    │       │   └── 📄 PurpleGalaxyBackground.tsx
    │       ├── 📂 data-display
    │       │   ├── 📂 Card
    │       │   │   ├── 📄 Card.tsx
    │       │   │   └── 📄 ServiceCard.tsx
    │       │   ├── 📂 Text
    │       │   │   └── 📄 Text.tsx
    │       │   └── 📄 counter.tsx
    │       ├── 📂 feedback
    │       │   └── 📄 EasterEggHint.tsx
    │       ├── 📂 forms
    │       │   ├── 📄 Button.tsx
    │       │   └── 📄 Input.tsx
    │       ├── 📂 layout
    │       │   ├── 📄 Container.tsx
    │       │   ├── 📄 Grid.tsx
    │       │   ├── 📄 Section.tsx
    │       │   └── 📄 Stack.tsx
    │       ├── 📂 theme
    │       │   ├── 📄 ThemeProvider.tsx
    │       │   ├── 📄 ThemeToggle.tsx
    │       │   └── 📄 ThemeWrapper.tsx
    │       ├── 📂 typography
    │       │   └── 📄 PageHeading.tsx
    │       ├── 📄 OptionCard.tsx
    │       ├── 📄 OptionOverlay.tsx
    │       └── 📄 OptionsGrid.tsx
    ├── 📁 lib
    │   ├── 📄 asset-converter.ts
    │   ├── 📄 compatibility-check.ts
    │   ├── 📄 design-tokens.ts
    │   ├── 📄 game-config.ts 🎮
    │   ├── 📄 legacy-bridge.ts
    │   ├── 📄 utils.ts
    │   └── 📄 voxel-converter.ts
    ├── 📁 public
    │   ├── 📂 game 🎮
    │   │   ├── 📂 audio
    │   │   │   ├── 📂 button-press.ogg
    │   │   │   ├── 📂 hit.ogg
    │   │   │   └── 📂 score-reached.ogg
    │   │   ├── 📂 default_100_percent
    │   │   │   ├── 📂 100-disabled.png
    │   │   │   ├── 📂 100-error-offline.png
    │   │   │   └── 📂 100-offline-sprite.png
    │   │   ├── 📂 default_200_percent
    │   │   │   ├── 📂 200-disabled.png
    │   │   │   ├── 📂 200-error-offline.png
    │   │   │   └── 📂 200-offline-sprite.png
    │   │   ├── 📄 BullRun.module.css
    │   │   ├── 📂 offline-sprite-1x.png
    │   │   └── 📂 offline-sprite-2x.png
    │   ├── 📂 images
    │   │   ├── 📂 sample-thumb-1.png
    │   │   ├── 📂 sample-thumb-2.png
    │   │   └── 📂 sample-thumb-3.png
    │   ├── 📂 logos
    │   │   ├── 📂 dark-mode
    │   │   │   └── 📂 Transparent Rectangular Logo with Text.png
    │   │   ├── 📂 light-mode
    │   │   │   ├── 📂 Transparent Rectangular Logo with Text.png
    │   │   │   └── 📂 Wordmark.png
    │   │   ├── 📂 Icon.png
    │   │   ├── 📂 Rectangular Logo with Text.png
    │   │   ├── 📂 Square Icon.png
    │   │   ├── 📂 Square Logo with Text.png
    │   │   └── 📂 Square Logo.png
    │   ├── 📁 models 🦖
    │   │   └── 📂 prime_radiant
    │   │       ├── 📂 PrimeRadiantFullHull.blend
    │   │       ├── 📂 PrimeRadiantFullHull.blend1
    │   │       ├── 📂 PrimeRadiantHalfToFull.blend
    │   │       ├── 📂 PrimeRadiantHalfToFull.blend1
    │   │       └── 📂 PrimeRadiantHalfToFull.glb
    │   └── 📁 textures
    │       └── 📂 earth
    │           ├── 📂 earth-clouds.jpg
    │           ├── 📂 earth-map.jpg
    │           ├── 📂 earth-nightmap.jpg
    │           ├── 📂 earth-normal.tif
    │           └── 📂 earth-specular.tif
    ├── 📂 styles
    │   └── 📄 globals.css
    ├── 📂 types
    │   ├── 📄 design-tokens.ts
    │   └── 📄 game.d.ts 🎮
    ├── 📂 .env.local
    ├── 📂 .gitattributes
    ├── 📂 .gitignore
    ├── 📄 components.json
    ├── 📂 LICENSE
    ├── 📄 ListFileTree.js
    ├── 📄 middleware.ts
    ├── 📄 next-env.d.ts
    ├── 📂 next.config.mjs
    ├── 📂 opencode.exe
    ├── 📄 package.json
    ├── 📂 postcss.config.mjs
    ├── 📄 README.md
    ├── 📄 tailwind.config.js
    └── 📄 tsconfig.json