import {btn, cards, comp, Component, h2, h3, Menu, menu, radio, root, router} from "@intermesh/goui";
import {Button} from "./Button.js";
import {Form} from "./Form.js";
import {Window} from "./Window.js";
import {List} from "./List.js";
import {Home} from "./Home.js";
import {NotFound} from "./NotFound.js";
import {CardContainer} from "./CardContainer.js";
import {Layout} from "./Layout.js";
import {Tree} from "./Tree.js";

import {Component as ComponentPage} from "./Component.js";
import {Data} from "./Data.js";
import {Table} from "./Table.js";
import {DragAndDrop} from "./DragAndDrop";
import {Router} from "./Router";

/**
 * Create main card panel for displaying SPA pages
 */
const main = cards({cls: "main", flex: 1});

const img = comp({
	tagName: "img",
	style: {width: "66px", height: "56px", padding: "8px 8px 8px 18px", verticalAlign: "middle"}
});
img.el.setAttribute("src", "./resources/groupoffice-icon.png");

const header = comp({
	tagName: "header",
	cls: "hbox"
},
	btn({
		icon: "menu",
		cls: "btn-open-menu",
		handler: () => {
			root.el.classList.add("open-menu");
		}
	}),

	comp({
		cls: "hbox",
		flex: 1
	},
		img,
		h2({text: "GOUI", flex: 1}),
		comp({
			tagName: "a",
			attr: {
				href: "https://goui.io/api"
			},
			html: 'API'
		}),
		comp({
			tagName: "a",
			attr: {
				href: "https://github.com/intermesh/goui"
			},
			html: '<img src="resources/github.png" alt="GitHub" width="30" height="30">'
		}),
		btn({
			icon: "format_color_fill",
			menu: menu({},
					radio({
						type: "box",
						name: "theme",
						value: "system",
						options: [
							{text: "System", value: "system"},
							{text: "Light", value: "light"},
							{text: "Dark", value: "dark"}
						],
						listeners: {
							change: (field, newValue, oldValue) => {
								root.el.classList.toggle("dark", newValue == "dark");
								root.el.classList.toggle("light", newValue == "light");
								root.el.classList.toggle("system", newValue == "system");

								field.findAncestorByType(Menu)!.close();
							}
						}
					})
				)
		})
	),

)

/**
 * Create main menu
 */
const mainMenu = menu({
		cls: "main-menu",
		listeners: {
				render: menu => {
					menu.el.addEventListener("click", () => {
						root.el.classList.remove("open-menu");
					})
				}
		}
	},


	btn({
		text: "Home",
		route: ""
	}),

	btn({
		text: "Component",
		route: "component"
	}),

	btn({
		text: "Layout",
		route: "layout"
	}),

	btn({
		text: "Data",
		route: "data"
	}),

	btn({
		text: "Router",
		route: "router"
	}),

	h3({
		text: "Components",
		style: {padding: "0 8px 0 18px"}
	}),

	btn({
		text: "Card container",
		route: "cardcontainer"
	}),

	btn({
		text: "Buttons",
		route: "buttons"
	}),

	btn({
		text: "Form",
		route: "form"
	}),

	btn({
		text: "Table",
		route: "table"
	}),

	btn({
		text: "Window",
		route: "window"
	}),

	btn({
		text: "List",
		route: "list"
	}),
	btn({
		text: "Tree",
		route: "tree"
	}),

	btn({
		text: "Drag and drop",
		route: "draganddrop"
	}),
);

/**
 * To make it memory efficient we will instantiate page components on demand when the router navigates.
 * @param cmp
 */
const pageLoader = (cmp: typeof Component) => {
	const id = router.getPath() || "home";
	let page = main.findItem(id) as Component | undefined;
	if (!page) {
		page = new cmp;
		page.id = id;

		main.items.add(page);
	}

	page.show();

	return page;
}

/**
 * Setup routes
 */
router
	.add(/^$/, () => {
		pageLoader(Home);
	})
	.add(/^buttons$/, () => {
		pageLoader(Button);
	})
	.add(/^form$/, () => {
		pageLoader(Form);
	})
	.add(/^table$/, () => {
		pageLoader(Table);
	})
	.add(/^window$/, () => {
		pageLoader(Window);
	})
	.add(/^list$/, () => {
		pageLoader(List);
	})
	.add(/^tree$/, () => {
		pageLoader(Tree);
	})
	.add(/^component$/, () => {
		pageLoader(ComponentPage);
	})
	.add(/^cardcontainer$/, () => {
		pageLoader(CardContainer);
	})
	.add(/^layout$/, () => {
		pageLoader(Layout);
	})
	.add(/^data$/, () => {
		pageLoader(Data);
	})
	.add(/^draganddrop$/, () => {
		pageLoader(DragAndDrop);
	})
	.add(/^router$/, () => {
		pageLoader(Router);
	})
	.add(() => {
		pageLoader(NotFound);
	})
	.start()
	.then(() => {
		/**
		 * Use hbox layout to put menu and section side by side
		 */
		root.cls = 'vbox';
		root.items.add(

			header,
			comp({
				cls: "hbox",
				flex: 1
			},
				mainMenu,
				// splitter({
				// 	resizeComponentPredicate: mainMenu
				// }),
				comp({
					flex: 1,
					cls: "scroll main"
				},
					main

				)
			),
			comp({
				cls: "overlay",
				listeners: {
					render: overlay => {
						overlay.el.addEventListener("click", () => {
							root.el.classList.remove("open-menu");
						})
					}
				}
			})
		)
	});



