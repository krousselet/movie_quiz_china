<template>
  <section class="rules-page" aria-labelledby="rules-title">
    <div class="cinema-overlay"></div>

    <div class="rules-container">
      <div class="page-heading">
        <h1 id="rules-title" class="main-heading">Game Rules</h1>
        <p class="sub-heading">Understand every mode, difficulty and joker</p>
        <div class="divider">❖ ❖ ❖</div>
      </div>

      <!-- Classic Mode -->
      <div class="rule-block">
        <h2 class="rule-title">🎬 Classic Mode</h2>
        <div class="rule-content">
          <p>Play at your own rhythm with no timer or pressure.</p>
          <ul>
            <li>Guess movie titles from posters</li>
            <li>No time limit</li>
            <li>No forced difficulty</li>
            <li>Use the <strong>End Session</strong> button to save your stats</li>
          </ul>
        </div>
      </div>

      <!-- Beat The Clock -->
      <div class="rule-block">
        <h2 class="rule-title">⏱️ Beat The Clock</h2>
        <div class="rule-content">
          <p>Race against the timer to reach a fixed number of movies in 5 minutes.</p>
          <ul>
            <li><strong>Easy</strong> : 5 movies in 5 minutes</li>
            <li><strong>Medium</strong> : 10 movies in 5 minutes</li>
            <li><strong>Hard</strong> : 15 movies in 5 minutes</li>
            <li><strong>Master</strong> : 20 movies in 5 minutes</li>
          </ul>
        </div>
      </div>

      <!-- Longest Streak -->
      <div class="rule-block">
        <h2 class="rule-title">🔥 Longest Streak</h2>
        <div class="rule-content">
          <p>Chain correct answers in a row to complete the challenge.</p>
          <ul>
            <li><strong>Easy</strong> : Reach a streak of 5 correct movies</li>
            <li><strong>Medium</strong> : Win 2 pairs in a row</li>
            <li><strong>Hard</strong> : Win 3 pairs in a row</li>
            <li><strong>Master</strong> : Discover all pairs without mistake</li>
          </ul>
        </div>
      </div>

      <!-- Investigation Mode -->
      <div class="rule-block">
        <h2 class="rule-title">🔍 Investigation Mode</h2>
        <div class="rule-content">
          <p>The poster is blurred. Answer questions to reveal details.</p>
          <ul>
            <li>Correct answers = unblur the poster</li>
            <li>Wrong answers = re-blur parts of the image</li>
            <li><strong>Easy</strong> : 3 questions</li>
            <li><strong>Medium</strong> : 5 questions</li>
            <li><strong>Hard</strong> : 7 questions</li>
            <li><strong>Master</strong> : 10 questions</li>
          </ul>
          <p class="text-muted"><em>This mode will be implemented last.</em></p>
        </div>
      </div>

      <!-- Jokers System -->
      <div class="rule-block">
        <h2 class="rule-title">🃏 Jokers System</h2>
        <div class="rule-content">
          <p>Each game mode has <strong>3 unique jokers</strong>, usable only once per session.</p>

          <h3>Beat The Clock Jokers</h3>
          <ul>
            <li>Skip a movie</li>
            <li>Pause the timer for 10 seconds</li>
            <li>Add 15 seconds to the timer</li>
            <li>Reveal one letter of the title</li>
          </ul>

          <h3>Longest Streak Jokers</h3>
          <ul>
            <li>Allow one mistake without breaking streak</li>
            <li>Skip the current movie</li>
            <li>Reveal one letter</li>
          </ul>

          <h3>Investigation Jokers</h3>
          <ul>
            <li>Reveal one letter</li>
            <li>Get a hint for a question</li>
            <li>Get the correct answer for one question</li>
          </ul>
        </div>
      </div>

      <!-- Global Session Rules -->
      <div class="rule-block">
        <h2 class="rule-title">📊 Session & Statistics</h2>
        <div class="rule-content">
          <ul>
            <li>Every session saves your score, streak, attempts and time</li>
            <li>All data is stored locally in your browser</li>
            <li>Leaderboard sorts results by score, time or date</li>
            <li>You can skip a movie if you cannot find the answer</li>
          </ul>
        </div>
      </div>

      <!-- Accessibility & Settings -->
      <div class="rule-block">
        <h2 class="rule-title">♿ Accessibility & Settings</h2>
        <div class="rule-content">
          <ul>
            <li>Dark / Light mode toggle</li>
            <li>Font size & font style customization</li>
            <li>Background music toggle</li>
            <li>Full screen reader and keyboard navigation support</li>
            <li>Deaf & visually impaired friendly design</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed, static informative page
</script>

<style scoped lang="scss">
.rules-page {
  min-height: calc(100vh - 70px);
  padding: 3rem 1.2rem;
  position: relative;
  background: var(--bg-primary);
}

.cinema-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(207, 168, 88, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: slowPan 30s linear infinite;
  pointer-events: none;
}

@keyframes slowPan {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}

.rules-container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.page-heading {
  text-align: center;
  margin-bottom: 3rem;
}

.main-heading {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-primary);
  letter-spacing: 0.15em;
  margin-bottom: 0.6rem;
}

.sub-heading {
  color: var(--text-secondary);
  font-size: 1rem;
}

.divider {
  color: var(--cinema-gold);
  opacity: 0.6;
  margin: 1.8rem 0;
  letter-spacing: 0.6em;
}

/* Rule Block Styling — theatre card style */
.rule-block {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1.6rem 2rem;
  margin-bottom: 2rem;
  transition: border 0.3s ease;

  &:hover {
    border-color: rgba(207, 168, 88, 0.25);
  }
}

.rule-title {
  color: var(--cinema-gold);
  font-size: 1.4rem;
  margin-bottom: 1rem;
  letter-spacing: 0.08em;
}

.rule-content {
  color: var(--text-secondary);
  line-height: 1.7;

  h3 {
    color: var(--text-primary);
    margin: 1rem 0 0.5rem;
    font-size: 1.05rem;
  }

  ul {
    padding-left: 1.4rem;
    margin-bottom: 0.8rem;
  }

  strong {
    color: var(--cinema-gold);
  }
}

.text-muted {
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .rule-block {
    padding: 1.2rem 1rem;
  }
}

/* Ultra wide cinema screens */
@media (min-width: 1920px) {
  .rules-container {
    max-width: 1300px;
  }
}
</style>