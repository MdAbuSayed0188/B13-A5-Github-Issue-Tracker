const cardContainar = document.getElementById("card-containar");

const loading = document.getElementById("loading");
let isLoading = true;

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const fetchcards = (selectedValue = "all") => {
  loading.style.display = "flex";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let cards = data.data;

      if (selectedValue !== "all") {
        cards = cards.filter((card) => card.status === selectedValue);
      }

      displayCards(cards);
      issueTotal.innerText = `${cards.length} Issues`;
      loading.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      loading.style.display = "none";
    });
};

fetchcards("all");
