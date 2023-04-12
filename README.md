# Group-Office User Interface documentation

This repository holds the source code for the GOUI documentation website.


## How to install locally

If you wish to contribute to the documentation of GOUI, please follow the instructions below. For the sake of completeness,
it is assumed that the goui-docs repository is installed in `~/src/goui-docs`.

- Clone the [GOUI](https://github.com/Intermesh/goui) repository into `~/src/goui`
- In `~src/goui`, install all npm dependencies: `npm install`;
- Build GOUI: `npm run build`
- Go to the GOUI docs repository `cd ~/src/goui-docs`
- Install npm dependencies: `npm install`
- Build the site `npm run build`
- Start the documentation site: `npm start`
- Open http://localhost:8081/ in the browser.

Now, you have a local running version of the GOUI documentation. Happy documenting!