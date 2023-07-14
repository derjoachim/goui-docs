import {Page} from "./Page.js";
import {
	arrayfield,
	autocomplete,
	autocompletechips,
	btn,
	checkbox,
	checkboxgroup,
	checkboxselectcolumn,
	chips,
	colorfield,
	column,
	combobox,
	containerfield,
	datasourcestore,
	datefield,
	DateTime,
	Field,
	fieldset,
	form,
	Form as GouiForm,
	htmlfield,
	mapfield,
	MapField,
	numberfield,
	p,
	radio,
	recurrencefield,
	select,
	store,
	table,
	tbar,
	textarea,
	TextField,
	textfield,
	Window
} from "@intermesh/goui";
import {demoDataSource} from "./DemoDataSource";

export class Form extends Page {
	private form: GouiForm;

	constructor() {
		super();

		this.title = "Form";
		this.sourceURL = "Form.ts";

		type AutoCompleteRecord = {
			id: number,
			description: string,
			createdAt: string
		}
		// Create some records to use for the autocomplete store below
		const autocompleteRecords: AutoCompleteRecord[] = [];

		for (let i = 1; i <= 20; i++) {
			autocompleteRecords.push({
				id: i,
				description: "Test " + i,
				createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
			});
		}

		const tf = textfield({
				label: "Text",
				name: "text"
			});

		this.items.add(
			this.form = form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.getValues(), null, 4) + "</code>");
					}
				},

				p("Forms can handle complex object structures using Container and Array type fields. They don't submit in the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. To see how this works fill in some data and press 'Save' below."),


				fieldset({
						legend: "Text fields"
					},

					textfield({
						hidden: true,
						name: "hiddenTextField",
						value: "hiddenValue"
					}),

					tf,


						checkbox({

							label: "Disabled",
							listeners: {
								change: (field, checked) => {
									tf.disabled = checked;
								}
							}
						}),

						checkbox({

							label: "Required",
							listeners: {
								change: (field, checked) => {
									tf.required = checked;
								}
							}
						}),

						checkbox({

							label: "Read only",
							listeners: {
								change: (field, checked) => {
									tf.readOnly = checked;
								}
							}
						}),

						checkbox({

							label: "Leading icon",
							listeners: {
								change: (field, checked) => {
									tf.icon = checked ? "favorite" : undefined;
								}
							}
						}),

					checkbox({

						label: "Button",
						listeners: {
							change: (field, checked) => {
								tf.buttons = checked ? [btn({
									icon: "clear",
									handler: (clearBtn) => {
										clearBtn.findAncestorByType(TextField)!.reset();
									}
								})] : undefined
							}
						}
					}),



				),

				fieldset({legend: "Number field"},
					numberfield({
						name: "number",
						label: "Number",
						decimals: 2
					})
				),
				fieldset({legend: "Picker fields"},

					datefield({
						label: "Date",
						name: "date",
						required: true,
						minDate: (new DateTime()).addDays(-30),
						maxDate: (new DateTime()).addDays(-1),
						hint: "Select a date in the past 30 days"
					}),

					textfield({
						type: "date",
						name: "datenative",
						label: "Date (native)"
					}),

					textfield({
						type: "datetime-local",
						name: "datetime-local",
						label: "Date & time"
					}),


					textfield({
						type: "time",
						name: "time",
						label: "Time"
					}),

					colorfield({
						label: "Color",
						name: "color"
					}),

					select({
						label: "Select",
						name: "select",
						options: [
							{
								value: "1",
								name: "Option 1"
							},
							{
								value: "2",
								name: "Option 2"
							}
						]
					}),

					autocomplete({
						hint: "Type 'test' to autocomplete. Use the arrow keys for keyboard navigation.",
						// required: true,
						label: "Autocomplete",
						name: "autocomplete",

						pickerRecordToValue: (field, record) => {
							return record.id;
						},

						async valueToTextField (field, value: any): Promise<string> {
							const record = field.list.store.find(r => r.id == value);
							return record ? record.description : "";
						},

						value: 3,

						buttons: [
							btn({
								icon: "clear",
								type: "button",
								handler: (btn) => {
									(btn.parent!.parent! as Field).value = undefined;
								}
							})
						],
						listeners: {

							autocomplete: (field, text) => {
								//clone the array for filtering
								const filtered = autocompleteRecords.filter((r:AutoCompleteRecord) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !text || r.description.toLowerCase().indexOf(text.toLowerCase()) === 0;
								});

								//simple local filter on the store
								field.list.store.loadData(filtered, false)
							}
						},

						list: table({
							headers: false,
							fitParent: true,
							store: store<AutoCompleteRecord>({
								data: autocompleteRecords,
								sort: [{
									property: "description",
									isAscending: true
								}]
							}),
							columns: [
								column({
									header: "Description",
									id: "description",
									sortable: true,
									resizable: true
								})
							]
						})


					}),

					combobox({
						label: "Combo box",
						name: "comboBox",
						dataSource: demoDataSource
					}),


					recurrencefield({
						label: "Recurrence",
						name: "recurrence"
					})
				),

				fieldset({legend: "Multi line"},
					textarea({
						label: "Text area",
						name: "textarea"
					}),

					htmlfield({
						label: "Html",
						name: "html",
						hint: "Attach files by dropping or pasting them"
					}),

					htmlfield({
						label: "Html",
						name: "html",
						hint: "Attach files by dropping or pasting them",
						cls: "frame-hint"
					}),
				),

				fieldset({legend: "Checks and radio's"},

					checkbox({
						label: "A checkbox label comes after",
						name: "checkbox"
					}),

					checkbox({
						label: "Checkbox type switch",
						name: "checkbox",
						type: "switch"
					}),

					checkbox({
						label: "Checkbox type button",
						name: "checkbox",
						type: "button",
						cls: "outlined"
					}),

					checkboxgroup({
						label: "Group",
						options: [
							{label: "Option 1", name: "option1", value: true},
							{label: "Option 2", name: "option2"},
							{label: "Option 3", name: "option3"}
						]
					}),


					radio({
							label: "Radio with type='button'",
							type: "button",
							name: "radio-button",
							value: "option1",
							options: [
								{text: "Option 1", value: "option1"},
								{text: "Option 2", value: "option2"},
								{text: "Option 3", value: "option3"}
							]
						}
					),

					radio({
							label: "Radio with type='box'",
							type: "box",
							name: "radio-box",
							value: "option1",
							options: [
								{text: "Option 1", value: "option1"},
								{text: "Option 2", value: "option2"},
								{text: "Option 3", value: "option3"}
							]
						}
					),
				),

				fieldset({legend: "Container field"},

					p("A container field is used to create a sub property in the form object. Press 'Save' below to see the result."),

					containerfield({
							name: "sub"
						},
						textfield({
							label: "Sub object",
							name: "prop"
						})
					)
				),

				fieldset({legend: "Map field"},

					mapfield({
						name: "mapfield",
						buildField: () => {
							return containerfield({
									cls: "hbox gap",
								},

								select({
									name: "type",
									width: 100,
									label: "Type",
									options: [
										{
											value: "work",
											name: "Work"
										},
										{
											value: "home",
											name: "Home"
										}
									]
								}),
								textfield({
									flex: 1,
									label: "E-mail",
									name: "email",
								}),
							)
						},

						value: {
							"key1": {
								type: "work",
								email: "john@work.com"
							},

							"key2": {
								type: "home",
								email: "john@home.com"
							}
						}
					}),

					tbar({},
						'->',
						btn({
							icon: "add",
							cls: "outlined",
							text: "Add new value",
							handler: () => {
								const fld = this.form.findField<MapField>("mapfield")!;
								fld.add({})
							}
						})
					)
				),

				fieldset({legend: "Array field"},

					p("Array fields can be used to represent an array of objects like contact e-mail addresses for example."),

					arrayfield({
						name: "arrayfield",
						/**
						 * This function is called to create form fields for each array item.
						 * Typically, a container field will be used.
						 */
						buildField: () => {
							return containerfield({
									cls: "hbox gap",
								},

								select({
									name: "type",
									width: 100,
									label: "Type",
									options: [
										{
											value: "work",
											name: "Work"
										},
										{
											value: "home",
											name: "Home"
										}
									]
								}),
								textfield({
									flex: 1,
									label: "E-mail",
									name: "email",
								})
							)
						},
						value: [{
							type: "work",
							email: "john@work.com"
						},
							{
								type: "home",
								email: "john@home.com"
							}]
					}),
					tbar({},
						'->',
						btn({
							icon: "add",
							cls: "outlined",
							text: "Add new value",
							handler: () => {
								const arrayField = this.form.findField("arrayfield")!;
								arrayField.value = arrayField.value.concat([{
									type: "home",
									email: "another@example.com"
								}]);
							}
						})
					)
				),


				fieldset({
						legend: "Chip fields"
					},

					chips({
						name: "fruits",
						label: "Fruits",
						value: ["Apple", "Banana", "Coconut"]
					}),

					autocompletechips({
						label: "Autocomplete single select",
						name: "customChips",
						chipRenderer: async (chip, value) => {
							chip.text = value.name;
						},
						pickerRecordToValue(field, record): any {
							return {
								id: record.id,
								name: record.description
							};
						},
						listeners: {
							autocomplete: (field, input) => {
								//clone the array for filtering
								const filtered = structuredClone(autocompleteRecords).filter((r:AutoCompleteRecord) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !input || r.description.toLowerCase().indexOf(input.toLowerCase()) === 0;
								});

								//simple local filter on the store
								field.list.store.loadData(filtered, false);
							}
						},

						// dropdown list can be a table or list component
						list: table({
							fitParent: true,
							headers: false,
							store: store<AutoCompleteRecord>({
								data: autocompleteRecords,
								sort: [{
									property: "description",
									isAscending: true
								}]
							}),
							columns: [
								column({
									header: "Description",
									id: "description",
									sortable: true,
									resizable: true
								})
							]
						})
					}),


					autocompletechips({
						list: table({
							fitParent: true,
							headers: false,
							store: datasourcestore({
								dataSource: demoDataSource
							}),
							rowSelectionConfig: {
								multiSelect: true
							},
							columns: [
								checkboxselectcolumn(),
								column({
									header: "Name",
									id: "name",
									sortable: true,
									resizable: true
								})
							]
						}),
						label: "Autocomplete with multi select",
						name: "customChips",
						chipRenderer: async (chip, value) => {
							chip.text = value;
						},
						pickerRecordToValue(field, record): any {
							return record.name;
						},
						listeners: {
							autocomplete: (field, input) => {
								field.list.store.queryParams = {filter: {name: input}};
								field.list.store.load();
							}
						}
					})
				),


				tbar({cls: "bottom"},

					"->",

					btn({
						cls: "primary",
						html: "Save",
						type: "submit"
					})
				)
			)
		)
	}
}
