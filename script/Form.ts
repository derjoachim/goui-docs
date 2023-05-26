import {Page} from "./Page.js";
import {
	arrayfield,
	autocomplete,
	btn,
	checkbox,
	checkboxgroup,
	colorfield,
	column,
	containerfield,
	datefield,
	DateTime,
	Field,
	fieldset,
	form,
	Form as GouiForm,
	htmlfield,
	mapfield,
	MapField, numberfield,
	p,
	radio,
	recurrencefield,
	select,
	store,
	StoreRecord,
	table,
	tbar,
	textarea,
	textfield,
	Window
} from "@intermesh/goui";

export class Form extends Page {
	private form: GouiForm;

	constructor() {
		super();

		this.title = "Form";
		this.sourceURL = "Form.ts";

		// Create some records to use for the autocomplete store below
		const autocompleteRecords: StoreRecord[] = [];

		for (let i = 1; i <= 20; i++) {
			autocompleteRecords.push({
				id: i,
				description: "Test " + i,
				createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
			});
		}


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
						label: "Basic",
						name: "basic"
					}),

					textfield({
						itemId: "requiredField",
						label: "Required field",
						name: "required",
						required: true,
						hint: "This is a required field"
					}),

					textfield({
						label: "Read Only",
						name: "readonly",
						readOnly: true,
						value: "This is read only"
					}),

					textfield({
						label: "Disabled",
						name: "disabled",
						disabled: true,
						value: "Disabled field"
					})
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
						name: "date"
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
						displayProperty: "description",
						valueProperty: "id", // if omitted the whole record will be the value.
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
								const filtered = autocompleteRecords.filter((r) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !text || r.description.toLowerCase().indexOf(text.toLowerCase()) === 0;
								});

								//simple local filter on the store
								field.table.store.loadData(filtered, false)
							}
						},
						table: table({
							headers: false,
							store: store({
								sort: [{
									property: "description",
									isAscending: true
								}]
							}),

							columns: [
								column({
									id: "description",
									sortable: true,
									resizable: true,
									width: 300
								})
							]
						})
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
