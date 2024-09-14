const fetchData = async () => {
  try {
    const response = await fetch("/api/tickers");
    const tickers = await response.json();
    return tickers;
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const tickers = await fetchData();
  const tableBody = document.getElementById("ticker-table");
  tickers.forEach((ticker, index) => {
    const row = document.createElement("tr");
    const difference = (
      ((ticker.sell - ticker.buy) / ticker.buy) *
      100
    ).toFixed(2);
    const savings = (ticker.sell - ticker.buy).toFixed(2);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${ticker.name}</td>
      <td>₹ ${ticker.last}</td>
      <td>₹ ${ticker.buy}</td>
      <td>₹ ${ticker.sell}</td>
      <td>${difference} %</td>
      <td>₹ ${savings}</td>
    `;

    tableBody.appendChild(row);
  });
});
