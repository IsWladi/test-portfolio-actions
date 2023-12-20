//Component for the stack section of the portfolio page
class stackComponent extends HTMLElement {
  constructor() {
    super();
    this.name = "";
    this.desc = "";
    this.stars_full = "";
    this.stars_half = "";
  }
  connectedCallback() {
    this.name = this.getAttribute("name");
    this.desc = this.getAttribute("desc");
    this.stars_full = this.getAttribute("stars_full");
    this.stars_half = this.getAttribute("stars_half");
    this.render();
    this.querySelector(".stack-img").addEventListener("click", () => {
      this.emitInfo();
    });
  }

  style() {
    return `
.stack-img {
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}
.stack-img:hover {
  transform: scale(1.3);
  transition: all 0.3s ease-in-out;
}

.stars-container {
  opacity: 0;
}
.stars-container img {
  color: gold;
}

.star {
  width: 0.5rem;
}

.image-container {
    position: relative;
    width: 5rem;
  }
.image-container:hover .stars-container {
  opacity: 1;
}

    `;
  }

  emitInfo() {
    let event = new CustomEvent("stackEvent", {
      detail: {
        name: this.name,
        desc: this.desc,
      },
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
  render() {
    let full = this.stars_full.length;
    let stars = "";
    let half_star = "";
    // Capitalize the first letter of the name and description
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.desc = this.desc.charAt(0).toUpperCase() + this.desc.slice(1);
    for (let i = 0; i < full; i++) {
      stars += `
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
      `;
    }

    if (this.stars_half === "1") {
      half_star = `
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
          <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
          </svg>
      `;
    }
    stars += half_star;
    this.innerHTML = `
            <style>
              ${this.style()}
            </style>
            <div class="image-container">
            <img loading="lazy" class="stack-img img-fluid" src="./images/stack/${this.name.toLowerCase()}.svg" alt="Image about the technology ${
      this.name
    }"></img>
            <div class="stars-container">
                ${stars}
            </div>
            </div>
    `;
  }
}

customElements.define("stack-component", stackComponent);
