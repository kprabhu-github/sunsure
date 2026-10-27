/** Motion tokens. One place for every duration/ease so the whole site moves with one voice. */
export const ease = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  pluck: 'elastic.out(1, 0.38)',
} as const;

export const dur = { fast: 0.18, base: 0.4, slow: 0.9, cinematic: 1.6 } as const;

export const hero = {
  slideSeconds: 8,
  introCurtain: 1.7,
  /** Pointer may move the cable's low point only within this band (0 = left, 1 = right). */
  centreRange: [0.36, 0.64] as const,
  /** Fraction of the sag removed when the hero has fully scrolled away. */
  tensionRelief: 0.75,
} as const;

export const bp = { desktop: 900 } as const;
