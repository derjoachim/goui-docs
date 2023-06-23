import {Page} from "./Page.js";
import {comp, h2, p, splitter} from "@intermesh/goui";

export class Layout extends Page {
	constructor() {
		super();
		this.title = "Layout";
		this.sourceURL = './Layout.ts';

		this.items.add(
			p("Layout's are created with CSS. We have made some classes to create layouts."),

			h2("hbox"),

			p("The 'hbox' css class create a horizontal stack using flex css. You can use the 'gap' class to use a standard gap."),

			comp({
					cls: "hbox gap",
				},
				comp({
					width: 100,
					cls: "pad",
					html: "Left",
					style: {border: "1px dashed red"}
				}),

				comp({
					flex: 1,
					cls: "pad",
					html: "Center",
					style: {border: "1px dashed blue"}
				}),

				comp({
					width: 100,
					cls: "pad",
					html: "Right",
					style: {border: "1px dashed green"}
				})
			),

			h2("vbox"),

			p("The 'vbox' css class create a vertical stack using flex css. You can use the 'gap' class to use a standard gap."),

			comp({
					cls: "vbox gap",
					height: 300
				},
				comp({
					height: 72,
					cls: "pad",
					html: "Top",
					style: {border: "1px dashed red"}
				}),

				comp({
					flex: 1,
					cls: "pad",
					html: "Center",
					style: {border: "1px dashed blue"}
				}),

				comp({
					height: 72,
					cls: "pad",
					html: "Bottom",
					style: {border: "1px dashed green"}
				})
			),

			h2("Splitter"),

			p("A Splitter Component can be used for resizing panels on the desktop. Try resizing the panels."),

			comp({
					cls: "hbox gap",
				},
				comp({
					itemId: "left",
					width: 100,
					cls: "pad",
					html: "Left",
					style: {border: "1px dashed red"}
				}),

				splitter({
					resizeComponentPredicate: "left" //finds it by itemId
				}),

				comp({
					flex: 1,
					cls: "pad",
					html: "Center",
					style: {border: "1px dashed blue"}
				}),

				splitter({
					resizeComponentPredicate: "right" //finds it by itemId
				}),

				comp({
					itemId: "right",
					width: 100,
					cls: "pad",
					html: "Right",
					style: {border: "1px dashed green"}
				})
			),

			h2("scroll"),
			p("Use the 'scroll' css class for panels that need to scroll."),

			h2("pad"),
			p("Use the 'pad' css class top apply default padding."),

			h2("fit"),
			p("Use the 'fit' css class to make the component fit exactly in the parent component."),

			h2("border"),
			p("Use the 'border-top', 'border-right', 'border-bottom' and 'border-left' css class to apply the standard border."),
		)
	}
}