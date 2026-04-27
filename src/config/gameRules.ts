import { useI18n } from 'vue-i18n'

// ✅ This is now reactive to language changes
export const useGameRules = () => {
  const { t } = useI18n()

  return {
    modes: {
      classic: {
        icon: '🎬',
        name: t('rules.classic.title'),
        description: t('rules.classic.desc'),
        rules: [
          t('rules.classic.point1'),
          t('rules.classic.point2'),
          t('rules.classic.point3'),
          t('rules.classic.point4'),
        ],
      },
      beatTheClock: {
        icon: '⏱️',
        name: t('rules.beatClock.title'),
        description: t('rules.beatClock.desc'),
        difficulties: {
          easy: 5,
          medium: 10,
          hard: 15,
          master: 20,
        },
        timeLimit: 5,
        jokerTimeAdd: 15,
        jokerPauseSec: 10,
      },
      longestStreak: {
        icon: '🔥',
        name: t('rules.streak.title'),
        description: t('rules.streak.desc'),
        difficulties: {
          easy: 5,
          medium: t('rules.streak.lines.medium'),
          hard: t('rules.streak.lines.hard'),
          master: t('rules.streak.lines.master'),
        },
      },
      investigation: {
        icon: '🔍',
        name: t('rules.investigation.title'),
        description: t('rules.investigation.desc'),
        mechanics: [t('rules.investigation.mech1'), t('rules.investigation.mech2')],
        difficulties: {
          easy: 3,
          medium: 5,
          hard: 7,
          master: 10,
        },
        note: t('rules.investigation.note'),
      },
    },

    jokers: {
      beatTheClock: [
        { label: t('rules.jokers.btcSkip') },
        { label: t('rules.jokers.btcPause') },
        { label: t('rules.jokers.btcAdd') },
        { label: t('rules.jokers.btcReveal') },
      ],
      longestStreak: [
        { label: t('rules.jokers.str1') },
        { label: t('rules.jokers.str2') },
        { label: t('rules.jokers.str3') },
      ],
      investigation: [
        { label: t('rules.jokers.inv1') },
        { label: t('rules.jokers.inv2') },
        { label: t('rules.jokers.inv3') },
      ],
    },

    globalStats: [
      t('rules.stats.s1'),
      t('rules.stats.s2'),
      t('rules.stats.s3'),
      t('rules.stats.s4'),
    ],

    accessibility: [
      t('rules.accessibility.a1'),
      t('rules.accessibility.a2'),
      t('rules.accessibility.a3'),
      t('rules.accessibility.a4'),
      t('rules.accessibility.a5'),
    ],
  } as const
}
