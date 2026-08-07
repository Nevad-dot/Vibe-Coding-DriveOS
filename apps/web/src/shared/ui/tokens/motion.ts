export const motion = {
  transition: {
    hover: { duration: 0.15, ease: "easeOut" },
    tab: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    modal: { type: "spring", stiffness: 300, damping: 30 },
  },
} as const;
