---
title: Mod Asset Structure
description: How ALE Psych searches for assets and which files mods can override.
credits: ImMalloy
---

# Mod Asset Structure

ALE Psych searches several asset roots whenever it needs to load files.
Understanding this order is important when creating mods, replacing base content, and debugging.

## Loading Priority

ALE searches asset roots in this order:

```text
1. mods/<active-mod>/
2. content/
3. assets/
```

The first matching asset is used.

This means files from the active mod have priority over files from `content` and the base `assets` folder.

## Basic Example

Suppose the engine requests:

```text
images/characters/bf.png
```

ALE searches for it in this order:

```text
mods/MyMod/images/characters/bf.png
content/images/characters/bf.png
assets/images/characters/bf.png
```

When the file exists inside `mods/MyMod`, that version is used.

If it does not exist there, ALE checks `content`. If it is also missing from `content`, ALE checks the base `assets` folder.

## Root Priority Does Not Merge File Contents

Asset loading priority selects files. It does not automatically combine the contents of two files with the same path.

For example:

```text
mods/MyMod/data/characters/bf.json
assets/data/characters/bf.json
```

does not produce one merged character definition.

The modded `bf.json` is selected instead of the base JSON.

The modded file must contain all fields required by its format.

The same applies to:

```text
stage JSON
week JSON
character JSON
strumline JSON
chart JSON
etc
```

## Case Sensitivity

Windows normally uses case-insensitive file paths, which can hide capitalization mistakes during development.

Other operating systems may use case-sensitive paths.

For example:

```text
MyCharacter.png
```

is not guaranteed to match:

```text
mycharacter.png
```

Use consistent capitalization for:

```text
JSON filenames
image paths
atlas filenames
character IDs
stage IDs
song folder names
difficulty chart names
audio filenames
etc
```

## File Extensions

Use the extension expected by the relevant loader.

Examples:

```text
Character data: .json
Charts:         .json
Images:         .png
Sparrow atlas:   .xml
Packer atlas:    .txt
Aseprite atlas:  .json
Audio:          .ogg
etc
```

Do not include extensions in JSON.

Correct:

```json
"image": "characters/MyCharacter"
```

Potentially incorrect:

```json
"image": "characters/MyCharacter.png"
```

The correct form depends on the specific field, but character image fields normally omit `.png`.

## Example Mod Structure

```text
mods/MyMod/
├── data/
│   ├── characters/
│   │   ├── my-character.json
│   │   └── my-character-dead.json
│   ├── stages/
│   │   └── my-stage.json
│   ├── strumLines/
│   │   └── custom.json
│   └── weeks/
│       └── my-week.json
├── images/
│   ├── characters/
│   │   ├── MyCharacter.png
│   │   ├── MyCharacter.xml
│   │   ├── MyCharacterDead.png
│   │   └── MyCharacterDead.xml
│   ├── icons/
│   │   └── my-character.png
│   └── stages/
│       └── MyStageBackground.png
└── songs/
    └── MySong/
        ├── audios/
        │   ├── Inst.ogg
        │   ├── Voices.ogg
        │   └── Voices-my-character.ogg
        ├── charts/
        │   └── normal.json
        └── scripts/
```

Every path inside this structure is checked before the equivalent path in:

```text
content/
assets/
```
