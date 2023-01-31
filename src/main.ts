import './style.css'

function getTeamContainer(): HTMLElement {
    const teamContainer = document.getElementById("form-team-container");
    if (!teamContainer) {
        throw new Error("Unable to find the team container in the DOM.");
    }

    return teamContainer;
}

function getTemplate(name: string): Node {
    const template = document.getElementById(name);
    if (!template) {
        throw new Error(`Unable to find the template ${name} in the DOM.`);
    }

    const element = template.cloneNode(true);
    element.removeAttribute("id");
    element.removeAttribute("style");
    return element;
}

function addNbTeams(nb: number): void {
    const teamContainer = getTeamContainer();
    const inputTeamTemplate = getTemplate("template-input-team-name");
    for (let i = 0; i < nb; i++) {
        const temp = inputTeamTemplate.cloneNode(true);
        teamContainer.appendChild(temp);
    }

}

function hideNbTeams(nb: number): void {
    const teamContainer = getTeamContainer();

    for (let i = 0; i < nb; i++) {
        const lastChild = teamContainer.lastElementChild;
        teamContainer.removeChild(lastChild);
    }
}

function updateTeamListDisplay(wantedTeamNumber: number): void {

    const teamContainer = getTeamContainer();
    const currentTeamNumber = teamContainer.hasChildNodes() && teamContainer.childNodes.length || 0;

    if (currentTeamNumber > wantedTeamNumber) {
        hideNbTeams(currentTeamNumber - wantedTeamNumber);
    }

    if (wantedTeamNumber > currentTeamNumber) {
        addNbTeams(wantedTeamNumber - currentTeamNumber);
    }
}

function nubmerOfTeamChanges(event: Event): void {
    const numberOfTeams = event.target.valueAsNumber || Number(event.target.value);
    updateTeamListDisplay(numberOfTeams);
}

function addEvents(): void {
    const numberOfTeam = document.getElementById("form-team-number");
    console.log("[addEvents()] numberOfTeam: ", numberOfTeam);
    numberOfTeam && numberOfTeam.addEventListener("input", nubmerOfTeamChanges);
}

function init(): void {
    addEvents();
}

init();
