import {Page} from "./Page.js";
import {p} from "@intermesh/goui";

export class Layout extends Page {
	constructor() {
		super();
		this.title = "Layout";

		this.items.add(

			p({
				html: "Todo.... CSS, splitter, hbox, vbox etc."
			})

		)
	}
}