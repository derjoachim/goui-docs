import {Page} from "./Page.js";
import {
	AbstractDataSource,
	BaseEntity,
	btn,
	column,
	comp,
	DataSourceStore,
	form,
	Form,
	Notifier,
	p,
	QueryParams,
	Table,
	table,
	textfield
} from "@intermesh/goui";


/**
 * This Dummy data source fill itself with 10 Dummy records
 */
class DummyDataSource extends AbstractDataSource<DummyEntity> {

	constructor(id:string) {
		super(id);

		for(let i = 0; i < 10; i ++) {
			let dummy:DummyEntity = {
				id: i+"",
				name: "Test " + i
			};
			this.add(dummy) ;
		}

	}
	protected internalCommit() {
		// Normal stores would save data to a remote source here
		return Promise.resolve({});
	}

	protected internalGet(ids: string[]) {
		// Normal stores would fetch data from a remote source here
		return Promise.resolve({
			list: [],
			notFound: ids
		});
	}

	protected internalUpdate() {
		// Normal stores would check for changes on a remote source here
		return Promise.resolve({});
	}

	query(params: QueryParams) {
		// this dummy store returns the 10 dummy id's
		const ids = [];
		for(let i = 0; i < 10; i++) {
			ids.push(i+"");
		}
		return Promise.resolve({ids: ids});
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
		void store.load();

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