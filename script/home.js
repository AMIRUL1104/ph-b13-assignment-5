const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let isseus_conteiner = document.getElementById("isseus-conteiner");
let count_box = document.getElementById("count-box");

const fetchAllIssues = (status) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      count_box.innerHTML = "";
      isseus_conteiner.innerHTML = "";
      let datas = data.data;

      if (status !== "all") {
        let issues = datas.filter((item) => {
          return item.status == status;
        });
        displayIssues(issues);
      } else {
        displayIssues(data.data);
      }
    });
};

const displayIssues = (data) => {
  count_box.innerHTML = `

        <div class="flex items-center gap-3">
          <div class="w-8">
            <img src="./assets/Aperture.png" alt="image" />
          </div>
          <div class="space-y-1">
            <h3 class="text-xl color-primary font-semibold">${data.length} Issues</h3>
            <p class="color-secndery">Track and manage your project issues</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <p>
            <span
              class="w-2.5 h-2.5 rounded-full inline-block bg-[#00A96E]"
            ></span>
            <span class="color-primary">Open</span>
          </p>
          <p>
            <span
              class="w-2.5 h-2.5 rounded-full inline-block bg-[#A855F7]"
            ></span>
            <span>Closeed</span>
          </p>
        </div>
    
    `;

  data.forEach((issue) => {
    let card = document.createElement("div");
    card.id = issue.id;
    card.classList.add(
      "row-span-1",
      "col-span-1",
      "shadow-md",
      "border-to-green",
      "p-4",
      "rounded-md",
      "space-y-2",
    );

    // {
    //     "id": 1,
    //     "title": "Fix navigation menu on mobile devices",
    //     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    //     "status": "open",
    //     "labels": [
    //         "bug",
    //         "help wanted"
    //     ],
    //     "priority": "high",
    //     "author": "john_doe",
    //     "assignee": "jane_smith",
    //     "createdAt": "2024-01-15T10:30:00Z",
    //     "updatedAt": "2024-01-15T10:30:00Z"
    // }
    card.innerHTML = `

            <div class="flex items-center justify-between">
              <div class="w-6">
                <img src="./assets/Open-Status.png" alt="open status image" />
              </div>
              <span
                class="uppercase py-px text-red-500 px-4 border border-red-300 shadow-sm bg-[#FEECEC] rounded-xl text-xs font-medium"
                >${issue.priority}</span
              >
            </div>
            <h3 class="font-semibold text-[14px] capitalize">
              ${issue.title}
            </h3>
            <p class="text-[12px] color-secndery">
              ${issue.description}
            </p>

            <div>
              <span
                class="uppercase py-px text-red-500 px-4 border border-red-300 shadow-sm bg-[#FEECEC] rounded-xl text-xs font-medium"
                >bug</span
              >
              <span
                class="uppercase py-px text-yellow-500 px-4 border border-yellow-300 shadow-sm bg-[#fefeec] rounded-xl text-xs font-medium"
                >help wanted</span
              >
            </div>
            <!-- <hr class="w-full h-[0.5px] bg-slate-600" /> -->
            <div class="border-t-[0.2px] border-t-[#64748B] py-3 space-y-2">
              <p class="text-xs color-secndery">${issue.author}</p>
              <p class="text-xs color-secndery">${issue.createdAt}</p>
            </div>

        `;

    isseus_conteiner.appendChild(card);
  });
};

fetchAllIssues("all");

function handleTab(status) {
  fetchAllIssues(status);
}
