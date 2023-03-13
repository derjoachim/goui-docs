import {Page} from "./Page.js";
import {btn, code, h1, h2, p, section} from "@intermesh/goui";

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