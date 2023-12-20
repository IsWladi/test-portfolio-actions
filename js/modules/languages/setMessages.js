import { getLanguage, getTranslations } from "./getMessages.js";
import { LANGUAGES } from "./messages.js";

async function getTranslationsAndLanguage() {
  // Get the translated messages
  const data = await getTranslations(getLanguage());

  function getMessages() {
    return data.messages;
  }

  function getSelectedLanguage() {
    return data.selectedLanguage;
  }

  // return an object that contains the functions we need to access
  return {
    getMessages,
    getSelectedLanguage,
  };
}

// Set all the messages in the DOM
function setStackMessages(stackMessages) {
  // Insert title and description
  document.getElementById("stack-title").innerHTML = stackMessages.message;
  document.getElementById("stack-desc").innerHTML = stackMessages.description;

  // Create components for each stack
  let stacks = "";
  // iterate over object
  for (const [key, value] of Object.entries(stackMessages)) {
    if (key == "description" || key == "message") {
      continue;
    }
    // create component

    const stack = `
      <stack-component name="${key}" desc="${value.desc}" stars_full="${value.stars_full}" stars_half="${value.stars_half}" ></stack-component>
  `;
    stacks += stack;
  }
  document.querySelector("#stack-columna .stack-icons-container").innerHTML =
    stacks;
}

function setProjectMessages(projectMessages) {
  // Insert all projects
  let projects = "";
  // iterate over object
  for (const [key, value] of Object.entries(projectMessages)) {
    // create component
    const name = key;
    const desc = value.description;
    const github = value.github;
    const tags = value.tags.join(",");
    const project = `
        <div class="col-12 col-md-6 col-lg-4 m-0 p-0">
          <project-component name="${name}" desc="${desc}" github="${github}" tags="${tags}"></project-component>
        </div>
    `;
    projects += project;
  }
  document.querySelector(".projects-container>div.row").innerHTML = projects;
}

function setGeneralMessages(generalMessages, selectedLanguage) {
  //title
  document.getElementById("title").innerHTML = generalMessages.page.title;
  // navbar
  const navbar = generalMessages.page.navbar;
  document.getElementById("about-me").innerHTML = navbar.about_me;
  document.getElementById("projects").innerHTML = navbar.projects;
  document.getElementById("contact").innerHTML = navbar.contact;
  // navbar language selector
  let languagesKeys = "";
  let languagesValues = "";
  let firstKey = "";
  let firstValue = "";
  for (const [key, value] of Object.entries(LANGUAGES)) {
    if (value == selectedLanguage) {
      firstKey = key;
      firstValue = value;
      continue;
    }
    languagesKeys += "," + key;
    languagesValues += "," + value;
  }
  languagesKeys = firstKey + languagesKeys;
  languagesValues = firstValue + languagesValues;
  document.getElementsByClassName("nav-item language-selector")[0].innerHTML = `
    <language-selector-component languagesKeys="${languagesKeys}" languagesValues="${languagesValues}"></language-selector-component>
   `;
  //presentation
  const presentation = generalMessages.about_me;
  document.getElementById("presentation").innerHTML = presentation.presentation;
  document.getElementById("litle-presentation").innerHTML =
    presentation.litle_presentation;
  // about me
  const aboutMe = generalMessages.about_me;
  document.getElementById("about-me-meet-me").innerHTML = aboutMe.meet_me;
  document.getElementById("about-me-big-presentation").innerHTML =
    aboutMe.big_presentation;
  // projects section
  document.querySelector(".project-message").innerHTML =
    generalMessages.page.projects.message;
  document.querySelector(".project-desc").innerHTML =
    generalMessages.page.projects.description;
  document.querySelector("button.more-projects-button>span.more-projects-text").innerHTML = generalMessages.page.projects.more_projects_button;
  // footer
  const footerMessage = generalMessages.page.footer.message;
  document.getElementsByClassName("footer-texto")[0].innerHTML = footerMessage;
}

export function setAllMessages() {
  let messagesPromise = getTranslationsAndLanguage();

  messagesPromise
    .then((messages) => {
      const translations = messages.getMessages();
      const selectedLanguage = messages.getSelectedLanguage();
      // set the messages to the DOM
      let generalMessages = {
        page: translations.page,
        about_me: translations.about_me,
      };
      setGeneralMessages(generalMessages, selectedLanguage);
      setStackMessages(translations.stack);
      setProjectMessages(translations.projects);
    })
    .catch((error) => {
      console.log("Error fetching messages:", error);
    });
}
