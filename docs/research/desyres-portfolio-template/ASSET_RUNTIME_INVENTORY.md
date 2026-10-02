# Desyres Portfolio Template — Asset & Runtime Inventory

Source inspected: <https://desyres-portfolio-template.webflow.io/>  
Inspection date: 2026-08-23  
Rendered viewport used for the runtime sweep: `1280 × 720`  
Rendered document height after the sweep: `14043px`

This document records the source/runtime facts needed to preserve the original composition and motion while replacing Desyres content and media with Quantum Hive copy and brand assets. It is an inventory only; no Desyres asset was downloaded into the landing and no landing file was changed by this research task.

## Executive finding

Desyres is not a static CSS layout. It is a Webflow page whose native interaction runtime is supplemented by GSAP 3.15, SplitText and ScrollTrigger. A faithful adaptation therefore needs the original rendered hierarchy, Webflow identifiers and stylesheet/runtime order. Rebuilding only the visible layout would lose the preloader, scroll transformations, reveal states and hover interactions.

The original photographic assets should **not** be used in the Quantum Hive landing. Their structural roles can be remapped to existing Quantum Hive panal/colmena assets, while retaining the reference's composition and animation model.

## Rendered document identity

```text
title: Desyres - Webflow HTML Website Template
html lang: en
html data-wf-domain: desyres-portfolio-template.webflow.io
html data-wf-page: 6965e1b5545eb9d499e7f888
html data-wf-site: 6965e1b4545eb9d499e7f87d
body class: home
```

Final rendered `<html>` class list after Webflow and WebFont initialization:

```text
w-mod-js w-mod-ix w-mod-ix3 wf-inter-n3-active wf-inter-n5-active
wf-inter-n6-active wf-inter-n4-active wf-inter-n7-active wf-active
```

The combination of `w-mod-ix`, `w-mod-ix3`, `data-w-id` and `data-wf-target` is direct evidence that Webflow interactions have initialized. This export uses Webflow's newer chunked runtime rather than a single classic `webflow.js` file.

### Rendered topology and counts

- Total DOM elements observed: `704`
- `<section>` elements: `10`
- Footer elements: `1`
- `<img>` elements: `56`
- Anchor elements: `26`
- Script elements: `11`
- `data-w-id` elements: `43`
- Webflow CMS lists (`.w-dyn-list`): `4`
- Webflow nav widgets (`.w-nav`): `0`
- Webflow tabs (`.w-tabs`): `0`
- Webflow sliders (`.w-slider`): `0`
- Webflow lightboxes (`.w-lightbox`): `0`
- Webflow forms (`.w-form`): `0`
- Inline SVG elements: `0`
- Canvas elements: `0`
- Video/audio elements: `0`
- Iframes: `0`

Rendered order:

1. `section.section-navbar-popup`
2. `section.section-preload`
3. `section.section-hero`
4. `section#About.section-about`
5. `section.section-advantages`
6. `section#Work.section-works`
7. `section#Testimonial.section-testimonial`
8. `section#Capability.section-capabilities`
9. `section.section-transitions`
10. `section#Service.section-services`
11. `footer.section-footer`

## Stylesheets and head resources

### Production stylesheet

```text
https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/css/desyres-portfolio-template.webflow.shared.5526e9e72.css
```

- `rel="stylesheet"`
- `type="text/css"`
- `crossorigin="anonymous"`
- SRI: `sha384-VSbp5yf3oj0/dfZMYqb3IGgPtVdjvAj6Nq1VbG3qrKSdg2dIlQiYGN3z8/u+I3nk`
- Asset CDN preconnect: `https://cdn.prod.website-files.com`

### Inline styles observed

1. Webflow focus helper (`58` characters):

   ```css
   .wf-force-outline-none[tabindex="-1"]:focus{outline:none;}
   ```

2. Webflow pre-interaction anti-flash rules (`398` characters). It hides animation targets while JavaScript is active but `w-mod-ix3` is not yet initialized. The selector includes `.display-preload`, `.body-large-preload`, `.display-large.about-text-anim`, `.about-line`, `.heading-anim-wrapper`, `.display-large.capabilities-heading`, the page-specific `data-wf-target`, `.nav-link-popup` and other animated nodes.

### Metadata assets

- Favicon: `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/698023d619a804914e25aeee_FAICON%208AM%2032.png`
- Apple touch icon: `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/698023d945f3789a2f76cd95_FAICON%208AM%20256.png`
- Open Graph image: `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69802382f7499a99334d3e40_Snippet.png`

These are Desyres branding and should be replaced, not carried into Quantum Hive.

## JavaScript runtime — exact load order

The source loads the following scripts in this order:

1. WebFont Loader 1.6.26  
   `https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js`
2. Inline font initialization  
   `WebFont.load({ google: { families: ["Inter:300,400,500,600,700"] } });`
3. Inline Webflow feature bootstrap (adds `w-mod-js` and, on touch devices, `w-mod-touch`).
4. Inline `application/ld+json` page schema (`2063` characters).
5. jQuery 3.5.1  
   `https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6965e1b4545eb9d499e7f87d`  
   SRI: `sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=`
6. Webflow shared chunk  
   `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/js/webflow.schunk.36b8fb49256177c8.js`  
   SRI: `sha384-4abIlA5/v7XaW1HMXKBgnUuhnjBYJ/Z9C1OSg4OhmVw9O3QeHJ/qJqFBERCDPv7G`
7. Webflow shared chunk  
   `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/js/webflow.schunk.0a4207a6138e2177.js`  
   SRI: `sha384-AFDq/WhmAbc7Z3HKheFVGsiBquODRNKZowUjmoTKG3M3xECqge8wXZOBCVRYXY+r`
8. Page/site Webflow bundle  
   `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/js/webflow.03f453bd.8cb5f675f84a184c.js`  
   SRI: `sha384-utsTuDdKBVACAeZBDKjE/thT22qWmGZay40ftltWQUQmgqj444n1FEO43fw0uG34`
9. GSAP 3.15.0  
   `https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js`
10. GSAP SplitText 3.15.0  
    `https://cdn.prod.website-files.com/gsap/3.15.0/SplitText.min.js`
11. GSAP ScrollTrigger 3.15.0  
    `https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js`

None of these tags used `defer`; only the JSON-LD element reports `async` through the DOM script interface. The execution order must therefore be preserved, especially `jQuery → Webflow chunks → GSAP plugins`.

## Webflow interaction attributes

Attribute names found in the rendered DOM:

```text
data-w-id
data-wf-domain
data-wf-page
data-wf-site
data-wf-target
```

No `data-animation`, `data-easing`, `data-duration` or `data-delay` attributes were present. Interaction configuration is therefore in the Webflow bundles and addressed through IDs, not declarative attributes on each node.

### Page-specific target

One heading (`h1.display-count`) carries:

```text
data-wf-target='[[["6965e1b5545eb9d499e7f888","a9000dc3-1c7f-0018-297e-b4cf9685fc75"],[]]]'
```

This value embeds the page ID and must remain unchanged if the native Webflow interaction data is reused.

### `data-w-id` inventory

There are `43` animated elements. The IDs/classes are:

- `9a278853-f8dc-b5b8-83d4-8f7da9de0cb1` — `.navigation-button`, repeated 4 times
- `1003bfc7-2fc8-079c-9d9c-012eb1566f26` — `.navbar-hamburger`
- `172a788a-1583-d0c5-18b5-afac4c114843` — `.section-preload`
- `641f6f36-7545-701e-5dfd-e06d4d47d627` — `.preload-top`
- `995098b5-de23-bce8-0956-a022363048a4` — `.preload-buttom`
- `9f70bc2d-f010-e3bf-2ba9-9361b3c89515` — `.section-hero`
- `330617d6-8396-75fa-6066-d20329853ec1` — `.about-list-wrapper`
- `94b028ef-1dcd-096b-b402-64035875f27f` — `#Advantage.advantages---works-wrapper`
- `73b59b99-e679-184e-473b-e69ce389f303` — `.stiky-wrapper-works`
- `2d03987d-fbbf-0afe-1ddb-f53b70574238` — first `.heading-6.h6-works`
- `8f51bdba-b163-1dfe-fa7c-16ddc6a208a5` — second `.heading-6.h6-works`
- `21180bba-32e9-5aa4-4a80-0fc1a4e8cf9b` — `#Capability.section-capabilities`
- `cf63291c-a8b8-97d2-eedd-7b7e08e3b344`
- `d13aa9e1-cd77-397f-3758-286b6be5c28c`
- `d3b51caf-9b6c-cbbd-4bc9-d1c1db0ef44f`
- `829a4406-89c6-3105-69c9-dc600857acc7`
- `3ada49fd-b9af-75cc-ea12-f7bd8fd869b5`
- `42c78ef2-b00c-ae42-5e43-b608edcff9d2`
- `063a124d-9ed2-cb0f-48a5-b0331c02d2ce` through `063a124d-9ed2-cb0f-48a5-b0331c02d2d3` — remaining `.capabilities-logo` nodes
- `6c43f8dd-3fa9-91ca-d513-0e6afb34d6ab` — `.capabilities-wrapper`
- `b985f93b-c776-87d6-c1bf-219123f6bab2`
- `664e3da4-7016-15b8-07d7-5e1fc7751651`
- `4d00a76a-6597-0a4f-3dbd-675dfc8e7f0d`
- `d98a8f27-6e9a-abfe-46ae-fc8126caf136` — four `.expertise-button` nodes
- `8d28f721-0401-b4ae-400b-6846c600323b`
- `594d814a-d114-554b-fc64-75c1012de6b6`
- `19d9f2e3-5000-858e-b4bf-54a99b84d2ee`
- `19d9f2e3-5000-858e-b4bf-54a99b84d2f2` — four `.system-capabilities-wrapper` nodes
- `52891255-91f4-2523-364a-b7f65c1e78b1` — `.section-transitions`
- `1514152c-3c29-547b-5407-7c7af9400b2a` — `#Service.section-services`
- `548b1eeb-f779-fb3f-a4f7-0ae8fbcb8b35` — `.services-wrapper`
- `a67bbc72-6b3d-a59f-90c6-334bad8334d7`
- `1941df3e-054b-e174-3496-a3cd3e188999`
- `92577e6d-b555-f190-bb97-941a9e023ace` — three `.services-card` nodes
- `95a51966-f6cc-9770-d94c-f3d108670a07` — `.section-footer`

### Runtime-applied inline states observed

- `.section-preload`: `display: none`
- `.preload-top`: hidden and translated `-50vh`
- `.preload-buttom`: hidden and translated `+50vh`
- first `.h6-works`: translated `+30vw` on X
- second `.h6-works`: translated `-30vw` on X
- `.capabilities-wrapper`: `opacity: 0.2`
- three `.services-card` nodes: resolved to `opacity: 1` and zero translation after reveal
- `.section-footer`: `opacity: 0.4` at the observed scroll state

These inline values are interaction state, not authoring mistakes. Do not bake them permanently into the Quantum Hive markup.

## Fonts

The page uses only `Inter, sans-serif`, requested through:

```text
https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700
```

Weights initialized by WebFont Loader:

- `300`
- `400`
- `500`
- `600`
- `700`

Google Fonts' Chrome response uses Inter v20 WOFF2 subsets. The Latin subset URL observed for the requested weights is:

```text
https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2
```

The page also preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (`crossorigin="anonymous"` for gstatic).

Representative computed typography at the inspected desktop viewport:

| Element | Size | Weight | Line height | Color |
|---|---:|---:|---:|---|
| `body` | 18px | 300 | 23.4px | `rgb(250, 250, 250)` |
| `h1` / `.display-preload` | 89.6px | 700 | 107.52px | `rgb(250, 250, 250)` |
| `h2` | 80px | 700 | 104px | `rgb(250, 250, 250)` |
| `.display-large` | 57.6px | 700 | 64px | `rgb(250, 250, 250)` |
| `h3` | 28px | 700 | 33.6px | `rgb(250, 250, 250)` |
| `p` | 20px | 300 | 24px | `rgb(250, 250, 250)` |
| `.body-large` | 20px | 300 | 23.4px | `rgb(250, 250, 250)` |
| `.heading-6` | 20px | 700 | 26px | `rgb(250, 250, 250)` |

No Orbitron, Space Grotesk or custom local font is used by Desyres.

## Image inventory

### Loading behavior and totals

- `<img>` elements: `56`
- Every image has `loading="lazy"`: `56/56`
- Distinct base `src` URLs: `31`
- Distinct selected `currentSrc` URLs after the sweep: `31`
- Distinct responsive candidates declared in `srcset`: `94`
- `<picture>` / `<source>` elements: `0`
- CSS image URLs: none; the only computed background images were CSS gradients

Observed lazy-load progression during a real scroll sweep:

| Scroll position | Images without decoded natural dimensions |
|---:|---:|
| 0px | 45 |
| 4000px | 36 |
| 6500px | 28 |
| 9000px | 4 |
| 12500px | 0 |

This is important for capture/download tooling: enumerating `src` at load time finds all declarations, but `currentSrc`, dimensions and actual network loads are incomplete until the page has been scrolled through.

### Distinct base image URLs (31)

Site asset host `6965e1b4545eb9d499e7f87d`:

1. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/6965fa2cd69f4b39919bc52b_Logo.svg`
2. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696605316c50c31ed592c297_glow-men.webp`
3. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696f1c1af1e22110777bed45_Image%20(29).webp`
4. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696f1c1aa55c9893f458e038_Image%20(30).webp`
5. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696f1c1af1e22110777bed48_Image%20(31).webp`
6. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696f1c1a8c0e294d45caab0a_Image%20(32).webp`
7. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69667b6cca47c95281da2fd1_chevron-forward-sharp1.svg`
8. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69703aded46abe9b290bbf4f_ManWithBlackGlases.webp`
9. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69703ade72a362c0b4c562df_BlackBycycle.webp`
10. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69703ade4e19779e13a7c0c4_ManShoesFly.webp`
11. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69703adebe032fb9cc807248_CoolWoman.webp`
12. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696df0f39e49abe25697f797_Item%20(1).webp`
13. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696747ac4878be4cc60af9f4_Reviewer-VR.webp`
14. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69674c6f0d67914985d6bf2e_Reviewer-orange%20glasses.webp`
15. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69674c6f4b626661f10e73ab_Reviewer-black%20glasses.webp`
16. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/69674c6fa4bb9052f022bf98_Reviewer-red%20glasses.webp`
17. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854de419fcdd4bd06bf85_logoipsum-245.webp`
18. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854deec6d5130f6b1a6df_logoipsum-401.webp`
19. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854deaa956f27516fc1c5_logoipsum-399.webp`
20. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854de818ec930ec9c0968_logoipsum-386.webp`
21. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854de6d60253ee7b1e45f_logoipsum-379.webp`
22. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696854debbb331b21a1d9ac8_logoipsum-368.webp`
23. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/6968856bd4ab200e08a7ca84_Icon.svg`
24. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/6968a09326d04d6b71742360_ManFly.webp`
25. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/6968a0937313022714a6af4d_WomanFly.webp`
26. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/6968a093b28e0fa85f6228bc_ManWithThebicycle.webp`
27. `https://cdn.prod.website-files.com/6965e1b4545eb9d499e7f87d/696b661df98d514d7ef42eaf_CtaLight.webp`

CMS asset host `696de5ee101e48a05b8aecd7`:

28. `https://cdn.prod.website-files.com/696de5ee101e48a05b8aecd7/697acac3fef75d7dda94b1ed_u7885115847_dramatic_low-key.png`
29. `https://cdn.prod.website-files.com/696de5ee101e48a05b8aecd7/697aca8d919e4c48ffe2725e_tomkiami_Minimalist_fashion.png`
30. `https://cdn.prod.website-files.com/696de5ee101e48a05b8aecd7/697aca2420f1194616969c41_maisonminuit.png`
31. `https://cdn.prod.website-files.com/696de5ee101e48a05b8aecd7/696de8887b0f6bb6bd83d1da_manJumpWithTransparantJaket.webp`

### DOM use by image class

| Class | Elements | Role |
|---|---:|---|
| `.image` | 1 | wordmark/logo |
| `.hero-background-image` | 1 | hero focal image |
| `.about-image` | 4 | layered/cycling about imagery |
| no class | 8 | repeated arrows/icons |
| `.advantages-image` | 4 | advantages imagery |
| `.works-image` | 2 | works transition visual |
| `.advantage-item-image` | 4 | CMS/project cards |
| `.image-2` | 8 | duplicated reviewer strip |
| `.capabilities-logo` | 12 | duplicated logo marquee |
| `.image-3` | 4 | expertise row icon |
| `.system-icon` | 4 | capability system icons |
| `.services-image` | 4 | service/CTA focal imagery |

### Responsive variants

The `srcset` declarations use Webflow's standard `-p-500`, `-p-800`, `-p-1080`, `-p-1600`, `-p-2000`, `-p-2600` and `-p-3200` suffixes where the source is large enough. The exact candidate set varies by asset:

- Hero `glow-men`: through `-p-2600.webp`
- Advantage portraits: `-p-500.webp`, `-p-800.webp`
- CMS PNGs: generally through `-p-1600.png`
- `manJumpWithTransparantJaket`: through `-p-3200.webp`
- Reviewer images: through `-p-1600.webp`
- `ManFly`, `WomanFly`, `ManWithThebicycle`, `CtaLight`: through `-p-3200.webp`

For source-first extraction, preserve each full original `srcset` and `sizes` string from `rendered.html`; choosing only the base `src` would change crop/sharpness across breakpoints.

## CSS backgrounds and non-image visual layers

No raster/SVG URL was found in computed `background-image`. The page's background layers are gradients:

- Hero: transparent to `rgba(10, 10, 10, 0.8)`
- About: `rgba(10, 10, 10, 0.8)` to `rgba(10, 10, 10, 0.6)`
- Works/advantages shadows: black or `rgb(10, 10, 10)` fades to transparent
- Capabilities strip: left/right `rgb(10, 10, 10)` edge masks

There were no computed CSS masks, no canvas and no inline SVG. The visual sophistication is produced by positioned `<img>` layers, gradients and runtime transforms.

## Preservation requirements for the Quantum Hive adaptation

1. Preserve the source DOM hierarchy, Webflow classes, `data-wf-page`, `data-wf-site`, all `data-w-id` values and the `data-wf-target` value while the native interaction bundle is reused.
2. Link the original Webflow stylesheet directly for the first faithful adaptation pass; do not translate it into approximate Tailwind utilities.
3. Preserve the script dependency order: WebFont loader/bootstrap, jQuery, Webflow chunks, then GSAP/SplitText/ScrollTrigger.
4. Trigger the full lazy-load sweep before creating a local asset manifest or visual comparison.
5. Replace the 31 Desyres base images and their responsive variants with Quantum Hive assets mapped by role. Do not ship the Desyres people, logos, favicon or OG image.
6. Change visible text in situ without altering structural classes or `data-*` attributes.
7. Do not introduce `overflow: hidden` on `html`, `body` or sticky ancestors; use `overflow-x: clip` so the reference's sticky/scroll behavior survives.
8. Keep the official `FirmaQuantumHive` in the resulting footer after adaptation.

## Known extraction boundary

This inventory records the live rendered page and every declared image/runtime URL observed during a complete scroll. It does not contain downloaded binaries or a copied `rendered.html`; those belong to the clone extraction/build phase. Browser page isolation did not expose JavaScript globals directly, so the runtime identification is based on the authoritative script tags, rendered Webflow classes, interaction attributes and runtime-applied inline states rather than introspection of global objects.
