import {Page} from "./Page";
import {DataSourceStore, h2, Store, store, tree} from "@intermesh/goui";
import {demoDataSource, DemoDataSource, DemoEntity} from "./DemoDataSource";

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
            parentId?:string,
            text:string
            children:TreeRecord[]
        }

        const demoTree = tree<Store<TreeRecord>>({
            labelProperty: "text",
            storeBuilder: record => {
                const s = store<TreeRecord>();
                if(record) {
                    s.loadData(record.children);
                } else
                {
                    s.loadData(treeData);
                }
                return s;
            }
        });




        const dsTree = tree<DataSourceStore<DemoEntity>>(
            {
                storeBuilder: record => {
                    const store = new DataSourceStore<DemoEntity>(demoDataSource);
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