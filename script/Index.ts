import {btn, cards, comp, Component, h2, menu, root, router, splitter} from "@intermesh/goui";
import {Button} from "./Button.js";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {Form} from "./Form.js";
import {Window} from "./Window.js";
import {List} from "./List.js";
import {Home} from "./Home.js";
import {NotFound} from "./NotFound.js";


/**
 * Create main card panel for displaying SPA pages
 */
const main = cards({cls: "main scroll", flex: 1});

const img = comp({tagName: "img", style: {width: "56px", height: "56px", padding: "0 8px 0 18px", verticalAlign: "middle"}});
img.el.setAttribute("src", "./resources/logo-blue-icon.svg");

/**
 * Create main menu
 */
const mainMenu = menu({cls: "main"},
  comp({
    cls: "hbox",
  }, img, h2({text:"GOUI", style: { padding: "0", margin: "0", alignSelf: "center"}})),
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

/**
 * To make it memory efficient we will instantiate page components on demand when the router navigates.
 * @param cmp
 */
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
    pageLoader(PlaygroundTablePanel);
  })
  .add(/^window$/, () => {
    pageLoader(Window);
  })
  .add(/^list$/, () => {
    pageLoader(List);
  })
  .add(() => {
    pageLoader(NotFound);
  })
  .start()
  .then(() => {
    /**
     * Use hbox layout to put menu and section side by side
     */
    root.cls = 'hbox';
    root.items.add(mainMenu, splitter({
      resizeComponentPredicate: mainMenu
    }), main);
  });
