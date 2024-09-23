const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

let USD = 0,
  EUR = 0,
  GBP = 0;

const apiURL =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL";

async function getPriceCurrency(apiURL, currency) {
  const response = await fetch(apiURL);

  const data = await response.json();

  console.log(data);

  switch (currency) {
    case "USD":
      return data.USDBRL.bid;
    case "EUR":
      return data.EURBRL.bid;
    case "GBP":
      return data.GBPBRL.bid;
    default:
      return 0;
  }
}

async function main() {
  USD = await getPriceCurrency(apiURL, "USD");
  EUR = await getPriceCurrency(apiURL, "EUR");
  GBP = await getPriceCurrency(apiURL, "GBP");
}

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = async (e) => {
  e.preventDefault();
  await main();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
    default:
      break;
  }
};
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    let total = amount * price;

    result.textContent = formatCurrencyBRL(total);

    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");
    console.log(error);
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
