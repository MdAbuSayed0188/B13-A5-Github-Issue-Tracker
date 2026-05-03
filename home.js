const cardContainar = document.getElementById("card-containar");
const issueTotal = document.getElementById("issue-total");
const searchBtn = document.getElementById("searchBtn");
const noCards = document.getElementById("noCards");

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

const displayCards = (cards) => {
  cardContainar.innerHTML = "";
  noCards.style.display = "none";

  if (cards.length === 0) {
    noCards.style.display = "flex";
  }

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <div onclick="document.getElementById('${card.id}').showModal()" class="bg-white drop-shadow-lg p-5 rounded-xl border-t-3 h-full ${
          card.status === "open" ? "border-[#28A745]" : "border-[#A855F7]"
        }">
          <div class="flex justify-between">
            <img src=${card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed.png"} alt="" />
            <button class="btn bg-[#FEECEC] rounded-xl text-red-500 uppercase">
              ${card.priority}
            </button>
          </div>
          <div>
            <h3 class="font-semibold text-[24px]">
              ${card.title}
            </h3>
            <p class="text-gray-600">
              ${card.description}
            </p>
            <div class="flex gap-2 mt-2 uppercase ">
              <div class="bg-[#FEECEC]   flex items-center justify-center rounded-xl drop-shadow-lg gap-1">
                <img src="./assets/BugDroid.png" alt="" />
                <p>${card.labels[0] || ""}</p>
              </div>
              <div class="bg-[#FFF8DB] flex items-center justify-center rounded-xl drop-shadow-lg gap-1">
                <img src="./assets/Vector.png" alt="" />
                <p>${card.labels[1] || ""}</p>
              </div>
            </div>
            <div class="text-gray-600 w-full mt-3">
              <hr />
            </div>
            <div class="flex gap-2 mt-3 text-gray-600">
              <p>
                #${card.id} by ${card.author} <br />
                <span>${card.updatedAt}</span>
              </p>
            </div>
          </div>
        </div>

    <!-- Open the modal using ID.showModal() method -->
    <dialog id="${card.id}" class="modal ">
      <div class="modal-box p-5">
      <div>
        <h2 class="text-2xl font-bold">${card.title}</h2>

          <div class="flex gap-2 mt-2 ml-0 items-center justify-start uppercase">
              <button class="btn-primary rounded-xl px-2 bg-green-700 text-white ">
                ${card.status === "open" ? "Open" : "Closed"}
              </button>
              <p class="text-gray-600 text-lg">
                  . Opened by ${card.author}
                  <span class="text-gray-600 text-lg">. ${card.updatedAt}</span>
              </p>
          </div>

          <div class="flex gap-2 mt-2 uppercase">
            <div class="bg-[#FEECEC]   flex items-center justify-center rounded-xl drop-shadow-lg gap-1">
                <img src="./assets/BugDroid.png" alt="" />
                <p>${card.labels[0] || ""}</p>
            </div>
            <div class="bg-[#FFF8DB] flex items-center justify-center rounded-xl drop-shadow-lg gap-1">
                <img src="./assets/Vector.png" alt="" />
                <p>${card.labels[1] || ""}</p>
          </div>
          </div>
        
        <p class="text-gray-600 my-7">
              ${card.description}
            </p>
        <div class="text-gray-600 w-full flex bg-[#F8FAFC] p-3 rounded-xl gap-10">
          <div class="mr-30">
          <p>Assignee: </p>
          <p class="font-semibold text-[20px] uppercase text-black">${card.assignee || "Unassigned"}</p>
          </div>
          <div class="">
          <p class="">Priority: </p>
          <button class="btn bg-red-600 rounded-xl text-white uppercase">
              ${card.priority}
            </button>
          </div>
        </div>
      </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
        `;
    cardContainar.appendChild(cardElement);
  });
};



fetchcards("all");
