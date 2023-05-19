import {Page} from "./Page.js";
import {datasourcestore, DataSourceStore, tree} from "@intermesh/goui";
import {demoDataSource, DemoEntity} from "./DemoDataSource";

type TreeRecord = {
	id?: string,
	text: string
	children?: TreeRecord[]
}

export class DragAndDrop extends Page {
	sourceURL = "DragAndDrop.ts";

	constructor() {
		super();

		this.title = "Drag And Drop";

		this.items.add(
			this.createTree()
		)
	}

	createTree() {
		return tree<DataSourceStore<DemoEntity>>(
			{

				draggable: true,
				labelProperty: "text",
				storeBuilder: record => {
					const store = datasourcestore({
						dataSource: demoDataSource,
						buildRecord: async (e): Promise<TreeRecord> => {
							const children = await demoDataSource.query({
								filter: {parentId: e.id}
							});
							const rec = {
								id: e.id + "",
								text: e.name,
								children: children.ids.length ? undefined : [] // set to empty array if has no childen so
								// the tree knows it's a leaf
							}

							return rec;
						}
					})
					store.queryParams.filter = {
						parentId: record ? record.id : undefined
					}
					void store.load();

					return store;
				}
			}
		)
	}
}