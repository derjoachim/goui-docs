import {Page} from "./Page.js";
import {
	autocomplete, btn, checkbox,
	colorfield, column, containerfield,
	ContainerField,
	datefield, DateTime, Field,
	fieldset,
	form, htmlfield, radio, RecurrenceField,
	select, store, StoreRecord, table, tbar,
	textfield,
	TextField, recurrencefield, textarea
} from "@intermesh/goui";

export class Form extends Page {
	constructor() {
		super();

		this.title = "Form";

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

						console.log(form.getValues());

						const sub = form.findField("sub") as ContainerField;
						const test1 = sub.findField("test1") as TextField;

						test1.setInvalid("Hey something went wrong!");
					}
				},

				fieldset({},

					textfield({
						itemId: "requiredField",
						label: "Required field",
						// placeholder: "Here's the placeholder",
						name: "test",
						required: true,
						hint: "Please fill in something awesome"
					}),

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
						hint: "Type 'test' to autocomplete",
						required: true,
						label: "Autocomplete",
						name: "autocomplete",
						value: "id", // if omited the whole record will be the value.
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

					textarea({
						label: "Text area",
						name: "textarea"
					}),

					htmlfield({
						label: "Html",
						name: "html",
						hint: "Attach files by dropping or pasting them",
						// cls: "frame-hint"
					}),

					containerfield({
							name: "sub"
						},
						textfield({
							label: "A freaking long stupid label",
							name: "test1",
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

					recurrencefield({name: "recurrence"}),

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