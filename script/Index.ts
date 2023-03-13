import {btn, cards,  Component, root, router, h1, p, code, menu, splitter, section} from "@intermesh/goui";
import {Button} from "./Button.js";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {Form} from "./Form.js";
import {Window} from "./Window.js";
import {List} from "./List.js";
import {Home} from "./Home.js";


// Create main card panel for displaying SPA pages
const main = cards({cls: "main scroll", flex: 1});

const mainMenu = menu({cls: "main"},
  btn({
    text: "Home",
    route: ""
  }),
  btn({
    text: "Buttons",
    route:"buttons"
  }),
  btn({
    text: "Form",
    route:"form"
  }),
  btn({
    text: "Table",
    route:"table"
  }),
  btn({
    text: "Window",
    route:"window"
  }),
  btn({
    text: "List",
    route:"list"
  })
);

const pageLoader = (cmp:typeof Component) => {
  const id = router.getPath();
  let page = main.findItem(id) as Component | undefined;
  if(!page) {
    page = new cmp;
    page.id = id;

    main.items.add(page);
  }

  page.show();

  return page;
}

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
    pageLoader(PlaygroundTablePanel);
  })
  .add(/^window$/, () => {
    pageLoader(Window);
  })
  .add(/^list$/, () => {
    pageLoader(List);
  })
  .add(() => {
    main.items.get(0).show();
  })
  .start()
  .then(() => {
    root.cls = 'hbox';
    root.items.add(mainMenu, splitter({
      resizeComponentPredicate: mainMenu
    }), main);
  });
