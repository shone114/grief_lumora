🏗️ Technical Plan — The Memory Sky

A full breakdown of how to implement all features.

This document describes how to actually build the Memory Sky project in a hackathon setting using a simple, fast, front-end-only tech stack.

📌 1. Tech Stack
Frontend Framework

React + Vite

Fast dev server

Lightning reload

Zero configuration

Styling

TailwindCSS

Rapid UI iteration

Prebuilt utilities for gradients, opacity, blur, transitions

Animations

Framer Motion

Smooth drifting clouds

Wobble effects

Float-forward memory interaction

Smooth transitions

Gestures

@use-gesture / react-use-gesture

For long-press, drag, swipe (if needed)

Clean fallback to click/tap

Audio

Howler.js

Looping ambient tracks

Layered soundscape

Crossfades between moods

Smooth fade-ins/outs

Asset Handling

Local image assets for:

Clouds

Weather overlays

Mist layers

Everything remains frontend-only.
No backend or login.
No database.

📁 2. Directory Structure
/src
  /assets
    clouds/
    overlays/
    memories/
    audio/
    weather/
  /components
    SkyCanvas.jsx
    Cloud.jsx
    MemoryFocus.jsx
    WeatherSlider.jsx
    ReleaseAnimation.jsx
  /state
    useWeather.js
    useMemories.js
  /utils
    cloudGenerator.js
    audioManager.js
    filters.js
  App.jsx

☁️ 3. Core Systems Breakdown

Below is every feature separated into its technical implementation.

🌤️ A. The Sky Environment
Goal

Create an infinite drifting sky with parallax motion and soft atmospheric visuals.

Implementation

Use a full-screen <div> with a gradient background.

Tailwind gradient + opacity layers.

Add optional noise/mist overlay using a semi-transparent PNG positioned absolutely over the sky.

Add parallax by listening to mouse movement and applying slight transform: translate() to background layers.

**Note on Sunny Mode**: Implemented using CSS `conic-gradient` for rotating god rays and `mix-blend-screen` for realistic light blending. Transitions use individual layer opacity to prevent stacking context artifacts.

☁️ B. Memory Clouds (with memory content inside)

This is a 3-layer structure:

1. Cloud Base Layer

Cloud sprite PNGs stored in /assets/clouds

Randomized:

size

opacity

drift speed

vertical position

initial delay

2. Memory Content Layer (INSIDE the cloud)

Memory items:

image

text snippet

voice-note ripple symbol

Apply transformations:

Wrap memory content inside a clip-path mask shaped like the cloud.

Then apply:

opacity: 0.3–0.6

filter: blur(1–2px)

filter: saturate(0.6)

This makes photographs look soft, dreamlike, and aesthetic.

3. Weather Overlay Layer

Clouds adopt weather mood by applying:

CSS color overlays

Combined filters:

SUNNY → warm tint

CLOUDY → neutral

RAINY → cool desaturation

All applied via CSS variables so theme changes are instant.

🔁 C. Cloud Drifting Animation

Implemented with Framer Motion:

Animate X-axis from -10% → +110%

Use repeat: Infinity

Use an easing curve like easeInOut

Add slight:

up/down wobble

rotation wiggle

Random generation:

A generateCloud() utility returns a cloud object with random properties.

Example properties:

{
  id,
  sprite,
  memory,
  size,
  speed,
  vertical,
  opacity,
  delay
}


Render 12–20 clouds at a time.

Every 30 seconds → replace one cloud with a new one.

🔍 D. Cloud Selection / Focus Mode

When user clicks a drifting cloud:

1. The cloud “floats forward”

Scale up (6×–10×)

Move to center

Sharpen the memory content (increase opacity to ~0.9, reduce blur)

Reduce cloud tint slightly for readability

2. Dim the background sky

Apply backdrop blur on the sky

Slight fade-out of other clouds

3. Play emotional audio layer

Handled by audioManager.js.

4. Display two gestures (Not buttons)

Tap outside → close

Upward flick OR long-press → release

Focus mode is an overlay state, not a separate page.

🎚️ E. Weather / Mood Slider

Slider with three fixed positions: Sunny, Cloudy, Rainy.

State:

useWeather() store contains:

weather: "sunny" | "cloudy" | "rainy"

When user moves slider:

Update weather state

Audio crossfade to new ambience

Apply global CSS theme variables:

--cloud-tint

--memory-saturation

--sky-gradient

All cloud components read from these variables automatically.

Visual changes:

Sunny = warm tint

Cloudy = normal tint

Rainy = cool/blue tint + extra mist layer

🌬️ F. Wind Release Gesture

Triggered via:

Long-press

Flick-up

or a soft “release cloud” area inside focus mode

Release steps:

Memory fades out first (opacity → 0)

Cloud shakes gently (Framer Motion)

Cloud breaks into a particle/mist animation

Mist rises upward + dissolves

Wind-gust audio plays

Remove cloud from memory list

Background returns to normal

Use a pre-rendered particle animation PNG/webm for speed.

🎧 G. Audio System
Howler.js setup:

Base ambience track (depends on weather)

Memory focus track (pads/piano)

Interaction SFX

Behavior:

On weather change → base ambience crossfades (e.g., warm → rain)

On cloud focus → emotional layer fades in

On cloud close → fade out

On release → play wind gust

Audio manager handles:

play()
fade()
crossfade()
stop()

📦 H. Memory Data

For the hackathon:

Hardcode 10–20 memory objects in /assets/memories

Each memory object has:

id
type: "image" | "text" | "audio"
content: file or string


Clouds randomly pick from memory list when generated

No backend.
No storage.
Purely front-end.

🎨 I. Weather-Memory Integration

Cloud visuals adapt memory content to mood:

SUNNY:

Add warm overlay

Increase cloud brightness

Slight glow

CLOUDY:

Keep neutral

Mild desaturation

RAINY:

Blue-grey overlay

High desaturation

Stronger vignette

Memory text/image/voice symbols inherit the tint.

🔄 J. State Management

Use small Zustand stores:

useWeather.js

Controls weather state.

useMemories.js

Holds memory objects and released/deleted clouds.

Lightweight and ideal for hackathons.

🧱 K. Pages / Components
1. SkyCanvas

Renders sky gradient, parallax, mist

Renders cloud list

2. Cloud

Visual cloud container

Memory masked inside

Weather tint

Drifting animation

Hover/focus interactions

3. MemoryFocus

Enlarged cloud

Clear memory content

Close and release interactions

Emotional audio layer

4. WeatherSlider

Updates weather state

Animates mood transitions

5. ReleaseAnimation

Particle effect component for cloud dissolve

🚀 L. MVP Implementation Order (For Hackathon)

Sky background + weather gradients

Basic drifting clouds

Random cloud generator

Memory masking inside clouds

Weather tint system

Cloud focus (float-forward)

Audio system

Cloud release animation

Polish (parallax, mist overlays, subtle glows)

This order ensures you have a working visual demo early.