import type { MbtiSide } from "../../data/mbti/questions";

export interface MbtiDimension {
  key: "EI" | "SN" | "TF" | "JP";
  label: string;
  left: MbtiSide;
  right: MbtiSide;
}

export type MbtiScores = Record<MbtiSide, number>;

export interface MbtiResult {
  type: string;
  scores: MbtiScores;
}

export const dimensionPairs: MbtiDimension[] = [
  { key: "EI", label: "能量来源", left: "E", right: "I" },
  { key: "SN", label: "信息获取", left: "S", right: "N" },
  { key: "TF", label: "决策方式", left: "T", right: "F" },
  { key: "JP", label: "生活结构", left: "J", right: "P" },
];

export function calcScores(answers: MbtiSide[]): MbtiScores {
  const score: MbtiScores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  for (const side of answers) {
    score[side] += 1;
  }

  return score;
}

export function calcMbtiResult(answers: MbtiSide[]): MbtiResult {
  const score = calcScores(answers);
  const result =
    (score.E > score.I ? "E" : "I") +
    (score.S > score.N ? "S" : "N") +
    (score.T > score.F ? "T" : "F") +
    (score.J > score.P ? "J" : "P");

  return {
    type: result.toLowerCase(),
    scores: score,
  };
}

export function calcMbti(answers: MbtiSide[]): string {
  return calcMbtiResult(answers).type;
}
