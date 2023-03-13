import {btn, Component, mstbar, ObjectUtil, router, searchbtn, tbar} from "@intermesh/goui";
import {PlaygroundTable} from "./PlaygroundTable.js";
import {Page} from "../Page.js";



export class PlaygroundTablePanel extends Page {

	sourceURL = "script/table/PlayGroundTablePanel.ts";

	constructor() {
		super();

		this.title = "Table";

		const table = new PlaygroundTable();

		//clone the array for filtering
		const records = ObjectUtil.clone(table.store.getArray());



		this.items.add(

			tbar({},
				"->",

				searchbtn({
					listeners: {
						input:(searchBtn, text) => {

							const filtered = records.filter((r) => {
								return !text || r.description.toLowerCase().indexOf(text.toLowerCase()) === 0;
							});

							//simple local filter on the store
							table.store.loadData(filtered, false)
						}
					}
				}),

				btn({
					icon: "add",
					cls: "primary",
					text: "Add",
					handler: () => {
					}
				}),

				mstbar({table: table}, "->", btn({icon: "delete"})),
			),

			table
		)
	}
}