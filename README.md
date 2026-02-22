# Classic Snake

A minimal browser-based Snake game.

## Play online (no local setup)

This repo includes a GitHub Pages deployment workflow.

1. Push this repository to GitHub.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy Snake to GitHub Pages** workflow manually).
4. Open the published URL:
   `https://<your-github-username>.github.io/<your-repo-name>/`

After that, you can play in your browser anytime without running a local server.

## Optional local run

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
