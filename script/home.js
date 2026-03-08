const labelsShower = (arr) => {
  const elements = arr.map((el) => {
    if (el.trim().toLowerCase() === "bug") {
      return `<span
               class=" inline-flex flex-row items-center gap-1 uppercase text-red-500 bg-[#FEECEC] border-red-300 px-1 mx-1 border shadow-sm rounded-xl text-[10px] font-medium"
               ><img src="./assets/Vector.png" alt="open status image" /> ${el}
          </span>`;
    } else if (el.trim().toLowerCase() === "help wanted") {
      return `<span
               class="inline-flex flex-row items-center gap-1 uppercase text-yellow-500 bg-[#fefeec] border-yellow-300 px-1 mx-1 border shadow-sm rounded-xl text-[10px] font-medium"
               > <img src="./assets/Vector (1).png" alt="open status image" />${el}
        </span>`;
    } else {
      return `<span
               class=" inline-flex flex-row items-center gap-1 uppercase text-green-500 bg-[#ecfeef] border-green-300 px-1 mx-1 border shadow-sm rounded-xl text-[10px] font-medium"
               ><img src="./assets/Vector (2).png" alt="open status image" />${el}
        </span>`;
    }
  });

  return elements.join(" ");
};
const priorityShower = (el) => {
  if (el.trim().toLowerCase() === "high") {
    return `<span
               class="uppercase text-red-500 bg-[#FEECEC] border-red-300 px-2 mx-1 border shadow-sm rounded-xl text-[12px] font-medium"
               >${el}
          </span>`;
  } else if (el.trim().toLowerCase() === "medium") {
    return `<span
               class="uppercase text-yellow-500 bg-[#fefeec] border-yellow-300 px-2 mx-1 border shadow-sm rounded-xl text-[12px] font-medium"
               >${el}
        </span>`;
  } else {
    return `<span
               class="uppercase text-slate-500 bg-[#d6d6d6] border-slate-300 px-2 mx-1 border shadow-sm rounded-xl text-[12px] font-medium"
               >${el}
        </span>`;
  }
};
const statusImgDisplayer = (el) => {
  if (el.trim().toLowerCase() === "open") {
    return `  <img src="./assets/Open-Status.png" alt="open status image" />`;
  } else {
    return `  <img src="./assets/Closed-Status.png" alt="closed status image" />`;
  }
};

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const isseus_conteiner = document.getElementById("isseus-conteiner");
const count_box = document.getElementById("count-box");
const main_issue_box = document.getElementById("main-issue-box");
const spinner = document.getElementById("spinner");

const status_tab = document.getElementsByClassName("status-tab");

const fetchAllIssues = (status) => {
  // active  loading spinner
  spinner.classList.remove("hidden");
  main_issue_box.classList.add("hidden");

  // selected tab background color shower
  const selectedTab = document.getElementById(status);
  for (let tab of status_tab) {
    tab.classList.remove("bg-color-active");
  }
  selectedTab.classList.add("bg-color-active");
  // fetch all data
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // clear recent data from html
      count_box.innerHTML = "";
      isseus_conteiner.innerHTML = "";

      // call displayIssues function to show matched data with seelected tab or search value
      let datas = data.data;
      if (status === "all") {
        displayIssues(datas);
      } else {
        let issues = datas.filter((item) => {
          return item.status === status;
        });
        displayIssues(issues);
      }
    });
};

// this function show the data in UI
const displayIssues = (data) => {
  // display the number of matched issue
  count_box.innerHTML = `

        <div class="flex items-center gap-3">
          <div class="w-8">
            <img src="./assets/Aperture.png" alt="image" />
          </div>
          <div class="space-y-1">
            <h3 class="text-xl color-primary font-semibold max-sm:text-lg">${data.length} Issues</h3>
            <p class="color-secndery max-sm:hidden">Track and manage your project issues</p>
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

  // display matched issues
  data.forEach((issue) => {
    let card = document.createElement("div");
    card.id = issue.id;
    card.onclick = handleDetails;
    card.classList.add(
      "row-span-1",
      "col-span-1",
      "shadow-md",
      "p-4",
      "rounded-md",
      "space-y-2",
    );

    issue.status === "open"
      ? `${card.classList.add("border-to-green")}`
      : `${card.classList.add("border-to-purple")}`;

    card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="w-6">
              ${statusImgDisplayer(issue.status)}
               
              </div>
              ${priorityShower(issue.priority)}
            </div>

            <h3 class="font-semibold text-[14px] capitalize">
              ${issue.title}
            </h3>

            <p class="text-[12px] color-secndery">
              ${issue.description}
            </p>

            <div class=" fle flex-wrap gap-3  ">
             ${labelsShower(issue.labels)}
            </div>
        
            <div class="border-t-[0.2px] border-t-[#64748B] py-3 space-y-2">
              <p class="text-xs color-secndery">${issue.author}</p>
              <p class="text-xs color-secndery">${issue.createdAt}</p>
            </div>
        `;

    isseus_conteiner.appendChild(card);

    // remove spinner
    main_issue_box.classList.remove("hidden");
    spinner.classList.add("hidden");
  });
};

// call fatch function for first render
fetchAllIssues("all");

function handleTab(status) {
  fetchAllIssues(status);
}

const handleDetails = (e) => {
  const id = e.currentTarget.id;

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  my_modal_1.showModal();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      modalDetails(data.data);
    });
};

const modalDetails = (data) => {
  const my_modal_1 = document.getElementById("my_modal_1");
  my_modal_1.innerHTML = "";

  my_modal_1.innerHTML = `
           <div class="modal-box space-y-5">
        <div>
          <h3 class="text-2xl max-sm:text-base color-primary font-bold">${data.title} </h3>

          <div class="flex items-center max-sm:flex-wrap gap-2">
            <span
              class="bg-green-700 text-white px-2 py-1 text-xs capitalize rounded-xl"
              >${data.status}</span
            >
            <span
              class="w-1.5 h-1.5 rounded-full inline-block bg-[#64748B]"
            ></span>

            <span class="px-2 py-1 text-xs text-[#64748B]">
              opened by ${data.author}
            </span>

            <span
              class="w-1.5 h-1.5 rounded-full inline-block bg-[#64748B]"
            ></span>

            <span class="px-2 py-1 text-xs text-[#64748B]"> ${data.createdAt} </span>
          </div>
        </div>

        <div>
          ${labelsShower(data.labels)}
          
        </div>

        <p class="text-base color-secndery">
          ${data.description}
        </p>

        <div class="flex items-center justify-start gap-10 sm:gap-30 bg-slate-100 p-4">
          <div class="flex items-start justify-between flex-col">
            <p class="text-base color-secndery">Assignee:</p>
            <p class="text-base color-primary font-semibold">${data.assignee}</p>
          </div>
          <div class="flex items-start justify-between flex-col">
            <p class="text-base color-secndery">Priority</p>
            ${priorityShower(data.priority)}
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
           
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
      `;
};

let debounceTimer;
const search = document.getElementById("search");

search.addEventListener("input", function (e) {
  const value = e.target.value;
  const cleanValue = value.trim().toLowerCase();
  if (!cleanValue) return;
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${cleanValue}`;

    // active loading spinner
    spinner.classList.remove("hidden");
    main_issue_box.classList.add("hidden");

    count_box.innerHTML = "";
    isseus_conteiner.innerHTML = "";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let datas = data.data;

        displayIssues(datas);
      });
  }, 500);
});
