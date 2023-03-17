import {Page} from "./Page.js";
import {
	arrayfield,
	autocomplete,
	btn,
	checkbox,
	colorfield,
	column,
	containerfield,
	datefield,
	DateTime,
	Field,
	fieldset,
	form,
	htmlfield,
	radio,
	recurrencefield,
	select,
	store,
	StoreRecord,
	table,
	tbar,
	textarea,
	textfield, Window
} from "@intermesh/goui";

export class Form extends Page {
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
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert( "<code>" + JSON.stringify(form.getValues(), null, 4) + "</code>");
					}
				},

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
				fieldset({legend: "Picker fields"},

					datefield({
						label: "Date",
						name: "date"
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


					radio({
						type: "button",
						name: "radio-button",
						value: "option1",
						options: [
							{text: "Option 1", value: "option1"},
							{text: "Option 2", value: "option2"},
							{text: "Option 3", value: "option3"}
						]}
					),

					radio({
						type: "box",
						name: "radio-box",
						value: "option1",
						options: [
							{text: "Option 1", value: "option1"},
							{text: "Option 2", value: "option2"},
							{text: "Option 3", value: "option3"}
						]}
					),
				),

				fieldset({legend: "Container field"},

					containerfield({
							name: "sub"
						},
						textfield({
							label: "Sub object",
							name: "prop",
						})
					),

					arrayfield({
						itemComponent:  () => {
							return 	textfield({
								label: "Sub object",
								name: "prop",
							})
						}
					})


				),

				tbar({ cls: "bottom" },

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