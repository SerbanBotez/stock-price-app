export const getChartColor = (index: number): string => {
  const chartColors = [
    getComputedStyle(document.body).getPropertyValue("--color-blue"),
    getComputedStyle(document.body).getPropertyValue("--color-coral"),
    getComputedStyle(document.body).getPropertyValue("--color-red"),
    getComputedStyle(document.body).getPropertyValue("--color-green"),
    getComputedStyle(document.body).getPropertyValue("--color-teal"),
  ];

  const colorCount = chartColors.length;

  return chartColors[index % colorCount];
};
