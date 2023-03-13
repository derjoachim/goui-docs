import {Page} from "./Page.js";
import {p} from "@intermesh/goui";

export class Component extends Page {
	constructor() {
		super();
		this.title = "Component";

		this.items.add(

			p({
				html: "Todo...."
			})

		)
	}
}