import {Component, comp, btn, h1, Button} from "@intermesh/goui";

export class Page extends Component {

	public sourceURL?: string;

	private titleEl: Component
	private sourceBtn: Button;
	constructor() {
		super("section");

		this.items.add(
			comp({cls: "hbox"},
				this.titleEl = h1(),

				comp({flex: 1}),

				this.sourceBtn = btn({
					cls: "filled",
					text: "Source on GitHub",
					handler:() => {
						window.open('https://github.com/intermesh/goui-docs/tree/main/script/' + this.sourceURL);
					}
				})
			)
		);
	}

	protected internalRender(): HTMLElement {
		this.sourceBtn.hidden = this.sourceURL == undefined;

		return super.internalRender();
	}

	set title(title: string) {
		this.titleEl.text = title;
	}

	get title() {
		return this.titleEl.text;
	}
}