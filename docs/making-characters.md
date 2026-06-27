---
title: Creating Characters
description: How to manually create characters for ALE Psych.
credits: ImMalloy
---

# Creating Characters

Creating characters through an in-engine editor is not available yet, so you will have to add the files manually.

For a normal sprite-sheet character, you will need:

- A character JSON
- A PNG sprite sheet
- An atlas file

Your files should look like this:

```text
mods/<modname>/
├── data/
│   └── characters/
│       └── my-character.json
└── images/
    └── characters/
        ├── MyCharacter.png
        └── MyCharacter.xml
```

ALE supports the following atlas formats:

```text
.xml   Sparrow
.txt   Packer
.json  Aseprite
```

Character IDs are not automatically normalized, so make sure the filename and the ID used by your song match exactly.

## Writing the character JSON

ALE normally uses Psych Engine-like character JSON files and converts them into its internal character format.

Here is a basic character:

```json
{
  "animations": [
    {
      "anim": "idle",
      "name": "My Character Idle",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "singUP",
      "name": "My Character Sing Up",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "singLEFT",
      "name": "My Character Sing Left",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "singRIGHT",
      "name": "My Character Sing Right",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "singDOWN",
      "name": "My Character Sing Down",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    }
  ],
  "image": "characters/MyCharacter",
  "scale": 1,
  "sing_duration": 4,
  "healthicon": "my-character",
  "position": [0, 0],
  "camera_position": [0, 0],
  "flip_x": false,
  "no_antialiasing": false,
  "healthbar_colors": [255, 255, 255]
}
```

There is quite a lot here, so we will go over the main character properties first.

- `animations` contains all anims available to the character.
- `image` determines which sprite sheet to load from `images/characters/`.
- `scale` determines the size of the character.
- `sing_duration` determines how long singing animations remain active.
- `healthicon` determines which health icon the character uses.
- `position` adjusts the character's base X and Y position.
- `camera_position` adjusts the camera focus point.
- `flip_x` can be used when the character faces the wrong direction.
- `no_antialiasing` disables smoothing, which is useful for pixel art.
- `healthbar_colors` sets the character's health bar color using RGB values.

For example:

```json
"healthbar_colors": [49, 176, 209]
```

This creates a color using:

```text
Red:   49
Green: 176
Blue:  209
```

You should include all of the normal Psych character fields. Missing fields can cause ALE to reject the character and use its fallback character instead.

## Animation Properties

Each entry inside `animations` defines one animation.

```json
{
  "anim": "singLEFT",
  "name": "My Character Sing Left",
  "fps": 24,
  "loop": false,
  "indices": [],
  "offsets": [0, 0]
}
```

The properties are:

- `anim` defines the internal animation name used by gameplay and scripts.
- `name` is the animation prefix inside the spritesheet.
- `fps` determines the animation's frame rate.
- `loop` determines whether the animation repeats.
- `indices` selects specific frames from the spritesheet animation.
- `offsets` adjusts the character's position.

The `anim` and `name` values are not the same thing. Please don't confuse these.

```json
"anim": "singLEFT",
"name": "My Character Sing Left"
```

`singLEFT` is what the engine requests during gameplay.

`My Character Sing Left` is what the engine searches for inside the spritesheet.

## Required Animations

A normal singing character should usually have:

```text
idle
singLEFT
singDOWN
singUP
singRIGHT
```

Player characters can also use miss animations:

```text
singLEFTmiss
singDOWNmiss
singUPmiss
singRIGHTmiss
```

When an animation requested by gameplay does not exist, ALE does not automatically replace it with another animation. The request is simply ignored, so make sure the animation names match exactly.

## Dance Animations

Characters can use two alternating dance animations instead of a normal `idle`, kind of like Girlfriend:

```text
danceLeft
danceRight
```

Example:

```json
{
  "anim": "danceLeft",
  "name": "My Character Dance Left",
  "fps": 24,
  "loop": false,
  "indices": [],
  "offsets": [0, 0]
},
{
  "anim": "danceRight",
  "name": "My Character Dance Right",
  "fps": 24,
  "loop": false,
  "indices": [],
  "offsets": [0, 0]
}
```

When both animations exist, ALE automatically configures them as the character's alternating bop animations.

This is commonly used for girlfriend-style characters.

## Character Direction

The final direction of a character is affected by both:

```json
"flip_x": false
```

and the character's gameplay role.

ALE automatically changes the final flip depending on whether the character is being used as a player.

Because of this, you should test the character in its actual song position before changing `flip_x`.

## Character Roles

Characters can be assigned to three gameplay roles:

```text
player
opponent
extra
```

The role is not stored permanently inside the Psych character JSON.

It is assigned through the song's strumline configuration.

- `player` is normally the playable character.
- `opponent` is normally the opposing character.
- `extra` is used for additional characters.

A character can therefore be used as a player in one song and as an opponent in another.

## Character Positioning

The base position is controlled by:

```json
"position": [0, 0]
```

The camera focus is controlled by:

```json
"camera_position": [0, 0]
```

Individual animation offsets are controlled by:

```json
"offsets": [0, 0]
```

Stages can also apply additional offsets based on:

- The character ID
- The character role

This means a character may appear in a different position depending on the current stage.

## Health Icons

Character icons are separate from character sprite sheets.

Place them inside:

```text
mods/<modname>/images/icons/
```

For example:

```text
mods/MyMod/images/icons/my-character.png
```

Then reference the icon through:

```json
"healthicon": "my-character"
```

The icon ID does not have to match the character ID, although using the same name usually makes the files easier to manage.

## Health Bar Color

The character's side of the health bar uses:

```json
"healthbar_colors": [255, 255, 255]
```

The value must be an RGB array when using Psych-style character JSON.

Color strings such as this are not supported in the Psych field:

```json
"healthbar_colors": "#FFFFFF"
```

## Game-Over Characters

Game-over characters, mainly playable ones, are separate character definitions.

A game-over character should have these animations:

```text
firstDeath
deathLoop
deathConfirm
```

- `firstDeath` plays when the player loses.
- `deathLoop` plays while waiting for the player to choose an option.
- `deathConfirm` plays when retrying the song.

Example:

```json
{
  "animations": [
    {
      "anim": "firstDeath",
      "name": "Character First Death",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "deathLoop",
      "name": "Character Death Loop",
      "fps": 24,
      "loop": true,
      "indices": [],
      "offsets": [0, 0]
    },
    {
      "anim": "deathConfirm",
      "name": "Character Death Confirm",
      "fps": 24,
      "loop": false,
      "indices": [],
      "offsets": [0, 0]
    }
  ],
  "image": "characters/MyCharacterDead",
  "scale": 1,
  "sing_duration": 4,
  "healthicon": "my-character",
  "position": [0, 0],
  "camera_position": [0, 0],
  "flip_x": false,
  "no_antialiasing": false,
  "healthbar_colors": [255, 255, 255]
}
```

The default game-over character is:

```text
bf-dead
```

Psych fields such as `deadVariant` are not used by ALE's current character converter.

Selecting a custom death character directly requires ALE's native character format or custom gameplay logic.

Missing game-over animations do not have automatic fallbacks. `firstDeath` is especially important because the game-over sequence waits for it to finish.

## Character-Specific Vocals

Characters can also have their own vocal tracks.

Place character vocals inside the song's `audios` folder:

```text
mods/<modname>/songs/<song>/audios/Voices-<character-id>.ogg
```

For example:

```text
mods/MyMod/songs/MySong/audios/Voices-my-character.ogg
```

ALE also supports vocal layers based on character roles:

```text
Voices-Player.ogg
Voices-Opponent.ogg
Voices-Extra.ogg
```

These vocal tracks are layered with the normal:

```text
Voices.ogg
```

They do not automatically replace it.

## Multiple Character Images

Psych-style character JSON can reference more than one image by separating the image paths with commas:

```json
"image": "characters/MyCharacter,characters/MyCharacterEffects"
```

ALE converts these paths into its internal image list.

This is an advanced feature and may require animations or scripts that use the additional image data correctly.

## Native ALE Characters

ALE also has its own character format:

```json
"format": "ale-character-v0.1"
```

The native format provides direct access to properties such as:

```text
images
type
initialAnimation
bopAnimations
animationLength
cameraOffset
death
sustainAnimation
barColor
```

Most mods should use the Psych-style format because it matches the characters included with ALE Psych.

The native format is better suited for advanced setups that need ALE-specific character properties.
