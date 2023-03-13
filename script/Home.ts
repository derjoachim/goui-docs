import {Page} from "./Page.js";
import {btn, code, h2, p} from "@intermesh/goui";

export class Home extends Page {
	constructor() {
		super();
		this.title = "Group-Office User Interface";

		this.items.add(

			p({
				html: "Welcome to the Group-Office User Interface Documentation website. " +
					"GOUI is written in <a href=\"https://www.typescriptlang.org/\">TypeScript</a>, " +
					"<a href=\"https://sass-lang.com/\">SASS</a> to produce beautiful and very efficient" +
					" HTML and CSS. <br>All available components are shown on this website. You can find the source on GitHub to " +
					"help you get started. Because all code is written in TypeScript with documentation your TypeScript editor will " +
					"help you with coding by providing intelligent suggestions."
			}),


			h2({
				text: "Efficient architecture"
			}),

			p({
				html: "GOUI is very efficient because it's output is pure Javascript and CSS. If possible we use pure HTML and " +
					"CSS to put the browser to work to render components. If that's not possible Javascript will be used. " +
					"Applications are written in pure TypeScript so there's no need for parsing any templates. " +
					"It goes straight from Javascript to the DOM.<br>" +
					"We use Emcascript 6 modules that can be lazy loaded to keep memory usage low and performance high."
			}),


			h2({
				text: "Get started"
			}),

			p({
				html: "To get started take these steps to install a very simple 'Hello World' example. We assume you have the tools '<a href=\"https://git-scm.com/\">git</a>' and '<a href=\"https://www.npmjs.com/\">npm</a>' installed."
			}),

			code({
				html: "git clone https://github.com/Intermesh/goui-hello-world.git"
			}),

			code({
				html: "cd goui-hello-world"
			}),

			code({
				html: "npm install"
			}),

			code({
				html: "npm start"
			}),

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