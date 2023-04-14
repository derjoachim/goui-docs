import {Page} from "./Page.js";
import {p} from "@intermesh/goui";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {PagingTable} from "./table/PagingTable.js";

export class Table extends Page {

	constructor() {
		super();
		this.title = "Table";
		this.sourceURL = "script/Table.ts";

		this.items.add(

			p("Table's support sorting, keyboard navigation and (multi) row selection. " +
				"Right click the headers to enable or disable columns."),

			new PlaygroundTablePanel(),


			new PagingTable()
		);
	}

}