Typescript React Go To Definition Plugin
===

## Feature

* Remove react definition of arrow function

## Before

![before](https://raw.githubusercontent.com/Miaonster/typescript-react-go-to-definition-plugin/master/document/before.jpg)

## After

![before](https://raw.githubusercontent.com/Miaonster/typescript-react-go-to-definition-plugin/master/document/after.png)

## Usage

Instal [VSCode extension](https://marketplace.visualstudio.com/items?itemName=miaonster.vscode-tsx-arrow-definition) or just use it as a typscript server plugin

```
npm i typescript-react-go-to-definition-plugin
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-react-go-to-definition-plugin",
        "remove": ["**/node_modules/**/*"]
      }
    ]
  }
}
```

### Options

* `remove`
  * Default: `["**/node_modules/@types/react/index.d.ts"]`
  * Type: Array of glob pattern, see [minimatch](https://github.com/isaacs/minimatch) for more details
  * Description: If mulitple definitions exist and one of the definitions matches the glob pattern, remove that definiton.

* `forceRemove`
  * Default: `[]`
  * Type: Array of glob pattern, see [minimatch](https://github.com/isaacs/minimatch) for more details
  * Description: If one of the definitions matches the glob pattern, remove that definiton.

## Purpose

Due to this [issue](https://github.com/microsoft/TypeScript/issues/37816), Cmd+click of JSX component will show 2 definitions. One of the definition is `FunctionComponent` of react. This behavior is not desired. So let's remove that definition, just remain the correct one.
