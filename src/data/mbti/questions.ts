export type MbtiSide = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface MbtiQuestion {
  id: number;
  dimension: "EI" | "SN" | "TF" | "JP";
  text: string;
  left: {
    label: string;
    side: MbtiSide;
  };
  right: {
    label: string;
    side: MbtiSide;
  };
}

export const questions: MbtiQuestion[] = [
  {
    id: 1,
    dimension: "EI",
    text: "一段忙碌之后，你更像是：",
    left: { label: "找人聊聊，越交流越有电", side: "E" },
    right: { label: "独处消化，安静一会儿才回血", side: "I" },
  },
  {
    id: 2,
    dimension: "SN",
    text: "接触一个新主题时，你更先注意：",
    left: { label: "事实、步骤、已经验证过的方法", side: "S" },
    right: { label: "模式、可能性、它未来能变成什么", side: "N" },
  },
  {
    id: 3,
    dimension: "TF",
    text: "做艰难决定时，你更看重：",
    left: { label: "规则是否一致，推理是否站得住", side: "T" },
    right: { label: "对人的影响，价值是否说得过去", side: "F" },
  },
  {
    id: 4,
    dimension: "JP",
    text: "面对一周安排，你更舒服的是：",
    left: { label: "先排好重点，知道每天大概做什么", side: "J" },
    right: { label: "保留空间，按当时状态灵活调整", side: "P" },
  },
  {
    id: 5,
    dimension: "EI",
    text: "进入陌生场合时，你通常会：",
    left: { label: "先开口破冰，边聊边熟悉环境", side: "E" },
    right: { label: "先观察氛围，确认安全感再加入", side: "I" },
  },
  {
    id: 6,
    dimension: "SN",
    text: "别人给你说明任务时，你更希望听到：",
    left: { label: "具体标准、时间节点和可操作细节", side: "S" },
    right: { label: "目标意图、整体方向和判断空间", side: "N" },
  },
  {
    id: 7,
    dimension: "TF",
    text: "朋友遇到麻烦来找你，你第一反应更像：",
    left: { label: "拆问题、找原因、给出可执行方案", side: "T" },
    right: { label: "先接住情绪，让对方感觉被理解", side: "F" },
  },
  {
    id: 8,
    dimension: "JP",
    text: "有截止日期的任务，你更常：",
    left: { label: "尽早拆解，提前把风险压下去", side: "J" },
    right: { label: "先收集灵感，临近时集中爆发", side: "P" },
  },
  {
    id: 9,
    dimension: "EI",
    text: "当你有一个新想法时，更自然的方式是：",
    left: { label: "马上找人讲出来，在反馈里成形", side: "E" },
    right: { label: "先自己琢磨清楚，再选择性分享", side: "I" },
  },
  {
    id: 10,
    dimension: "SN",
    text: "看一本教程或课程时，你更喜欢：",
    left: { label: "从例子、练习和具体操作开始", side: "S" },
    right: { label: "先理解框架、原理和抽象关系", side: "N" },
  },
  {
    id: 11,
    dimension: "TF",
    text: "评价一个方案好不好，你更常问：",
    left: { label: "它是否高效、准确、逻辑闭合", side: "T" },
    right: { label: "它是否体面、合适、照顾到关键的人", side: "F" },
  },
  {
    id: 12,
    dimension: "JP",
    text: "旅行前，你更倾向于：",
    left: { label: "订好路线和住宿，心里踏实", side: "J" },
    right: { label: "只定大方向，把惊喜留给路上", side: "P" },
  },
  {
    id: 13,
    dimension: "EI",
    text: "团队讨论中，你更容易：",
    left: { label: "一边说一边想，主动推动气氛", side: "E" },
    right: { label: "先听完整体，再给出整理后的观点", side: "I" },
  },
  {
    id: 14,
    dimension: "SN",
    text: "回忆一次经历时，你更先想起：",
    left: { label: "当时发生了什么、谁说了什么", side: "S" },
    right: { label: "这件事意味着什么、给了我什么启发", side: "N" },
  },
  {
    id: 15,
    dimension: "TF",
    text: "当必须指出问题时，你更在意：",
    left: { label: "把事实说清楚，避免模糊和误判", side: "T" },
    right: { label: "表达方式不要伤人，也给对方台阶", side: "F" },
  },
  {
    id: 16,
    dimension: "JP",
    text: "你的桌面、文件或待办通常更像：",
    left: { label: "分类清楚，需要时很快找到", side: "J" },
    right: { label: "看似随手放，但灵感和材料都在附近", side: "P" },
  },
  {
    id: 17,
    dimension: "EI",
    text: "一整天社交之后，你更可能：",
    left: { label: "还想续摊，状态被人群带起来", side: "E" },
    right: { label: "想回到自己的空间，把脑子放空", side: "I" },
  },
  {
    id: 18,
    dimension: "SN",
    text: "你更信任哪类判断依据：",
    left: { label: "可观察的证据、经验和稳定数据", side: "S" },
    right: { label: "趋势感、联想和还没成形的苗头", side: "N" },
  },
  {
    id: 19,
    dimension: "TF",
    text: "发生冲突时，你更希望先解决：",
    left: { label: "事实责任和解决路径", side: "T" },
    right: { label: "彼此感受和关系裂缝", side: "F" },
  },
  {
    id: 20,
    dimension: "JP",
    text: "遇到变化时，你的第一反应更像：",
    left: { label: "重新制定计划，让局面稳定下来", side: "J" },
    right: { label: "先看看变化带来什么新机会", side: "P" },
  },
  {
    id: 21,
    dimension: "EI",
    text: "你更喜欢的工作节奏是：",
    left: { label: "多沟通、多碰撞，能随时对齐", side: "E" },
    right: { label: "有安静时段，可以深度推进", side: "I" },
  },
  {
    id: 22,
    dimension: "SN",
    text: "面对一句很抽象的观点，你更想：",
    left: { label: "让它落到案例、数据或现实场景", side: "S" },
    right: { label: "继续延展它背后的模型和可能性", side: "N" },
  },
  {
    id: 23,
    dimension: "TF",
    text: "你更容易被哪种称赞打动：",
    left: { label: "你判断很准，处理得很专业", side: "T" },
    right: { label: "你很懂人，让大家都舒服了", side: "F" },
  },
  {
    id: 24,
    dimension: "JP",
    text: "面对多个选择时，你更倾向于：",
    left: { label: "尽快定下来，开始推进", side: "J" },
    right: { label: "再看看有没有更好的选项", side: "P" },
  },
  {
    id: 25,
    dimension: "EI",
    text: "如果要学习一个复杂技能，你更喜欢：",
    left: { label: "加入小组或社区，边互动边练", side: "E" },
    right: { label: "自己先钻进去，形成节奏后再交流", side: "I" },
  },
  {
    id: 26,
    dimension: "SN",
    text: "你更容易觉得哪种内容“有用”：",
    left: { label: "马上能应用、能解决眼前问题", side: "S" },
    right: { label: "打开视角、能解释一类现象", side: "N" },
  },
  {
    id: 27,
    dimension: "TF",
    text: "当规则和人情发生冲突，你更可能：",
    left: { label: "先守住原则，否则后面更乱", side: "T" },
    right: { label: "看具体处境，给人留出余地", side: "F" },
  },
  {
    id: 28,
    dimension: "JP",
    text: "你对“未完成事项”的感受更像：",
    left: { label: "挂在心上，想尽快关掉它", side: "J" },
    right: { label: "可以先放着，等信息更充分再处理", side: "P" },
  },
];
