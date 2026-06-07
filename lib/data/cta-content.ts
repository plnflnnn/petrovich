export const ctaBandContent = {
  title: "Готовы обсудить поставку?",
  body: "Оставьте заявку — перезвоним, ответим на вопросы и поможем с ориентиром по доставке.",
  formButton: "Заполнить форму",
  bullets: [
    "Более 13 лет опыта в доставке строительных и отделочных материалов",
    "Работаем с частными и коммерческими заказами",
    "Доставка под заказ и по договорённости — прозрачные расчёты",
  ],
};

export const CTA_POPUP_STORAGE_KEY = "cta-popup-dismissed";

/** Production: 3 minutes. For local testing, temporarily set to e.g. 3000 (3 s). */
export const CTA_POPUP_DELAY_MS =
  process.env.NODE_ENV === "production" ? 3 * 60 * 1000 : 3 * 60 * 1000;