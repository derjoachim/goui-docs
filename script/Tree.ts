import {Page} from "./Page";
import {datasourcestore, DataSourceStore, h2, Store, store, tree} from "@intermesh/goui";
import {demoDataSource, DemoDataSource, DemoEntity} from "./DemoDataSource";
import {dragData} from "../../goui/script/DragData";

export class Tree extends Page {
    constructor() {
        super();

        this.title = "Tree";
        this.sourceURL = "Tree.ts";

        const treeData:TreeRecord[] = [
            {
                text: "Node 1",
                children: [
                    {
                        text: "Node 1.1",
                        children: []
                    },
                    {
                        text: "Node 1.2",
                        children: []
                    }
                ]
            },{
                text: "Node 2",
                children: [
                    {
                        text: "Node 2.1",
                        children: []
                    },
                    {
                        text: "Node 2.2",
                        children: []
                    }
                ]
            }
        ];

        type TreeRecord = {
            id?:string,
            text:string
            children?:TreeRecord[]
        }

        const demoTree = tree<Store<TreeRecord>>({
            labelProperty: "text",
            storeBuilder: record => {
                const s = store<TreeRecord>();
                if(record) {
                    if(record.children)
                        s.loadData(record.children);
                } else
                {
                    s.loadData(treeData);
                }
                return s;
            },

            draggable: true,
            dropBetween: true,
            listeners: {
                drop: (tree, e, dropRow, dropPos, dragData) => {
                    // dropRow.cls("-no-children");
                    // dragData.dropTree.el.appendChild(dragData.row);

                    const store = dragData.cmp.store as Store<TreeRecord>,
                      storeIndex = parseInt(dragData.row.dataset.storeIndex!);

                    const record = store.get(storeIndex);
                    store.removeAt(storeIndex);

                    dragData.dropTree.store.add(record);

                }
            }
        });

        const dsTree = tree<DataSourceStore<DemoEntity>>(
            {
                labelProperty: "text",
                storeBuilder: record => {
                    const store = datasourcestore({
                        dataSource: demoDataSource,
                        buildRecord: async (e): Promise<TreeRecord> => {
                            const children = await demoDataSource.query({
                                filter: {parentId: e.id}
                            });
                            const rec= {
                                id: e.id+"",
                                text: e.name,
                                children: children.ids.length ? undefined : [] // set to empty array if has no childen so
                                // the tree knows it's a leaf
                            }

                            return rec;
                        }
                    })
                    store.queryParams.filter = {
                        parentId:  record ? record.id : undefined
                    }
                    void store.load();

                    return store;
                }
            }
        )

        this.items.add(
            h2("Simple tree"),
            demoTree,

            h2("Tree using datasource"),
            dsTree
        )
    }
}