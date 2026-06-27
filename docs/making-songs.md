---
title: Creating Songs
description: How to add custom songs, charts, and week entries to an ALE Psych mod.
credits: ImMalloy
---

# Creating Songs

Songs in ALE Psych are loaded from the active mod, and there is no need to register them in a global list like older engines.

This guide explains how to add a song, configure its difficulties, and make it appear in Story Mode and Freeplay.

## Creating the song folder

Create a new folder inside your mod's `songs` directory:

```text
mods/<modname>/songs/<SongName>/
```

For example, a song named `MySong` inside a mod named `MyMod` would use:

```text
mods/MyMod/songs/MySong/
```

The song folder name must match the song name used by the week file.

## Song folder structure

A normal song folder should have the following structure:

```text
mods/<modname>/songs/<SongName>/
├── audios/
│   ├── Inst.ogg
│   └── Voices.ogg
├── charts/
│   ├── easy.json
│   ├── normal.json
│   └── hard.json
└── scripts/
    └── optional script files (lua or hx)
```

### Audio files

Place the song audio inside the `audios` folder.

```text
audios/Inst.ogg
audios/Voices.ogg
```

Currently, the engine only supports `.ogg` file types.

`Inst.ogg` contains the instrumental.

`Voices.ogg` contains the character vocals.
The engine supports multiple vocal file types, including:

- `audios/Voices.ogg` as the default/shared vocal track
- `audios/Voices-Player.ogg`
- `audios/Voices-Opponent.ogg`
- `audios/Voices-<char.id>.ogg` for individual characters

### Chart files

Place each difficulty chart inside the `charts` folder:

```text
charts/easy.json
charts/normal.json
charts/hard.json
```

The difficulty must match an available chart filename. I've seen some Psych mods do this issue sometimes.

### Song scripts

The `scripts` folder can contain scripts that should only load while playing that song.

```text
songs/<SongName>/scripts/
```

## Chart formats

ALE Psych can load charts using its newer ALE chart format.

I won't document a lot about this until Alejo releases a new update on the (currently missing) Chart Editor.

It can also load and convert older Psych Engine charts, which makes it possible to port charts created using the Psych Engine Chart Editor.

## Adding the song to a week

Creating the song folder is not enough to make the song appear in the menus.

Story Mode and Freeplay get the songs from week files located in:

```text
mods/<modname>/data/weeks/
```

Add your song to the `songs` array of a week JSON file.

```json
{
  "songs": [
    {
      "name": "MySong",
      "icon": "bf",
      "color": "#FFFFFF"
    }
  ],
  "background": "stage",
  "image": "week1",
  "phrase": "My Custom Week",
  "locked": false,
  "hideFreeplay": false,
  "hideStoryMode": false,
  "previousWeek": "tutorial",
  "difficulties": [
    "Normal"
  ],
  "format": "ale-week-v0.1"
}
```

The value of `name` must match the song folder:

```text
Week song name: MySong
Song folder:    songs/MySong/
```

## Configuring difficulties

The week's `difficulties` array controls which difficulties can be selected from the menus.

```json
"difficulties": [
  "Easy",
  "Normal",
  "Hard"
]
```

Each difficulty must have a corresponding chart file:

```text
Easy   -> charts/easy.json
Normal -> charts/normal.json
Hard   -> charts/hard.json
```

A missing chart file will cause chart loading to fail when that difficulty is selected.

## Hiding the song from menus

Week files can control where their songs appear.

To hide the week from Story Mode:

```json
"hideStoryMode": true
```

To hide its songs from Freeplay:

```json
"hideFreeplay": true
```

Setting both values to `false` makes the week available in both menus.

## Minimal song example

The minimum folder setup for a song named `MySong` is:

```text
mods/MyMod/
├── songs/
│   └── MySong/
│       ├── audios/
│       │   ├── Inst.ogg
│       │   └── Voices.ogg
│       └── charts/
│           └── normal.json
└── data/
    └── weeks/
        └── my-week.json
```

The matching week file would contain:

```json
{
  "songs": [
    {
      "name": "MySong",
      "icon": "bf",
      "color": "#FFFFFF"
    }
  ],
  "background": "stage",
  "image": "week1",
  "phrase": "My Custom Week",
  "locked": false,
  "hideFreeplay": false,
  "hideStoryMode": false,
  "previousWeek": "tutorial",
  "difficulties": [
    "Normal"
  ],
  "format": "ale-week-v0.1"
}
```

## Common problems

### The song does not appear in Freeplay

Make sure the song was added to a week file and that the week does not use:

```json
"hideFreeplay": true
```

### The song does not appear in Story Mode

Make sure the week does not use:

```json
"hideStoryMode": true
```

### The engine cannot find the song

Check that the week song name matches the song folder name.

```text
Correct:
"name": "MySong"
songs/MySong/

Incorrect:
"name": "My Song"
songs/MySong/
```

Although the engine performs formatted, case-insensitive searches, using matching names avoids loading problems and looks cleaner and more organized.

### A difficulty does not load

Make sure the difficulty listed in the week has a matching chart file.

```text
"Normal" -> charts/normal.json
```

### The audio does not play

Verify that the files are inside the song's `audios` folder and use the expected names:

```text
audios/Inst.ogg
audios/Voices.ogg (or variations mentioned above)
```
