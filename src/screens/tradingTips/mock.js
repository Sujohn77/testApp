import moment from "moment";

const today = moment().format("DD-MM-YYYY");
export const data = [
  {
    title: "Understand Market Trends",
    date: today,
    description:
      "To navigate the complexities of financial markets successfully, it's imperative to understand and analyze market trends. This involves regularly studying price charts, identifying patterns, and staying informed about economic indicators. By gaining insights into the prevailing trends, traders can make more informed decisions, whether it involves entering a position, adjusting a strategy, or deciding when to exit a trade. A comprehensive understanding of market trends forms the foundation of a robust trading approach.",
  },
  {
    title: "Set Clear Goals and Risk Tolerance",
    description:
      " Establishing clear trading goals and defining your risk tolerance level is fundamental to maintaining a disciplined and focused approach. Your goals act as a roadmap, guiding your trading decisions and helping you stay committed to your long-term objectives. Simultaneously, understanding your risk tolerance is crucial to prevent emotional reactions to market fluctuations. This combination of clear goals and risk management forms the backbone of a resilient trading strategy, ensuring that you make decisions based on logic rather than emotions.",
    date: today,
  },
  {
    title: "Diversify Your Portfolio",
    description:
      "Diversification is a key principle in risk management. By spreading your investments across different asset classes, industries, or geographical regions, you can reduce the impact of a poor-performing individual investment on your overall portfolio. Diversifying your holdings helps to balance risk and reward, enhancing the stability of your investment strategy. A well-diversified portfolio is better positioned to weather market volatility and unexpected events, contributing to more consistent long-term returns.",
    date: moment(today).subtract(1, "days").format("DD-MM-YYYY"),
  },
  //   {title: "", description: "", date: today},
  //   {title: "", description: "", date: today},
  //   {title: "", description: "", date: today},
  //   {title: "", description: "", date: today},
];
