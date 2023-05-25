import {column, Component, datecolumn, h2, paginator, table} from "@intermesh/goui";
import {PagingStore} from "./PagingStore.js";

export class PagingTable extends Component {



	constructor() {
		super();

		const s = new PagingStore();

		this.items.add(
			h2("Pagination"),

			table({
				fitParent: true,
				store: s,
				cls: "frame",
				columns: [
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
					})
				]
			}),

			paginator({
				store: s
			})
		)

		void s.loadNext();
	}
}