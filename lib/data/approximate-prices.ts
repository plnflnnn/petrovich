export type CalculatorPriceId = "roof" | "insulation" | "facade";

export const APPROXIMATE_UNIT_PRICE_RUB: Record<
  CalculatorPriceId,
  { fromRubPerM2: number }
> = {
  /** Roofing — indicative price per m² */
  roof: { fromRubPerM2: 890 },
  /** Insulation — indicative price per m² */
  insulation: { fromRubPerM2: 340 },
  /** Facade — indicative price per m² */
  facade: { fromRubPerM2: 1250 },
};
