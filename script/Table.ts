import {Page} from "./Page.js";
import {btn, checkboxselectcolumn, column, datecolumn, h2, menu, p, table, Window} from "@intermesh/goui";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {PagingTable} from "./table/PagingTable.js";
import {PagingStore} from "./table/PagingStore";

export class Table extends Page {

	constructor() {
		super();
		this.title = "Table";
		this.sourceURL = "script/Table.ts";

		this.items.add(

			p("Table's support sorting, keyboard navigation and (multi) row selection. " +
				"Right click the headers to enable or disable columns."),

			new PlaygroundTablePanel(),


			new PagingTable(),


			h2("Checkbox selection and button in row"),

			table({
				store: new PagingStore(),
				listeners: {
					render: sender => {
						sender.store.loadNext();
					}
				},
				rowSelectionConfig: {
					multiSelect:true
				},
				columns: [
					checkboxselectcolumn(),

					column({
						header: "No.",
						id: "number",
						sortable: true,
						resizable: true,
						width: 100,
						align: "right"
					}),

					// Omitting width will auto size this to fill the width
					column({
						header: "Description",
						id: "description",
						sortable: true,
						resizable: true
					}),

					// datecolumns have a standard width
					datecolumn({
						header: "Created At",
						id: "createdAt",
						sortable: true
					}),

					column({
						id:"more",
						width: 56,
						renderer:(columnValue, record, td, table1, storeIndex) => {
							return btn({
								icon: "more_vert",
								menu: menu({},
									btn({
										text: "Edit",
										icon: "edit",
										handler: ()=>{
											Window.alert(`You want top edit ${record.number}`);
										}
									}),
									btn({
										text: "Delete",
										icon: "delete",
										handler: ()=>{
											Window.confirm(`Do you want to delete ${record.number}?`);
										}
									}))
							})
						}
					})
				]

			})
		);
	}

}