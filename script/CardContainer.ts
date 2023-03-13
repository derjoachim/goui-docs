import {Page} from "./Page.js";
import {p} from "@intermesh/goui";

export class CardContainer extends Page {
	constructor() {
		super();
		this.title = "Card container";

		this.items.add(

			p({
				html: "Todo...."
			})

		)
	}
}