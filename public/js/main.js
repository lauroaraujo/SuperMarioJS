import {loadLevel} from './loaders.js';
import {loadBackgroundSprite, loadMarioSprite} from './sprites.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function drawScene(backgroundSprite, marioSprite, level) {
  const pos = { x: 0, y: 176 };

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprite);
    const spriteLayer = createSpriteLayer(marioSprite, pos);
    const compositor = new Compositor();
    compositor.layers.push(backgroundLayer);
    compositor.layers.push(spriteLayer);

    function update() {
      compositor.draw(context);
      pos.x = pos.x >= 242 ? 0 : pos.x + 2;
      requestAnimationFrame(update);
    }

    update();
}

Promise.all([
  loadBackgroundSprite(),
  loadMarioSprite(),
  loadLevel('1-1')
])
.then((allResponses) => drawScene(...allResponses));
