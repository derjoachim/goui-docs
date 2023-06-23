import {Page} from "./Page.js";
import {
	btn,
	checkboxselectcolumn,
	column,
	datasourcestore,
	datecolumn,
	h2,
	menu,
	p,
	table,
	Window
} from "@intermesh/goui";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {PagingTable} from "./table/PagingTable.js";
import {demoDataSource} from "./DemoDataSource";

export class Table extends Page {

	constructor() {
		super();
		this.title = "Table";
		this.sourceURL = "Table.ts";

		this.items.add(
			p("Table's support sorting, keyboard navigation and (multi) row selection. " +
				"Right click the headers to enable or disable columns."),

			new PlaygroundTablePanel(),

			new PagingTable(),

			h2("Checkbox selection and button in row"),

			this.createTable(),

			h2("Grouped"),

			this.createGroupedTable()
		);
	}

	private createTable() {
		return table({
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: undefined
					},
					limit: 10
				}
			}),

			rowSelectionConfig: {
				multiSelect: true
			},

			columns: [
				checkboxselectcolumn(),

				column({
					header: "ID",
					id: "id",
					sortable: true,
					resizable: true,
					width: 100,
					align: "right"
				}),

				// Omitting width will auto size this to fill the width
				column({
					header: "Name",
					id: "name",
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
					id: "more",
					width: 56,
					renderer: (columnValue, record, td, table1, storeIndex) => {
						return btn({
							icon: "more_vert",
							menu: menu({},
								btn({
									text: "Edit",
									icon: "edit",
									handler: () => {
										Window.alert(`You want to edit ${record.number}`);
									}
								}),
								btn({
									text: "Delete",
									icon: "delete",
									handler: () => {
										Window.confirm(`Do you want to delete ${record.number}?`);
									}
								}))
						})
					}
				})
			],

			listeners: {
				navigate: (list, storeIndex) => {
					console.log(list.store.get(storeIndex)!.createdAt);

				},

				render: sender => {
					sender.store.load();
				}
			}
		})
	}

	private createGroupedTable() {
		return table({
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: undefined
					},
					limit: 20
				},
				sort: [{
					isAscending: true,
					property: "group"
				}, {
					isAscending: true,
					property: "name"
				}]
			}),

			rowSelectionConfig: {
				multiSelect: true,
				listeners: {
					selectionchange: rowSelect => {
						console.log("selectionchange", rowSelect.selected);
					}
				}
			},
			groupBy: "group",

			columns: [

				column({
					header: "ID",
					id: "id",
					sortable: true,
					resizable: true,
					width: 100,
					align: "right"
				}),

				// Omitting width will auto size this to fill the width
				column({
					header: "Name",
					id: "name",
					sortable: true,
					resizable: true
				}),

				// column({
				// 	header: "Group",
				// 	id: "group",
				// 	sortable: true,
				// 	resizable: true
				// }),

				// datecolumns have a standard width
				datecolumn({
					header: "Created At",
					id: "createdAt",
					sortable: true
				})
			],

			listeners: {

				navigate: (list, storeIndex) => {
					console.log(list.store.get(storeIndex)!.createdAt);
				},

				render: sender => {
					sender.store.load();
				}

			},

		})
	}
}