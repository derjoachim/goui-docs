import {cards, CardMenu, cardmenu, Component, CardContainer, comp, btn, tbar, h1} from "@intermesh/goui";
import hljs from "highlight.js";

export class Page extends Component {
	// private cards: CardContainer;
	// private menu: CardMenu;
	// protected docs: Component;
	// private source: Component;

	public sourceURL?: string;

	private titleEl: Component
	constructor() {
		super("section");

		this.items.add(
			comp({cls: "hbox"},
				this.titleEl = h1(),

				comp({flex: 1}),

				btn({
					cls: "raised",
					text: "Source on GitHub",
					handler:() => {
						window.open('https://github.com/intermesh/goui-docs/' + this.sourceURL);
					}
				})
			)
		);

		// this.cls = "vbox";
		//
		// this.cards = cards({flex: 1},
		// 	this.docs  = comp({title: "Docs"}),
		// 				this.source = comp({title: "Source"}),
		// 	);
		//
		// this.menu = cardmenu({
		// 	cardContainer: this.cards
		// });
		//
		// this.items.add(this.menu, this.cards);
		//
		// this.source.on("show", async () => {
		// 	const r = await fetch( this.sourceURL!);
		//
		// 	const code = await r.text();
		//
		// 	const cmp = comp({
		// 		tagName: "code",
		// 		html: hljs.highlight( code, {language: "typescript"}).value
		// 	})
		//
		// 	this.source.items.replace(cmp);
		// })
	}

	set title(title: string) {
		this.titleEl.text = title;
	}

	get title() {
		return this.titleEl.text;
	}
}