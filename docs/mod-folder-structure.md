---
title: Mod Folder Structure
description: How to organize the inside of a mod folder in ALE Psych.
credits: ImMalloy
---

# Mod Folder Structure

This page only covers the layout inside `mods/<mod>/`.

<Notice
  status="partial-documentation"
  title="WIP"
  description="This page is still being filled out."
/>

The engine resolves files from the mod folder first, so anything here can override the base game.

## Full Template

```text
mods/
  YourMod/
    data/
      meta.json
      debug.json
      characters/
        <character>.json
      stages/
        <stage>.json
      strumLines/
        <strumline>.json
      weeks/
        <week>.json
      huds/
        <hud>.json
      notes/
        <lane-set>.json
      splashes/
        <splashes>.json
    images/
      characters/
      huds/
        <hud>/
          combo/
      icons/
      notes/
      splashes/
      stages/
      songs/
    sounds/
    music/
    fonts/
    models/
    videos/
    ndlls/
    scripts/
      global/
      songs/
      stages/
      noteTypes/
      events/
      states/
        global
        <state>
        <state>/
      substates/
        global
        <substate>
        <substate>/
```

## What Each Folder Is For

### `data/`
JSON data that drives gameplay, menus, and engine behavior.

The engine reads these files directly:

- [`data/meta.json`](/meta-json)
- `data/debug.json` 
- `data/characters/` 
- `data/stages/`
- `data/strumLines/` 
- `data/weeks/`
- `data/huds/` 
- `data/notes/` 
- `data/splashes/` 

### `images/`
All image assets.

- `images/characters/` 
- `images/huds/<hud>/combo/` 
- `images/icons/`
- `images/notes/`
- `images/splashes/` 
- `images/stages/`
- `images/songs/`

You can add other image folders too, but those are the ones the engine already expects in code.

### `sounds/`
Short sound effects loaded with `Paths.sound(...)`.

Supported file types:

- `.ogg`

### `music/`
Music tracks loaded with `Paths.music(...)`.

Supported file types:

- `.ogg`

### `fonts/`
Font files loaded with `Paths.font(...)`.

Supported file types:

- no extension is enforced by the path helper
- typically `.ttf` or `.otf`

### `models/`
3D model files loaded with `Paths.model(...)`.

Supported file types:

- `.obj`

### `videos/`
Video files loaded with `Paths.video(...)`.

Supported file types:

- `.mp4`

### `ndlls/`
Native libraries loaded with `Paths.ndll(...)`.

Supported file types:

- `.ndll`
- the build target suffix is added automatically, like `-windows`, `-linux`, or `-mac`

### `scripts/`
Runtime scripts.

Known script groups from the source:

- `scripts/global/` - shared script code loaded with other script groups
- `scripts/songs/` - song-specific scripts that run during gameplay songs
- `scripts/stages/` - stage scripts tied to the current stage
- `scripts/noteTypes/` - custom note type scripts
- `scripts/events/` - chart event scripts
- `scripts/states/` - custom state scripts
- `scripts/substates/` - custom substate scripts

`scripts/states/` and `scripts/substates/` support either a single file or a folder with the same name.

Supported file types:

- `.hx`
- `.lua`
- folders containing script files
