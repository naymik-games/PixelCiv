var cacheName = 'PixelCiv v1.00';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',

  '/assets/classes/settings.js',
  '/assets/classes/ai.js',
  '/assets/classes/easystar.min.js',
  '/assets/classes/functions.js',
  '/assets/classes/ground.js',
  '/assets/classes/improvements.js',
  '/assets/classes/player.js',
  '/assets/classes/unit.js',

  '/assets/scenes/preload.js',
  '/assets/scenes/startGame.js',
  '/assets/scenes/pauseGame.js',
  '/assets/scenes/tech.js',
  '/assets/scenes/UI.js',



  '/assets/fonts/KenneyPixelSquare.tff',
  '/assets/fonts/KenneyMiniSquare.tff',


  '/assets/sprites/blank.png',
  '/assets/sprites/borders.png',
  '/assets/sprites/build_modal.png',
  '/assets/sprites/build_unit_button.png',
  '/assets/sprites/cursors.png',

  '/assets/sprites/game_icons2_.png',
  '/assets/sprites/ground_panel_.png',
  '/assets/sprites/nation_panel.png',
  '/assets/sprites/nation_panel_top.png',
  '/assets/sprites/nation_panel_bottom.png',
  '/assets/sprites/player_logs.png',
  '/assets/sprites/puff.png',
  '/assets/sprites/resource_icons.png',
  '/assets/sprites/switch.png',
  '/assets/sprites/tech_tree.png',
  '/assets/sprites/techs.png',

  '/assets/sprites/tiles.png',
  '/assets/sprites/unit_icons.png',
  '/assets/sprites/unit_panel_.png',
  '/assets/sprites/units.png',
  '/assets/sprites/test.json',
  '/assets/sprites/test2.json',



  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});