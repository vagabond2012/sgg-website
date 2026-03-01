const events = [
  {
    title: "LLM Ask Me Anything",
    date: "January 31, 2026",
    location: "Dublin, CA",
    image: "assets/events/01312026LLMtalk.jpg",
    tag: "Mentorship",
    tone: "orange",
    blurb: "AMA style casual chat on anything and everything LLM related.",
  },
  {
    title: "Coffee Chat w Hiten",
    date: "December 7, 2025",
    location: "Edison, NJ",
    image: "assets/events/sgg11082.jpg",
    tag: "Networking",
    tone: "teal",
    blurb: "Creative applications of AI/ML in facial sentiment technology.",
  },
  {
    title: "Top Golf Meetup",
    date: "December 27, 2025",
    location: "Bay Area, CA",
    image: "assets/events/PHOTO-2025-12-27-15-23-35.jpg",
    tag: "Community",
    tone: "blue",
    blurb: "Let the swing do the talking. TopGolf with the SGG crew.",
  },
];

const eventGrid = document.getElementById("eventGrid");

if (eventGrid) {
  let activeIndex = 0;

  const classForCard = (idx) => {
    const rel = (idx - activeIndex + events.length) % events.length;
    if (rel === 0) return "is-front";
    if (rel === 1) return "is-mid";
    return "is-back";
  };

  const renderMeetups = () => {
    eventGrid.innerHTML = `
      <div class="meetup-stack">
        ${events
          .map(
            (event, idx) => `
            <button
              class="stack-card ${classForCard(idx)}"
              data-index="${idx}"
              type="button"
              aria-label="Open event: ${event.title}"
            >
              <img src="${event.image}" alt="${event.title}" loading="lazy" />
              <div class="stack-overlay">
                <span class="pill ${event.tone}">${event.tag}</span>
                <h3>${event.title}</h3>
                <p class="mini">${event.date} | ${event.location}</p>
                <p>${event.blurb}</p>
              </div>
            </button>
          `,
          )
          .join("")}
              <div class="stack-controls">
          <button id="meetupPrev" class="stack-nav stack-nav-prev" type="button" aria-label="Previous event">&lt;</button>
          <button id="meetupNext" class="stack-nav stack-nav-next" type="button" aria-label="Next event">&gt;</button>
        </div>
      </div>

      <div class="stack-thumbs" role="tablist" aria-label="Recent meetup images">
        ${events
          .map(
            (event, idx) => `
            <button
              class="stack-thumb ${idx === activeIndex ? "is-active" : ""}"
              data-index="${idx}"
              type="button"
              role="tab"
              aria-selected="${idx === activeIndex ? "true" : "false"}"
            >
              <img src="${event.image}" alt="${event.title}" loading="lazy" />
              <span>${event.title}</span>
            </button>
          `,
          )
          .join("")}
      </div>
    `;

    eventGrid.querySelectorAll(".stack-card, .stack-thumb").forEach((item) => {
      item.addEventListener("click", () => {
        activeIndex = Number(item.dataset.index);
        renderMeetups();
      });
    });

    const prevBtn = document.getElementById("meetupPrev");
    const nextBtn = document.getElementById("meetupNext");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + events.length) % events.length;
        renderMeetups();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % events.length;
        renderMeetups();
      });
    }
  };

  renderMeetups();
}

const joinForm = document.getElementById("joinForm");
const note = document.getElementById("formNote");

if (joinForm && note) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(joinForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const village = formData.get("village");
    const city = formData.get("city");
    const support = formData.get("support");
    const message = formData.get("message") || "Not provided";

    const subject = encodeURIComponent(`New SGG membership request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nVillage: ${village}\nCurrent City: ${city}\nSupport Needed: ${support}\n\nMessage:\n${message}`,
    );

    note.textContent = "Thanks. Opening your email app to send this to SGG.";
    window.location.href = `mailto:hello@southgujaratgroup.org?subject=${subject}&body=${body}`;
  });
}
