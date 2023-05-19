import {Page} from "./Page.js";
import {datasourcestore, DataSourceStore, Store, tree} from "@intermesh/goui";
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

		const tree = this.createTree();
		void tree.store.load();
		this.items.add(
			tree
		)
	}

	createTree() {
		return tree<DataSourceStore<DemoEntity>>(
			{
				listeners: {
					drop: (tree, e, dropRow, dropPos, dragData) => {

						const store = dragData.cmp.store as Store<TreeRecord>;
						store.removeAt(dragData.storeIndex);

						dragData.dropTree.store.add(dragData.record);

					}
				},
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


					return store;
				}
			}
		)
	}
}