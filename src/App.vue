<template>
  <!-- ======================
    MOVIEQUIZ INTRO ANIMATION
  ======================= -->
  <div v-if="!introFinished" class="intro-container">
    <netflixintro class="moviequiz-intro" letter="M">
      <div class="helper-1">
        <div class="effect-brush">
          <span class="fur-31"></span><span class="fur-30"></span><span class="fur-29"></span
          ><span class="fur-28"></span><span class="fur-27"></span> <span class="fur-26"></span
          ><span class="fur-25"></span><span class="fur-24"></span><span class="fur-23"></span
          ><span class="fur-22"></span> <span class="fur-21"></span><span class="fur-20"></span
          ><span class="fur-19"></span><span class="fur-18"></span><span class="fur-17"></span>
          <span class="fur-16"></span><span class="fur-15"></span><span class="fur-14"></span
          ><span class="fur-13"></span><span class="fur-12"></span> <span class="fur-11"></span
          ><span class="fur-10"></span><span class="fur-9"></span><span class="fur-8"></span
          ><span class="fur-7"></span> <span class="fur-6"></span><span class="fur-5"></span
          ><span class="fur-4"></span><span class="fur-3"></span><span class="fur-2"></span
          ><span class="fur-1"></span>
        </div>
        <div class="effect-lumieres">
          <span class="lamp-1"></span><span class="lamp-2"></span><span class="lamp-3"></span
          ><span class="lamp-4"></span><span class="lamp-5"></span> <span class="lamp-6"></span
          ><span class="lamp-7"></span><span class="lamp-8"></span><span class="lamp-9"></span
          ><span class="lamp-10"></span> <span class="lamp-11"></span><span class="lamp-12"></span
          ><span class="lamp-13"></span><span class="lamp-14"></span><span class="lamp-15"></span>
          <span class="lamp-16"></span><span class="lamp-17"></span><span class="lamp-18"></span
          ><span class="lamp-19"></span><span class="lamp-20"></span> <span class="lamp-21"></span
          ><span class="lamp-22"></span><span class="lamp-23"></span><span class="lamp-24"></span
          ><span class="lamp-25"></span> <span class="lamp-26"></span><span class="lamp-27"></span
          ><span class="lamp-28"></span>
        </div>
      </div>
      <div class="helper-2">
        <div class="effect-brush">
          <span class="fur-31"></span><span class="fur-30"></span><span class="fur-29"></span
          ><span class="fur-28"></span><span class="fur-27"></span> <span class="fur-26"></span
          ><span class="fur-25"></span><span class="fur-24"></span><span class="fur-23"></span
          ><span class="fur-22"></span> <span class="fur-21"></span><span class="fur-20"></span
          ><span class="fur-19"></span><span class="fur-18"></span><span class="fur-17"></span>
          <span class="fur-16"></span><span class="fur-15"></span><span class="fur-14"></span
          ><span class="fur-13"></span><span class="fur-12"></span> <span class="fur-11"></span
          ><span class="fur-10"></span><span class="fur-9"></span><span class="fur-8"></span
          ><span class="fur-7"></span> <span class="fur-6"></span><span class="fur-5"></span
          ><span class="fur-4"></span><span class="fur-3"></span><span class="fur-2"></span
          ><span class="fur-1"></span>
        </div>
      </div>
    </netflixintro>
  </div>

  <!-- ======================
    YOUR APP (VISIBLE AFTER INTRO)
  ======================= -->
  <template v-else>
    <AppNav />
    <main class="page-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="wave" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppNav from '@/components/layout/AppNav.vue'
import { useThemeStore } from '@/stores/themeStore'

const theme = useThemeStore()
theme.init()

// Intro animation control
const introFinished = ref(false)

onMounted(() => {
  // Auto-hide intro after animation ends (4.5s)
  setTimeout(() => {
    introFinished.value = true
  }, 4500)
})
</script>

<style lang="scss">
/* ==============================
   GLOBAL RESET (NO SCROLL EVER)
============================== */
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  position: fixed !important;
  inset: 0 !important;
}

/* ==============================
   RESPONSIVE MOVIEQUIZ INTRO ANIMATION
============================== */
$bg-color: #000000;
$base-color: #cfa858;

.intro-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;
  overflow: hidden;
  position: fixed;
  inset: 0;
  z-index: 9999;
}

netflixintro {
  display: block;
  position: relative;
  /* 🔥 RESPONSIVE SIZE FOR ALL SCREENS */
  width: min(300px, 70vw);
  height: min(300px, 70vw);
  max-width: 400px;
  max-height: 400px;
  overflow: hidden;
  animation: zoom-in 3.5s ease-in 0.5s forwards;

  &::before {
    content: '';
    position: absolute;
    background-color: $bg-color;
    width: 150%;
    height: 30%;
    left: -25%;
    bottom: -27%;
    border-radius: 50%;
    z-index: 5;
    transform-origin: left center;
  }

  &[letter='M'] {
    transform-origin: center center;

    .helper-1 {
      width: 19.5%;
      height: 100%;
      background-color: rgba($base-color, 0.5);
      left: 20%;
      top: 0;
      transform: rotate(180deg);
      animation: fading-lumieres-box 2s 0.6s forwards;

      .effect-brush {
        animation: brush-moving 2.5s 1.2s forwards;
        [class*='fur-'] {
          bottom: 0;
          height: 40%;
        }
      }
    }

    .helper-2 {
      width: 19.5%;
      height: 100%;
      left: 60%;
      top: 0;
      transform: rotate(180deg);
      overflow: hidden;

      .effect-brush {
        animation: brush-moving 2s 0.5s forwards;
      }
    }
  }

  [class*='helper-'] {
    position: absolute;

    .effect-brush {
      position: absolute;
      width: 100%;
      height: 300%;
      top: 0;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        background-color: $base-color;
        width: 100%;
        height: 70%;
        box-shadow: 0 0 29px 24px $base-color;
      }

      [class*='fur-'] {
        position: absolute;
        bottom: 10%;
        height: 30%;
        display: block;
      }

      .fur-1 {
        left: 0%;
        width: 3.8%;
        background: linear-gradient(to bottom, $base-color 15%, transparent 81%);
      }
      .fur-2 {
        left: 3.8%;
        width: 2.8%;
        background: linear-gradient(to bottom, $base-color 10%, transparent 62%);
      }
      .fur-3 {
        left: 6.6%;
        width: 4.8%;
        background: linear-gradient(to bottom, $base-color 37%, transparent 100%);
      }
      .fur-4 {
        left: 11.4%;
        width: 4%;
        background: linear-gradient(to bottom, $base-color 23%, transparent 100%);
      }
      .fur-5 {
        left: 15.4%;
        width: 4%;
        background: linear-gradient(to bottom, $base-color 15%, transparent 86%);
      }
      .fur-6 {
        left: 19.4%;
        width: 2.5%;
        background: linear-gradient(to bottom, $base-color 27%, transparent 89%);
      }
      .fur-7 {
        left: 21.9%;
        width: 4%;
        background: linear-gradient(to bottom, $base-color 20%, transparent 100%);
      }
      .fur-8 {
        left: 25.9%;
        width: 2%;
        background: linear-gradient(to bottom, $base-color 30%, transparent 100%);
      }
      .fur-9 {
        left: 27.9%;
        width: 4%;
        background: linear-gradient(to bottom, $base-color 35%, transparent 95%);
      }
      .fur-10 {
        left: 31.9%;
        width: 3.5%;
        background: linear-gradient(to bottom, $base-color 39%, transparent 95%);
      }
      .fur-11 {
        left: 35.4%;
        width: 2%;
        background: linear-gradient(to bottom, $base-color 34%, transparent 95%);
      }
      .fur-12 {
        left: 37.4%;
        width: 2.6%;
        background: linear-gradient(to bottom, $base-color 22%, transparent 95%);
      }
      .fur-13 {
        left: 40%;
        width: 6%;
        background: linear-gradient(to bottom, $base-color 47%, transparent 100%);
      }
      .fur-14 {
        left: 46%;
        width: 2%;
        background: linear-gradient(to bottom, $base-color 36%, transparent 100%);
      }
      .fur-15 {
        left: 48%;
        width: 5.5%;
        background: linear-gradient(to bottom, $base-color 29%, transparent 100%);
      }
      .fur-16 {
        left: 53.5%;
        width: 3%;
        background: linear-gradient(to bottom, $base-color 39%, transparent 95%);
      }
      .fur-17 {
        left: 56.5%;
        width: 4.1%;
        background: linear-gradient(to bottom, $base-color 45%, transparent 100%);
      }
      .fur-18 {
        left: 60.6%;
        width: 2.4%;
        background: linear-gradient(to bottom, $base-color 34%, transparent 100%);
      }
      .fur-19 {
        left: 63%;
        width: 4%;
        background: linear-gradient(to bottom, $base-color 47%, transparent 100%);
      }
      .fur-20 {
        left: 67%;
        width: 1.5%;
        background: linear-gradient(to bottom, $base-color 27%, transparent 95%);
      }
      .fur-21 {
        left: 68.5%;
        width: 2.8%;
        background: linear-gradient(to bottom, $base-color 37%, transparent 100%);
      }
      .fur-22 {
        left: 71.3%;
        width: 2.3%;
        background: linear-gradient(to bottom, $base-color 9%, transparent 100%);
      }
      .fur-23 {
        left: 73.6%;
        width: 2.2%;
        background: linear-gradient(to bottom, $base-color 28%, transparent 92%);
      }
      .fur-24 {
        left: 75.8%;
        width: 1%;
        background: linear-gradient(to bottom, $base-color 37%, transparent 100%);
      }
      .fur-25 {
        left: 76.8%;
        width: 2.1%;
        background: linear-gradient(to bottom, $base-color 28%, transparent 100%);
      }
      .fur-26 {
        left: 78.9%;
        width: 4.1%;
        background: linear-gradient(to bottom, $base-color 34%, transparent 100%);
      }
      .fur-27 {
        left: 83%;
        width: 2.5%;
        background: linear-gradient(to bottom, $base-color 21%, transparent 100%);
      }
      .fur-28 {
        left: 85.5%;
        width: 4.5%;
        background: linear-gradient(to bottom, $base-color 39%, transparent 100%);
      }
      .fur-29 {
        left: 90%;
        width: 2.8%;
        background: linear-gradient(to bottom, $base-color 30%, transparent 100%);
      }
      .fur-30 {
        left: 92.8%;
        width: 3.5%;
        background: linear-gradient(to bottom, $base-color 19%, transparent 100%);
      }
      .fur-31 {
        left: 96.3%;
        width: 3.7%;
        background: linear-gradient(to bottom, $base-color 37%, transparent 100%);
      }
    }

    .effect-lumieres {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: showing-lumieres 2s 1.6s forwards;

      [class*='lamp-'] {
        position: absolute;
        height: 100%;
        box-shadow: 0 0 10px 0 rgba($base-color, 0.75);
        background: var(--color);

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--color);
          box-shadow: 0 0 10px 0 rgba($base-color, 0.75);
        }
      }

      .lamp-1 {
        --color: #ff0100;
        left: 0.7%;
        width: 1%;
      }
      .lamp-2 {
        --color: #ffde01;
        left: 2.2%;
        width: 1.4%;
      }
      .lamp-3 {
        --color: #ff00cc;
        left: 5.8%;
        width: 2.1%;
      }
      .lamp-4 {
        --color: #04fd8f;
        left: 10.1%;
        width: 2%;
      }
      .lamp-5 {
        --color: #ff0100;
        left: 12.9%;
        width: 1.4%;
      }
      .lamp-6 {
        --color: #ff9600;
        left: 15.3%;
        width: 2.8%;
      }
      .lamp-7 {
        --color: #0084ff;
        left: 21.2%;
        width: 2.5%;
      }
      .lamp-8 {
        --color: #f84006;
        left: 25%;
        width: 2.5%;
      }
      .lamp-9 {
        --color: #ffc601;
        left: 30.5%;
        width: 3%;
      }
      .lamp-10 {
        --color: #ff4800;
        left: 36.3%;
        width: 3%;
      }
      .lamp-11 {
        --color: #fd0100;
        left: 41%;
        width: 2.2%;
      }
      .lamp-12 {
        --color: #01ffff;
        left: 44.2%;
        width: 2.6%;
      }
      .lamp-13 {
        --color: #ffc601;
        left: 51.7%;
        width: 0.5%;
      }
      .lamp-14 {
        --color: #ffc601;
        left: 52.1%;
        width: 1.8%;
      }
      .lamp-15 {
        --color: #0078fe;
        left: 53.8%;
        width: 2.3%;
      }
      .lamp-16 {
        --color: #0080ff;
        left: 57.2%;
        width: 2%;
      }
      .lamp-17 {
        --color: #ffae01;
        left: 62.3%;
        width: 2.9%;
      }
      .lamp-18 {
        --color: #ff00bf;
        left: 65.8%;
        width: 1.7%;
      }
      .lamp-19 {
        --color: #a601f4;
        left: 72.8%;
        width: 0.8%;
      }
      .lamp-20 {
        --color: #f30b34;
        left: 74.3%;
        width: 2%;
      }
      .lamp-21 {
        --color: #ff00bf;
        left: 79.8%;
        width: 2%;
      }
      .lamp-22 {
        --color: #04fd8f;
        left: 78.2%;
        width: 2%;
      }
      .lamp-23 {
        --color: #01ffff;
        left: 78.5%;
        width: 2%;
      }
      .lamp-24 {
        --color: #a201ff;
        left: 85.3%;
        width: 1.1%;
      }
      .lamp-25 {
        --color: #ec0014;
        left: 86.9%;
        width: 1.1%;
      }
      .lamp-26 {
        --color: #0078fe;
        left: 88.8%;
        width: 2%;
      }
      .lamp-27 {
        --color: #ff0036;
        left: 92.4%;
        width: 2.4%;
      }
      .lamp-28 {
        --color: #06f98c;
        left: 96.2%;
        width: 2.1%;
      }

      .lamp-1,
      .lamp-3,
      .lamp-5,
      .lamp-7,
      .lamp-9,
      .lamp-11,
      .lamp-13,
      .lamp-15,
      .lamp-17,
      .lamp-19,
      .lamp-21,
      .lamp-23,
      .lamp-25,
      .lamp-27 {
        animation: lumieres-moving-left 5s forwards;
        &::before {
          animation: lumieres-moving-left 5.5s;
        }
      }

      .lamp-2,
      .lamp-4,
      .lamp-6,
      .lamp-8,
      .lamp-10,
      .lamp-12,
      .lamp-14,
      .lamp-16,
      .lamp-18,
      .lamp-20,
      .lamp-22,
      .lamp-24,
      .lamp-26,
      .lamp-28 {
        animation: lumieres-moving-right 5s forwards;
        &::before {
          animation: lumieres-moving-right 5.5s;
        }
      }
    }
  }
}

/* ==============================
   ANIMATIONS
============================== */
@keyframes brush-moving {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
@keyframes fading-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes lumieres-moving-right {
  0% {
    transform: translate(0);
  }
  40% {
    transform: translate(-10px) scaleX(1);
  }
  50% {
    transform: translate(-60px);
  }
  100% {
    transform: translate(-120px) scaleX(3);
  }
}
@keyframes lumieres-moving-left {
  0% {
    transform: translate(0);
  }
  40% {
    transform: translate(10px) scaleX(1);
  }
  50% {
    transform: translate(60px);
  }
  100% {
    transform: translate(120px) scaleX(3);
  }
}
@keyframes zoom-in {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(15);
  }
}
@keyframes showing-lumieres {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fading-lumieres-box {
  0% {
    background-color: rgba($base-color, 0.5);
  }
  100% {
    background-color: rgba($base-color, 0);
  }
}

/* ==============================
   YOUR APP STYLES & PAGE TRANSITION
============================== */
.page-wrapper {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-top: 70px;
  overflow: hidden;
}

.wave-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  filter: blur(2px);
}
.wave-enter-active {
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.wave-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
.wave-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
.wave-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}
.wave-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  filter: blur(2px);
}
</style>
