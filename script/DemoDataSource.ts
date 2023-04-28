import {
    AbstractDataSource, ArrayUtil,
    BaseEntity,
    Changes,
    CommitResponse, DateTime, EntityID, GetResponse,
    QueryParams,
    QueryResponse,
    SetRequest
} from "@intermesh/goui";


const data:Record<EntityID, DemoEntity> = {};

for(let i = 1; i <= 1000; i ++) {
    let demo:DemoEntity = {
        id: i+"",
        parentId: i < 101 ? undefined : (Math.floor(Math.random() * 900) + 1) + "",
        name: "Test " + i,
        createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format('c')
    };

    data[demo.id]= demo;
}



/**
 * This Demo data source fill itself with 10 Demo records
 */
export class DemoDataSource extends AbstractDataSource<DemoEntity> {

    protected async internalCommit(params: SetRequest<DemoEntity>) {

        const state = await this.getState();
        // Normal stores would save data to a remote source here. We just act like everything was saved.
        return {
            updated: params.update,
            created: params.create,
            destroyed: params.destroy,
            newState: state!,
            oldState: state!
        } as CommitResponse<DemoEntity>;
    }

    protected internalGet(ids: string[]) {
        // Normal stores would fetch data from a remote source here
        const ret: GetResponse<DemoEntity> = {
            list: [],
            notFound: [],
            state: "1"
        };

        ids.forEach((id) => {
            ret.list.push(data[id]);
        })

        console.log('get ', ret);

        return Promise.resolve(ret);
    }

    protected internalUpdate() {
        // Normal stores would check for changes on a remote source here
        return Promise.resolve({});
    }

    protected internalQuery(params: QueryParams): Promise<QueryResponse> {
        // this Demo store returns the 10 Demo id's
        let ids =[];

        const d = Object.values(data);

        const sorted = params.sort ?  ArrayUtil.multiSort(d, params.sort) : d;

        if(params.filter) {
            //dummy filter that matches propery names
            sorted.forEach((e) => {
                let pass = true;
                for (let filterName in params.filter) {
                    if (params.filter[filterName] !== e[filterName]) {
                        pass = false;
                        break;
                    }
                }

                if (pass) {
                    ids.push(e.id);
                }
            });

        } else {
            ids = sorted.map((e) => e.id);
        }

        if(params.limit) {
            params.position = params.position ?? 0;
            ids = ids.slice(params.position, params.position + params.limit)
        }

        console.log("Query: ", ids);

        return Promise.resolve({ids: ids, queryState: "1"});
    }

    protected internalRemoteChanges(): Promise<Changes<DemoEntity>> {
        return Promise.resolve({
            newState: "1",
            oldState: "1"
        });
    }

}
export interface DemoEntity extends BaseEntity {
    name: string,
    parentId?:string,
    createdAt:string
}

export const demoDataSource = new DemoDataSource("DemoId");