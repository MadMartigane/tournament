import ExtJarallaxBag from "./jarallax/main";

class Toolnament {

    jarallax: ExtJarallaxBag;

    constructor () {
        console.log("Toolnament init.");

        console.log("Toolnament call jarallax init.");
        this.jarallax = new ExtJarallaxBag();
        this.jarallax.setSpeed(0.3);

        console.log("Toolnament binding events.");
        this.bindEvents();
    }

    getTeamContainer(): HTMLElement {
        const teamContainer = document.getElementById("form-team-container");
        if (!teamContainer) {
            throw new Error("Unable to find the team container in the DOM.");
        }

        return teamContainer;
    }

    getTemplate(name: string): Node {
        const template = document.getElementById(name);
        if (!template) {
            throw new Error(`Unable to find the template ${name} in the DOM.`);
        }

        const element = template.cloneNode(true);
        element.removeAttribute("id");
        element.removeAttribute("style");
        return element;
    }

    addNbTeams(nb: number): void {
        const teamContainer = this.getTeamContainer();
        const inputTeamTemplate = this.getTemplate("template-input-team-name");
        for (let i = 0; i < nb; i++) {
            const temp = inputTeamTemplate.cloneNode(true);
            teamContainer.appendChild(temp);
        }

    }

    hideNbTeams(nb: number): void {
        const teamContainer = this.getTeamContainer();

        for (let i = 0; i < nb; i++) {
            const lastChild = teamContainer.lastElementChild;
            teamContainer.removeChild(lastChild);
        }
    }

    updateTeamListDisplay(wantedTeamNumber: number): void {

        const teamContainer = this.getTeamContainer();
        const currentTeamNumber = teamContainer.hasChildNodes() && teamContainer.childNodes.length || 0;

        if (currentTeamNumber > wantedTeamNumber) {
            this.hideNbTeams(currentTeamNumber - wantedTeamNumber);
        }

        if (wantedTeamNumber > currentTeamNumber) {
            this.addNbTeams(wantedTeamNumber - currentTeamNumber);
        }
    }

    nubmerOfTeamChanges(event: Event): void {
        const numberOfTeams = event.target.valueAsNumber || Number(event.target.value);
        this.updateTeamListDisplay(numberOfTeams);
    }

    bindEvents(): void {
        const numberOfTeam = document.getElementById("form-team-number");
        console.log("[addEvents()] numberOfTeam: ", numberOfTeam);
        numberOfTeam && numberOfTeam.addEventListener("input", (e) => this.nubmerOfTeamChanges(e));
    }

}

export default new Toolnament();

