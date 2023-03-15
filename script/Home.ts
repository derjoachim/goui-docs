import {Page} from "./Page.js";
import {btn, code, h2, p} from "@intermesh/goui";

export class Home extends Page {
	constructor() {
		super();
		this.title = "Group-Office User Interface";

		this.items.add(

			p( "Welcome to the <a href=\"https://www.group-office.com/\">Group-Office</a> " +
				"User Interface Documentation website. " +
				"GOUI is written in <a href=\"https://www.typescriptlang.org/\">TypeScript</a> and " +
				"<a href=\"https://sass-lang.com/\">SASS</a> to produce beautiful and efficient" +
				" HTML and CSS. <br>All available components are shown on this website. You can find the source on GitHub to " +
				"help you get started. Because all code is written in TypeScript with documentation your TypeScript editor will " +
				"help you with coding by providing intelligent suggestions."
			),

			h2("Group-Office"),

			p(
				"GOUI is created to replace the ExtJS 3.4 framework used in " +
				"<a href=\"https://www.group-office.com/\">Group-Office</a>.<br>" +
					"But it's not made only for Group-Office. It's standalone and can be " +
				"used in any Javascript / TypeScript project."
			),


			h2("Efficient architecture"),

			p(
				"GOUI is very efficient because it's output is pure Javascript and CSS. If possible we use pure HTML and " +
					"CSS to put the browser to work to render components. If that's not possible Javascript will be used. " +
					"Applications are written in pure TypeScript so there's no need for parsing any templates. " +
					"It goes straight from Javascript to the DOM.<br>" +
					"We use Emcascript 6 modules that can be lazy loaded to keep memory usage low and performance high."
			),


			h2("Get started"),

			p(
				"To get started take these steps to install a very simple 'Hello World' example." +
				" We assume you have the tools '<a href=\"https://git-scm.com/\">git</a>' and " +
				"'<a href=\"https://www.npmjs.com/\">npm</a>' installed."
			),

			code("git clone https://github.com/Intermesh/goui-hello-world.git"),

			code("cd goui-hello-world"),

			code("npm install"),

			code("npm start"),

			btn({
				cls: "raised",
				text: "Open http://localhost:8081",
				handler: () => {
					window.open("http://localhost:8081");
				}
			})

		)
	}
}