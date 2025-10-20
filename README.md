# 🪽 Chris-Star.com
A business website project to serve as a company portal. Undertook this task despite not being a developer with the help of AI for free.

## Credits
- ChatGPT (at first)
- Google Gemini (at first)
- **DeepSeek Chat** (thereafter)

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
- This project (everything except minigame) is released under the **CC BY-NC-SA 4.0** license. You may remix and share with attribution, but no commercial use.
- 3D Minigame: This component is separately licensed from the main application. It is released under the **GPL-3.0** license, as per the original [Dino3D](https://github.com/Priler/dino3d/) code it's based on.
- 2D Minigame: This component is separately licensed from the main application. It is released under the **BSD-3-Clause** license, as per the original [t-rex-runner](https://github.com/wayou/t-rex-runner) code it's based on.

---

## File Tree
├── 📂 app
│   ├── 📂 community
│   │   └── 📄 page.tsx
│   ├── 📂 music
│   │   └── 📄 page.tsx
│   ├── 📂 navigation
│   │   └── 📄 page.tsx
│   ├── 📂 vault
│   │   └── 📄 page.tsx
│   ├── 📂 wiki
│   │   └── 📄 page.tsx
│   ├── 📂 youtube
│   │   └── 📄 page.tsx
│   ├── 📂 Favicon.ico
│   ├── 📄 globals.css
│   ├── 📄 layout.tsx
│   ├── 📄 not-found.tsx
│   └── 📄 page.tsx
├── 📁 components
│   ├── 📂 archive
│   │   ├── 📂 Old Homepage
│   │   │   ├── 📄 advanced-scroll-section.tsx
│   │   │   ├── 📄 HeroSection.tsx
│   │   │   ├── 📄 ServiceCard.tsx
│   │   │   └── 📄 TransformationalLeadership.tsx
│   │   ├── 📂 Old Navigation
│   │   │   ├── 📄 AnimatedTransition.tsx
│   │   │   ├── 📄 AudioManager.tsx
│   │   │   ├── 📄 DestinationInfoPanel.tsx
│   │   │   ├── 📄 DestinationOrbits.tsx
│   │   │   ├── 📄 ErrorHeader.tsx
│   │   │   ├── 📄 GeometricMandala.tsx
│   │   │   ├── 📄 HyperspaceEffect.tsx
│   │   │   ├── 📄 LoadingScreen.tsx
│   │   │   ├── 📄 navigation-grid.tsx
│   │   │   ├── 📄 NavigationButtons.tsx
│   │   │   ├── 📄 NavigationControls.tsx
│   │   │   ├── 📄 NavigationSection.tsx
│   │   │   └── 📄 SacredGeometryBackground.tsx
│   │   └── 📂 Old Unknown
│   │       ├── 📄 scroll-reveal-section.tsx
│   │       ├── 📄 scroll-triggered-counter.tsx
│   │       └── 📄 theme-provider.tsx
│   ├── 📂 games 🎮
│   │   ├── 📄 BullRun2D.tsx
│   │   └── 📄 BullRun3D.tsx
│   ├── 📄 EarthBriefingOverlay.tsx
│   ├── 📄 EasterEggHint.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 InteractiveLogo.tsx
│   └── 📄 TexturedEarth.tsx
├── 📁 hooks
│   ├── 📄 useEasterEggs.ts
│   └── 📄 useMousePosition.ts
├── 📁 lib
│   ├── 📄 asset-converter.ts
│   ├── 📄 compatibility-check.ts
│   ├── 📄 game-config.ts 🎮
│   ├── 📄 legacy-bridge.ts
│   └── 📄 utils.ts
├── 📁 public
│   ├── 📂 games 🎮
│   │   └── 📂 bull-run-3d
│   │       ├── 📂 css
│   │       │   ├── 📄 overrides.css
│   │       │   └── 📄 style.min.css
│   │       ├── 📂 js
│   │       │   ├── 📁 src
│   │       │   │   ├── 📂 geometry
│   │       │   │   │   ├── 📄 cactus.js
│   │       │   │   │   ├── 📄 dyno_band.js
│   │       │   │   │   ├── 📄 dyno_wow.js
│   │       │   │   │   ├── 📄 dyno.js
│   │       │   │   │   ├── 📄 flowers.js
│   │       │   │   │   ├── 📄 ground_bg.js
│   │       │   │   │   ├── 📄 ground.js
│   │       │   │   │   ├── 📄 misc.js
│   │       │   │   │   ├── 📄 ptero.js
│   │       │   │   │   └── 📄 rocks.js
│   │       │   │   ├── 📁 textures
│   │       │   │   │   └── 📄 ground.js
│   │       │   │   ├── 📄 _loop.js
│   │       │   │   ├── 📄 assets.js
│   │       │   │   ├── 📄 audio_manager.js
│   │       │   │   ├── 📄 build.js
│   │       │   │   ├── 📄 camera_controls.js
│   │       │   │   ├── 📄 camera.js
│   │       │   │   ├── 📄 effects_manager.js
│   │       │   │   ├── 📄 enemy_manager.js
│   │       │   │   ├── 📄 game_manager.js 🎮
│   │       │   │   ├── 📄 init.js
│   │       │   │   ├── 📄 input_manager.js
│   │       │   │   ├── 📄 interface_manager.js
│   │       │   │   ├── 📄 light.js
│   │       │   │   ├── 📄 load_manager.js
│   │       │   │   ├── 📄 log_manager.js
│   │       │   │   ├── 📄 nature_manager.js
│   │       │   │   ├── 📄 particles.js
│   │       │   │   ├── 📄 player_manager.js
│   │       │   │   └── 📄 score_manager.js
│   │       │   ├── 📄 build.js
│   │       │   ├── 📄 build.min.js
│   │       │   ├── 📄 config-high.js
│   │       │   └── 📄 config-low.js
│   │       ├── 📂 libs
│   │       │   ├── 📂 dat.gui
│   │       │   │   ├── 📄 dat.gui.css
│   │       │   │   ├── 📄 dat.gui.js
│   │       │   │   ├── 📂 dat.gui.js.map
│   │       │   │   ├── 📄 dat.gui.min.js
│   │       │   │   ├── 📄 dat.gui.module.js
│   │       │   │   └── 📂 dat.gui.module.js.map
│   │       │   ├── 📂 howler
│   │       │   │   ├── 📄 howler.core.min.js
│   │       │   │   ├── 📄 howler.js
│   │       │   │   ├── 📄 howler.min.js
│   │       │   │   └── 📄 howler.spatial.min.js
│   │       │   ├── 📂 nebula
│   │       │   │   └── 📄 three-nebula.js 🎮
│   │       │   ├── 📂 stats
│   │       │   │   ├── 📄 stats.js
│   │       │   │   ├── 📄 stats.min.js
│   │       │   │   └── 📄 stats.module.js
│   │       │   ├── 📂 three 🎮
│   │       │   │   ├── 📂 controls
│   │       │   │   │   └── 📄 OrbitControls.js
│   │       │   │   ├── 📂 helpers
│   │       │   │   │   └── 📄 CameraHelper.js
│   │       │   │   ├── 📂 loaders
│   │       │   │   │   ├── 📄 GLTFLoader.js
│   │       │   │   │   └── 📄 OBJLoader.js
│   │       │   │   ├── 📂 math
│   │       │   │   │   ├── 📄 ColorConverter.js
│   │       │   │   │   ├── 📄 ConvexHull.js
│   │       │   │   │   ├── 📄 ImprovedNoise.js
│   │       │   │   │   ├── 📄 Lut.js
│   │       │   │   │   └── 📄 SimplexNoise.js
│   │       │   │   ├── 📂 postprocessing
│   │       │   │   │   ├── 📄 AdaptiveToneMappingPass.js
│   │       │   │   │   ├── 📄 AfterimagePass.js
│   │       │   │   │   ├── 📄 BloomPass.js
│   │       │   │   │   ├── 📄 BokehPass.js
│   │       │   │   │   ├── 📄 ClearPass.js
│   │       │   │   │   ├── 📄 CubeTexturePass.js
│   │       │   │   │   ├── 📄 DotScreenPass.js
│   │       │   │   │   ├── 📄 EffectComposer.js
│   │       │   │   │   ├── 📄 FilmPass.js
│   │       │   │   │   ├── 📄 GlitchPass.js
│   │       │   │   │   ├── 📄 HalftonePass.js
│   │       │   │   │   ├── 📄 MaskPass.js
│   │       │   │   │   ├── 📄 OutlinePass.js
│   │       │   │   │   ├── 📄 RenderPass.js
│   │       │   │   │   ├── 📄 SAOPass.js
│   │       │   │   │   ├── 📄 SavePass.js
│   │       │   │   │   ├── 📄 ShaderPass.js
│   │       │   │   │   ├── 📄 SMAAPass.js
│   │       │   │   │   ├── 📄 SSAARenderPass.js
│   │       │   │   │   ├── 📄 SSAOPass.js
│   │       │   │   │   ├── 📄 TAARenderPass.js
│   │       │   │   │   ├── 📄 TexturePass.js
│   │       │   │   │   └── 📄 UnrealBloomPass.js
│   │       │   │   ├── 📁 shaders ⚡
│   │       │   │   │   ├── 📄 AfterimageShader.js
│   │       │   │   │   ├── 📄 BasicShader.js
│   │       │   │   │   ├── 📄 BleachBypassShader.js
│   │       │   │   │   ├── 📄 BlendShader.js
│   │       │   │   │   ├── 📄 BokehShader.js
│   │       │   │   │   ├── 📄 BokehShader2.js
│   │       │   │   │   ├── 📄 BrightnessContrastShader.js
│   │       │   │   │   ├── 📄 ColorCorrectionShader.js
│   │       │   │   │   ├── 📄 ColorifyShader.js
│   │       │   │   │   ├── 📄 ConvolutionShader.js
│   │       │   │   │   ├── 📄 CopyShader.js
│   │       │   │   │   ├── 📄 DepthLimitedBlurShader.js
│   │       │   │   │   ├── 📄 DigitalGlitch.js
│   │       │   │   │   ├── 📄 DOFMipMapShader.js
│   │       │   │   │   ├── 📄 DotScreenShader.js
│   │       │   │   │   ├── 📄 FilmShader.js
│   │       │   │   │   ├── 📄 FocusShader.js
│   │       │   │   │   ├── 📄 FreiChenShader.js
│   │       │   │   │   ├── 📄 FresnelShader.js
│   │       │   │   │   ├── 📄 FXAAShader.js
│   │       │   │   │   ├── 📄 GammaCorrectionShader.js
│   │       │   │   │   ├── 📄 GodRaysShader.js
│   │       │   │   │   ├── 📄 HalftoneShader.js
│   │       │   │   │   ├── 📄 HorizontalBlurShader.js
│   │       │   │   │   ├── 📄 HorizontalTiltShiftShader.js
│   │       │   │   │   ├── 📄 HueSaturationShader.js
│   │       │   │   │   ├── 📄 KaleidoShader.js
│   │       │   │   │   ├── 📄 LuminosityHighPassShader.js
│   │       │   │   │   ├── 📄 LuminosityShader.js
│   │       │   │   │   ├── 📄 MirrorShader.js
│   │       │   │   │   ├── 📄 NormalMapShader.js
│   │       │   │   │   ├── 📄 OceanShaders.js
│   │       │   │   │   ├── 📄 ParallaxShader.js
│   │       │   │   │   ├── 📄 PixelShader.js
│   │       │   │   │   ├── 📄 RGBShiftShader.js
│   │       │   │   │   ├── 📄 SAOShader.js
│   │       │   │   │   ├── 📄 SepiaShader.js
│   │       │   │   │   ├── 📄 SMAAShader.js
│   │       │   │   │   ├── 📄 SobelOperatorShader.js
│   │       │   │   │   ├── 📄 SSAOShader.js
│   │       │   │   │   ├── 📄 TechnicolorShader.js
│   │       │   │   │   ├── 📄 ToneMapShader.js
│   │       │   │   │   ├── 📄 ToonShader.js
│   │       │   │   │   ├── 📄 TranslucentShader.js
│   │       │   │   │   ├── 📄 TriangleBlurShader.js
│   │       │   │   │   ├── 📄 UnpackDepthRGBAShader.js
│   │       │   │   │   ├── 📄 VerticalBlurShader.js
│   │       │   │   │   ├── 📄 VerticalTiltShiftShader.js
│   │       │   │   │   ├── 📄 VignetteShader.js
│   │       │   │   │   ├── 📄 VolumeShader.js
│   │       │   │   │   └── 📄 WaterRefractionShader.js
│   │       │   │   ├── 📄 three.js 🎮
│   │       │   │   ├── 📄 three.min.js 🎮
│   │       │   │   └── 📄 three.module.js 🎮
│   │       │   ├── 📂 visibly
│   │       │   │   └── 📄 visibly.js
│   │       │   └── 📂 vox
│   │       │       ├── 📄 vox.js
│   │       │       └── 📄 vox.min.js
│   │       ├── 📂 media
│   │       │   ├── 📂 _repeat.png
│   │       │   ├── 📂 3d-title.png
│   │       │   ├── 📂 bg.jpg
│   │       │   ├── 📂 no-internet.png
│   │       │   ├── 📂 preloader-dino.png
│   │       │   └── 📂 repeat.png
│   │       ├── 📂 objects
│   │       │   ├── 📂 cactus
│   │       │   │   ├── 📂 cactus_tall.vox
│   │       │   │   ├── 📂 cactus_thin.vox
│   │       │   │   ├── 📂 cactus.vox
│   │       │   │   ├── 📂 fcactus_tall.vox
│   │       │   │   ├── 📂 fcactus_thin.vox
│   │       │   │   └── 📂 fcactus.vox
│   │       │   ├── 📂 flowers
│   │       │   │   ├── 📂 0.vox
│   │       │   │   ├── 📂 1.vox
│   │       │   │   └── 📂 2.vox
│   │       │   ├── 📂 misc
│   │       │   │   ├── 📂 cactus
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   ├── 📂 2.vox
│   │       │   │   │   ├── 📂 3.vox
│   │       │   │   │   ├── 📂 4.vox
│   │       │   │   │   └── 📂 5.vox
│   │       │   │   ├── 📂 fish
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   └── 📂 2.vox
│   │       │   │   ├── 📂 flowers
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   └── 📂 2.vox
│   │       │   │   ├── 📂 rocks
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   ├── 📂 2.vox
│   │       │   │   │   ├── 📂 3.vox
│   │       │   │   │   └── 📂 4.vox
│   │       │   │   ├── 📂 trees
│   │       │   │   │   ├── 📂 dead.vox
│   │       │   │   │   └── 📂 green.vox
│   │       │   │   ├── 📂 desert_skull.vox
│   │       │   │   ├── 📂 scorpion.vox
│   │       │   │   ├── 📂 seaweed.vox
│   │       │   │   └── 📂 tumbleweed.vox
│   │       │   ├── 📂 ptero
│   │       │   │   ├── 📂 0.vox
│   │       │   │   ├── 📂 1.vox
│   │       │   │   ├── 📂 2.vox
│   │       │   │   ├── 📂 3.vox
│   │       │   │   ├── 📂 4.vox
│   │       │   │   └── 📂 5.vox
│   │       │   ├── 📂 rocks
│   │       │   │   ├── 📂 0.vox
│   │       │   │   ├── 📂 1.vox
│   │       │   │   ├── 📂 2.vox
│   │       │   │   ├── 📂 3.vox
│   │       │   │   └── 📂 4.vox
│   │       │   ├── 📂 t-rex
│   │       │   │   ├── 📂 _old
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   ├── 📂 2.vox
│   │       │   │   │   ├── 📂 3.vox
│   │       │   │   │   ├── 📂 4.vox
│   │       │   │   │   ├── 📂 5.vox
│   │       │   │   │   ├── 📂 6.vox
│   │       │   │   │   ├── 📂 7.vox
│   │       │   │   │   └── 📂 8.vox
│   │       │   │   ├── 📂 band
│   │       │   │   │   ├── 📂 0.vox
│   │       │   │   │   ├── 📂 1.vox
│   │       │   │   │   ├── 📂 2.vox
│   │       │   │   │   ├── 📂 3.vox
│   │       │   │   │   ├── 📂 4.vox
│   │       │   │   │   ├── 📂 5.vox
│   │       │   │   │   ├── 📂 6.vox
│   │       │   │   │   └── 📂 7.vox
│   │       │   │   ├── 📂 other
│   │       │   │   │   ├── 📂 wow-down.vox
│   │       │   │   │   └── 📂 wow.vox
│   │       │   │   ├── 📂 0.vox
│   │       │   │   ├── 📂 1.vox
│   │       │   │   ├── 📂 2.vox
│   │       │   │   ├── 📂 3.vox
│   │       │   │   ├── 📂 4.vox
│   │       │   │   ├── 📂 5.vox
│   │       │   │   ├── 📂 6.vox
│   │       │   │   └── 📂 7.vox
│   │       │   ├── 📂 _cactus.vox
│   │       │   ├── 📂 ground sand solid.vox
│   │       │   ├── 📂 ground sand.vox
│   │       │   └── 📂 ground.vox
│   │       ├── 📂 sound
│   │       │   ├── 📂 ingame 🎮
│   │       │   │   ├── 📂 NKM-G-45-31-960955706-0-4681-96-96-4-2390-48-0-34-543-35-149-6-130-0-0-0-0-459.wav
│   │       │   │   ├── 📂 Reloaded Games - Music.mp3
│   │       │   │   └── 📂 Reloaded Games - Music.ogg
│   │       │   ├── 📂 menu
│   │       │   │   └── 📂 NKM-G-25-31-3247870866-0-8588-21-42-2-2709-50-0-90-128-25-102-90-108-13-122-0-0-0.wav
│   │       │   ├── 📂 Jump24.wav
│   │       │   ├── 📂 Pickup_Coin103.wav
│   │       │   ├── 📂 Pickup_Coin50.wav
│   │       │   ├── 📂 Pickup_Coin58.wav
│   │       │   ├── 📂 Pickup_Coin74.wav
│   │       │   ├── 📂 Powerup33.wav
│   │       │   ├── 📂 Powerup54.wav
│   │       │   ├── 📂 Powerup64.wav
│   │       │   ├── 📂 Randomize19.wav
│   │       │   ├── 📂 Randomize22.wav
│   │       │   ├── 📂 Randomize44.wav
│   │       │   └── 📂 Randomize62.wav
│   │       └── 📁 textures
│   │           ├── 📂 ground_face.jpg
│   │           ├── 📂 ground_top.png
│   │           └── 📂 ground_top.psd
│   ├── 📁 textures
│   │   └── 📂 earth
│   │       ├── 📂 earth-clouds.jpg
│   │       ├── 📂 earth-map.jpg
│   │       ├── 📂 earth-nightmap.jpg
│   │       ├── 📂 earth-normal.tif
│   │       └── 📂 earth-specular.tif
│   ├── 📂 Icon.png
│   ├── 📂 Rectangular Logo with Text.png
│   ├── 📂 Square Logo with Text.png
│   ├── 📂 Square Logo.png
│   └── 📂 Wordmark.png
├── 📂 styles
│   └── 📄 globals.css
├── 📂 types
│   └── 📄 game.d.ts 🎮
├── 📂 .gitattributes
├── 📂 .gitignore
├── 📄 components.json
├── 📂 LICENSE
├── 📄 ListFileTree.js
├── 📄 next-env.d.ts
├── 📂 next.config.mjs
├── 📄 package.json
├── 📂 postcss.config.mjs
├── 📄 README.md
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
└── 📂 tsconfig.tsbuildinfo