// src/config/gameModes.ts
import { useI18n } from 'vue-i18n'

export const useGameModes = () => {
  const { t } = useI18n()

  return {
    // GAME MODES
    modes: [
      { id: 'classic', label: t('rules.classic.title'), icon: '🎬' },
      { id: 'beat-the-clock', label: t('rules.beatClock.title'), icon: '⏱️' },
      { id: 'longest-streak', label: t('rules.streak.title'), icon: '🔥' },
      { id: 'investigation', label: t('rules.investigation.title'), icon: '🔍' },
    ],

    // DIFFICULTIES
    difficulties: [
      { id: 'easy', label: t('rules.beatClock.diffLabel.easy') },
      { id: 'medium', label: t('rules.beatClock.diffLabel.medium') },
      { id: 'hard', label: t('rules.beatClock.diffLabel.hard') },
      { id: 'master', label: t('rules.beatClock.diffLabel.master') },
    ],
  } as const
}
