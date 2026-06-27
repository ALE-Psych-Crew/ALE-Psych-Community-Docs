---
title: Meta JSON
description: Reference for `data/meta.json`.
credits: ImMalloy
---

# Meta JSON

`data/meta.json` is the startup metadata file. (previously known as data.json) If it is missing, ALE Psych uses the built-in defaults.

<Notice
  status="partial-documentation"
  title="WIP"
  description="This page is still being filled out."
/>

## Fields

| Field | Type | Default | What it does |
| --- | --- | --- | --- |
| `developerMode` | bool | `false` | Enables developer-oriented behavior. |
| `mobileMode` | bool | `false` | Marks the game as running in mobile mode. |
| `hotReloading` | bool | `true` | Keeps hot reloading enabled. |
| `debugPrint` | bool | `true` | Enables debug logging. |
| `verbose` | bool | `false` | Uses more detailed logging. |
| `initialState` | string | `InitialState` | State loaded first. |
| `titleState` | string | `TitleState` | Title screen state. |
| `storyMenuState` | string | `StoryMenuState` | Story mode menu state. |
| `freeplayState` | string | `FreeplayState` | Freeplay menu state. |
| `mainMenuState` | string | `MainMenuState` | Main menu state. |
| `creditsState` | string | `CreditsState` | Credits state. |
| `optionsState` | string | `OptionsState` | Options state. |
| `masterState` | string | `MasterState` | Master/menu hub state. |
| `pauseSubState` | string | `PauseSubState` | Pause screen substate. |
| `gameOverSubState` | string | `GameOverSubState` | Game over substate. |
| `transition` | string | `FadeTransition` | Transition class used between states. |
| `loadDefaultWeeks` | bool | `false` | Loads the built-in weeks. |
| `bpm` | number | `102` | Default BPM used by the engine. |
| `discordID` | string | `1309982575368077416` | Discord application ID. |
| `discordButtons` | array | see defaults | Buttons shown for Discord rich presence. |
| `title` | string | `Friday Night Funkin': ALE Psych` | Window title. |
| `windowColor` | string | `0xFF212121` | Window border color string. |
| `width` | number | `1280` | Game window width. |
| `height` | number | `720` | Game window height. |
| `save` | string or null | `null` | Optional save slot or save label. |

## `discordButtons`

`discordButtons` is an array of button objects.

Each entry uses:

- `label`
- `url`

### Example

```json
{
  "label": "ALE Psych Website",
  "url": "https://ale-psych-crew.github.io/ALE-Psych-Site/"
}
```

## Example `data/meta.json`

```json
{
  "developerMode": false,
  "mobileMode": false,
  "hotReloading": true,
  "debugPrint": true,
  "verbose": false,
  "initialState": "InitialState",
  "titleState": "TitleState",
  "storyMenuState": "StoryMenuState",
  "freeplayState": "FreeplayState",
  "mainMenuState": "MainMenuState",
  "creditsState": "CreditsState",
  "optionsState": "OptionsState",
  "masterState": "MasterState",
  "pauseSubState": "PauseSubState",
  "gameOverSubState": "GameOverSubState",
  "transition": "FadeTransition",
  "loadDefaultWeeks": false,
  "bpm": 102,
  "discordID": "1309982575368077416",
  "discordButtons": [
    {
      "label": "ALE Psych Website",
      "url": "https://ale-psych-crew.github.io/ALE-Psych-Site/"
    }
  ],
  "title": "Friday Night Funkin': ALE Psych",
  "windowColor": "0xFF212121",
  "width": 1280,
  "height": 720,
  "save": null
}
```
