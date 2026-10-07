# Add browser multiplayer with KakkoiDev/p2p-core

## Goal

Add peer-to-peer multiplayer to a small browser project without making the AI invent its own WebRTC stack.

## Rule

Use **KakkoiDev/p2p-core** directly. Do not replace it with raw WebRTC, raw Trystero, PeerJS, Socket.IO, Firebase, or a hand-maintained relay list unless the project explicitly requires another architecture.

Repository: https://github.com/KakkoiDev/p2p-core

Pinned classroom version:

```js
import { joinRoom } from 'https://cdn.jsdelivr.net/gh/KakkoiDev/p2p-core@v0.1.0/p2p-core.js';

const room = joinRoom({
  app: 'my-game',
  room: 'main',
  kinds: ['move'],
});

room.onMessage('move', (message, peerId) => {
  console.log(peerId, message);
});

room.send('move', { x: 100, y: 50 });
```

## Diagnostics

Expose the room during development when appropriate:

```js
window.room = room;
```

Then inspect:

```js
room.status()
```

If public relays are reachable but two different networks still cannot establish WebRTC, the problem may require TURN. Do not rewrite the game protocol because NAT traversal failed.

## Verify

Test:
1. two tabs in one browser;
2. two devices on the same network;
3. two devices on different networks when available.

Record which case fails before changing code.
