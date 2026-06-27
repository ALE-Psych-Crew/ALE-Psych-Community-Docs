---
title: Custom Settings
description: How ALE Psych handles custom settings and controls.
credits: ImMalloy
---

# Custom Settings

<Notice status="newly-added" />

ALE Psych supports custom settings in `mods/<mod>/data/options.json`.

From the source, each option uses this shape:

```json
{
  "name": "Option name",
  "description": "Short description shown to the player",
  "type": "bool",
  "initial": true,
  "platform": "desktop",
  "path": "some/state/or/substate",
  "list": "choiceList",
  "min": 0,
  "max": 10,
  "change": 1,
  "decimals": 2
}
```

## Fields

- `name`: display name
- `description`: short helper text
- `type`: option type
- `initial`: default value
- `platform`: optional platform filter
- `path`: optional target path for state/substate-style options
- `list`: optional list id for string options
- `min`: minimum value for numeric options
- `max`: maximum value for numeric options
- `change`: step size for numeric options
- `decimals`: decimal precision for floats

## Option Types

### `bool`
Use this for simple on/off settings.

Example:

```json
{
  "name": "Downscroll",
  "description": "Moves notes downward instead of upward.",
  "type": "bool",
  "initial": false
}
```

### `int`
Use this for whole-number settings.

Example:

```json
{
  "name": "Note Size",
  "description": "Adjusts the size of notes.",
  "type": "int",
  "initial": 100,
  "min": 50,
  "max": 150,
  "change": 5
}
```

### `float`
Use this for decimal settings.

Example:

```json
{
  "name": "Camera Zoom",
  "description": "Sets the default gameplay zoom.",
  "type": "float",
  "initial": 1.0,
  "min": 0.5,
  "max": 2.0,
  "change": 0.1,
  "decimals": 1
}
```

### `string`
Use this when the player should choose from a list of values.

The source exposes a `list` field, so this format is best documented as a named list of choices.

Example:

```json
{
  "name": "Judgement Style",
  "description": "Chooses the visual judgement style.",
  "type": "string",
  "initial": "default",
  "list": "judgementStyle"
}
```

Example choice list:

```json
{
  "judgementStyle": [
    "default",
    "classic",
    "minimal"
  ]
}
```

### `state`
Use this to open a state.

Example:

```json
{
  "name": "Open Mod Menu",
  "description": "Opens a custom mod state.",
  "type": "state",
  "initial": null,
  "path": "ModMenuState"
}
```

### `substate`
Use this to open a substate.

Example:

```json
{
  "name": "Open Credits Overlay",
  "description": "Opens a custom substate overlay.",
  "type": "substate",
  "initial": null,
  "path": "CreditsSubState"
}
```
