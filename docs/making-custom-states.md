---
title: Custom States
description: How Make Your Own Scripteable And Custom States.
---

# Custom States

For make Custom States in ALE Psych, go to `mods/<mod>/scipts/states`.

You have 2 options for this: Replacing the original ones typing like `TitleState.hx, MainMenuState.hx, etc`
or making new one without replacing.

in this case we gonna replace MainMenuState.hx because its more easier lmao, and we gonna make to put a image for example.
and for the image in the modfolder you need to create a new folder called "images" and put a random image that you want to show.

As you can see all here is blank but because we dont add the image and the code.
![](https://drive.google.com/u/0/drive-viewer/AKGpiha78jVkWGyU0Wu7V5d4UTVP2rOMhQJSCMh8HqcNFnRfP_diT0-rCp50pT1irAYU6RcYwWtMHDeeKSdZ26K9KHk4b1KhMkjyvQ=s1600-rw-v1?auditContext=forDisplay)

So lets put this in the code.
```haxe
var imagelol:FlxSprite = new FlxSprite(300, 60).loadGraphic(Paths.image('thenameoftheimageanddontputdotpng'));
add(imagelol);
```
yeah, thats all the code you need to put.

And now we hace a silly image here!.
![](https://drive.google.com/u/0/drive-viewer/AKGpihZlD37-_k4ll2Nyh_EoirLf_1TefRgbS9YBhizcav9bNsxzpadtzCGh80PpePa61uX2VMJe33bg3iSgA0vmnlNl-kYhvst2HA=s1600-rw-v1?auditContext=forDisplay)

And if you want to change a another state like freeplay just put this code below the imagelol thing.
```haxe
function postUpdate(elapsed:Float)
{
    if(Controls.ACCEPT)
    {
        CoolUtil.switchState(new CustomState(CoolVars.data.freeplayState));
    }
        
}
```

For the switchState if you want another different state just change the part of freeplayState and replace it with: `mainMenuState, initialState, optionsState`

And thats all folks ;3.
