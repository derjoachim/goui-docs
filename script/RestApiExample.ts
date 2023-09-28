import {
	BaseEntity,
	btn,
	column,
	Component,
	datasourceform,
	datasourcestore,
	fieldset,
	Format,
	h2, p,
	RestDataSource, Table,
	table,
	tbar,
	textfield,
	win,
	Window
} from "@intermesh/goui";

interface User extends BaseEntity {
	email: string
	first_name: string,
	last_name: string
	avatar: string
}

// there should be only one unique instance of each data source in the whole application
const userDS = new RestDataSource<User>("https://reqres.in/api/users", "users");

export class RestApiExample extends Component {
	constructor() {
		super();

		this.items.add(
			h2("REST API Example"),

			p("This example shows how to use a REST API Data source to show a table and edit dialog. Double click rows to edit. We used <a href='https://reqres.in'>https://reqres.in</a> for this example."),

			btn({
				icon: "refresh",
				handler: (button, ev) => {
					const tbl = button.nextSibling() as Table;
					tbl.store.reload();
				}
			}),

			table({
				fitParent: true,
				store: datasourcestore({
					dataSource: userDS
				}),
				columns: [
					column({
						header: "email",
						id: "email"
					}),
					column({
						header: "first_name",
						id: "first_name"
					}),
					column({
						header: "last_name",
						id: "last_name"
					}),
					column({
						header: "avatar",
						id: "avatar",
						renderer: (columnValue, record, td, table1, storeIndex) => {
							return `<img style="width:128px;height:128px;" alt="${Format.escapeHTML(record.first_name)}" src="${columnValue}" />`;
						}
					})
				],
				listeners: {
					render: comp => {
						comp.store.load();
					},
					rowdblclick: async (list, storeIndex, row, ev) => {
						const dlg = win({
								title: "Edit",
								modal: true
							},
							datasourceform({
									dataSource: userDS,
									listeners: {
										render: comp => {
											// load the selected user on render
											comp.load(list.store.get(storeIndex)!.id);
										},
										submit: (form1, handlerResponse) => {
											// close window on submit
											(form1.parent as Window).close();
										}
									}
								},
								fieldset({},
									textfield({
										name: "first_name",
										label: "First",
										required: true
									}),

									textfield({
										name: "last_name",
										label: "Last",
										required: true
									})
								),

								tbar({},
									btn({
										type: "submit",
										text: "Save"
									}))
							)
						);

						dlg.show();
					}

				}

			})
		);
	}
}
