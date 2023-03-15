import {Page} from "./Page.js";
import {btn, comp, h2, win, Window as GouiWindow} from "@intermesh/goui";

export class Window extends Page {
	sourceURL = "Window.ts";

	constructor() {
		super();

		this.title = "Window";

		this.items.add(

			btn({
				text: "Basic window",
				handler: () => {
					win({
						title: "Basic window",
						modal: false,
						width: 400,
						height: 200,
						closable: true,
						maximizable: false,
						draggable: false,
						resizable: false
					},

						comp({
							cls: "pad",
							text: "I'm a basic window. No features enabled."
						})

						).show();
				}
			}),


			btn({
				text: "Modal window",
				handler: () => {
					win({
							title: "Modal window",
							modal: true,
							width: 400,
							height: 200,
							closable: true,

							draggable: false,
							resizable: false
						},

						comp({
							cls: "pad",
							text: "I'm a modal window. You have to close me first."
						})

					).show();
				}
			}),

			btn({
				text: "Draggable and resizable window",
				handler: () => {
					win({
							title: "Draggable window",
							draggable: true,
							width: 400,
							height: 200,
							closable: true,
							maximizable: true,
							resizable: true
						},

						comp({
							cls: "pad",
							text: "I'm a draggable window. Drag me with the header or resize me on the bottom right."
						})

					).show();
				}
			}),


			h2({
				text: "Static functions"
			}),

			btn({
				text: "Alert",
				handler: () => {
					GouiWindow.alert( "You clicked the alert button showing a GOUI alert dialog.")
				}
			}),

			btn({
				text: "Prompt",
				handler: async () => {
						const input = await GouiWindow.prompt("Enter your name", "Name");
						input != undefined ?
							GouiWindow.alert( "Hi " + input) :
							GouiWindow.alert( "You cancelled");
				}
			}),

			btn({
				text: "Confirm",
				handler: async () => {
					const confirmed = await GouiWindow.confirm( "Are you sure you want to do this?");
					confirmed ?
						GouiWindow.alert("OK!", "Your answer") :
						GouiWindow.alert("STOP!", "Your answer");
				}
			})
		)
	}
}