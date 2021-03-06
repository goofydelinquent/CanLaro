CanLaro: Helpers for HTML5 2D Canvas Game Development
=====================================================

Here are a few Javascript objects to help you get started: Sprite & Keyboard Input Handler.
Resource Loader is still being worked out but usable.

Sprite
--------------  
* Constructor:

        var sprite = new Sprite(imageURL, spriteWidth, spriteHeight, columns, rows)

* Adding Animations:

        bob.AddAnimation(animationIdentifier, arrayOfFrameIndexes, isLooping);
    
  * The animation identifier is used to tell the Sprite which animation to play.

  * A frame index is zero-indexed, from left to right, top to bottom. (by column & by row). Example:    

            bob.AddAnimation("swalk", new Array(9,10,9, 11), true);
        
  * Note: When adding animations with a single frame, you must be careful as instantiating an array with: `new Array(3)`  will create an array of size 3, and not an array with a single element 3.

  * Currently, the sprite is being put on the next frame of animation (if applicable) per `Draw` call.

Keyboard Input Handler
-----------------------
* Constructor:

        var keyboard = new KeyboardInput();

  **Important:** You must link `OnKeyDown` & `OnKeyUp` of the handler to the window events like:
  
        $(window).keydown( function(evt) { keyboard.OnKeydown(evt) });
        $(window).keyup( function(evt) { keyboard.OnKeyUp(evt) });
  
* Adding Watched Keys:

        keyboard.AddKey(keyIdentifier, keyCode);

  * The key identifier is best considered as an action or a "button". 
  * The key code can be changed, but the `keyIdentifier` can stay the same throughout the game.
  * They key code is as given by the `onkeydown`/`onkeyup` event `keyCode`.
  * Example:
              keyboard.AddKey('jump', 32); //spacebar

* Checking if keys are pressed:

        keyboard.keyState.keyIdentifier
    
  * This is where the key identifier comes into play. This simply returns a boolean if the key assigned to that is being pressed or not.
  
  * Example:
  
            if (keyboard.keyState.jump) //'jump' key is pressed
            { /* jump code here */ }

* Adding Opposing keys:

        keyboard.AddOpposingKeys(keyIdentifier0, keyIdentifier1);

  * Opposing keys are basically overrides to existing key presses. You can't press up or down simultaneously so the latest one becomes true with the other is false.

  * Example: 
  
            keyboard.AddOpposingKeys('up', 'down');
        
      Here, the `up` and `down` keys can't be pressed simultaneously. If you hold down `up` and then press `down`, only `down` will be set to true.
