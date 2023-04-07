import {Page} from "./Page.js";
import {
	AbstractDataSource,
	BaseEntity,
	btn, Changes,
	column, CommitResponse,
	comp,
	DataSourceStore, EntityID,
	form,
	Form,
	Notifier,
	p,
	QueryParams, QueryResponse, SetRequest,
	Table,
	table,
	textfield
} from "@intermesh/goui";


/**
 * This Dummy data source fill itself with 10 Dummy records
 */
class DummyDataSource extends AbstractDataSource<DummyEntity> {

	public async loadDummyData() {
		for(let i = 0; i < 10; i ++) {
			let dummy:DummyEntity = {
				id: i+"",
				name: "Test " + i
			};

			await this.add(dummy) ;
		}
	}
	protected async internalCommit(params: SetRequest<DummyEntity>) {

		const state = await this.getState();
		// Normal stores would save data to a remote source here. We just act like everything was saved.
		return {
			updated: params.update,
			created: params.create,
			destroyed: params.destroy,
			newState: state!,
			oldState: state!
		} as CommitResponse<DummyEntity>;
	}

	protected internalGet(ids: string[]) {
		// Normal stores would fetch data from a remote source here
		return Promise.resolve({
			list: [],
			notFound: ids,
			state: "1"
		});
	}

	protected internalUpdate() {
		// Normal stores would check for changes on a remote source here
		return Promise.resolve({});
	}

	protected internalQuery(params: QueryParams): Promise<QueryResponse> {
		// this dummy store returns the 10 dummy id's
		const ids = [];
		for(let i = 0; i < 10; i++) {
			ids.push(i+"");
		}
		return Promise.resolve({ids: ids, queryState: "1"});
	}

	protected internalRemoteChanges(): Promise<Changes<DummyEntity>> {
		return Promise.resolve({
			newState: "1",
			oldState: "1"
		});
	}

}
interface DummyEntity extends BaseEntity {
	name: string
}

export class Data extends Page {
	sourceURL = "Data.ts"
	private readonly table: Table<DataSourceStore<DummyEntity>>;
	private readonly form: Form;
	private readonly dataSource: DummyDataSource;
	constructor() {
		super();
		this.title = "Data";

		// This is the single source of truth data store
		this.dataSource = new DummyDataSource("dummyId");

		// The table with a store
		this.table = this.createTable();

		// the form to edit data
		this.form = this.createForm();

		this.items.add(

			p("GOUI is event driven. A DataSource collection is a single source of truth for all types of data." +
				" When the DataSource changes it fires an event. All components and stores listen to the 'change' event to " +
				"update themselves. This approach reduces the amount of code that has to be written and maintained. <br>" +
				"The example below demonstrates this with a table and a form. When you save the form the table store acts on the" +
				" data source's change event."),

			comp({cls: "hbox gap"},
				this.table,
				this.form
			)
		);
	}

	private createForm() {
		return form({
			flex: 1,
			disabled: true,
			handler: async (form) => {
				const entity = form.getValues() as DummyEntity;
				entity.id = this.table.store.get(this.table.rowSelection!.selected[0]).id;
				await this.dataSource.update(entity);

				Notifier.success("The record was updated. The change is immediately updated in the list.");
			}
		},
			textfield({
				name: "name",
				label: "Name"
			}),

			btn({
				type: "submit",
				text: "Save"
			})
		);

	}


	private createTable() {

		// Create a data source store that gets its data from a DataSource.
		// This store listens for changes on the DataSource.
		const store = new DataSourceStore<DummyEntity>(this.dataSource);
		this.dataSource.loadDummyData().then(() => {
			void store.load();

			console.warn(this.dataSource);
		})

		return table<DataSourceStore<DummyEntity>>({
			width: 300,
			store: store,
			rowSelectionConfig: {
				multiSelect: false
			},
			columns: [
				column({
					id: "id",
					header: "ID",
					width: 100
				}),
				column({
					header: "Name",
					id: "name"
				})
			],
			listeners: {
				navigate:(list, storeIndex, record) => {
					this.form.setValues(record);
					this.form.disabled = false;
				}
			}
		})
	}
}