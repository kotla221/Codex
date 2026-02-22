# Classic Snake

A minimal browser-based Snake game.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Controls

- Move: Arrow keys or `WASD`
- Pause/Resume: `Space` or **Pause** button
- Restart: **Restart** button

## Manual verification checklist

- [ ] Snake responds to Arrow keys and WASD.
- [ ] Snake grows by one segment and score increments after eating food.
- [ ] Game ends when the snake hits walls or itself.
- [ ] Pause freezes game updates and Resume restarts updates.
- [ ] Restart returns the game to initial state with score reset.
