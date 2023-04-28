# Node Module CLI

**[Node.js](https://nodejs.org/) ECMAScript class-based module and command-line interface (CLI) template starting point**

## Installation and demo

- Install [nvm](https://github.com/nvm-sh/nvm)
- [Download the zip](https://github.com/mhulse/node-module-cli/archive/refs/heads/main.zip)
- Decompress anywhere on your computer and `cd` to the root
- Install dependencies `npm i`

### Run using npm

- Execute `npm start` to see the output

### Run using CLI

- Create a development-only/temporary globally-installed symbolic link `npm link` (use `npm unlink` to uninstall)
- Execute `nmcli` to see the output

## Local deveopment

Using this repository as a starting point …

## Create a `README.md`

```bash
echo "# My cool node thingy!" > README.md
```

## Edit [`package.json`](package.json)

Add a `name`:

```json
"name": "changeme"
```

… and provide your own CLI command name:

```json
"bin": {
  "changeme": "app/cli.js"
},
```

Enter values for all other keys (only `name` and `version` fields are required).

## Start writing code

The module’s entrypoint is [`app/index.js`](app/index.js). Use this as a starting point, or feel free to wipe everything and start fresh … The existing code is for demo purposes only.

## About the code

I wanted to have the option of passing params via `import` **AND** method invocation:

```js
const genericModule = GenericModule({
  red: "black",
  green: "purple",
})

// ... and later:

let result = await genericModule({
  orange: "blue",
}).run()
```

Alternatively:

```js
const genericModule = GenericModule({
  // Options can be passed here:
  red: 'black',
  green: 'purple',
})();

// ... and later:

let result = await genericModule.run();
```

## Publishing package to npm (optional)

Set your npm author info:

```bash
$ npm set init.author.name 'Your Name'
$ npm set init.author.email 'you@example.com'
$ npm set init.author.url 'http://yourblog.com'
$ npm adduser
```

Next, bump version number in [`package.json`](package.json) and publish on npm:

```
$ npm publish
```

## License

Copyright © 2023 Michael Hulse

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
