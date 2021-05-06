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
        "remove": ["**/node_modules/**/*"],
        "forceRemove": ["**/*.scss.d.ts"],
      }
    ]
  }
}
```


Or use `file` and `definition` in each rule
```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-react-go-to-definition-plugin",
        "remove": [
          {
            "file": "**/src/**/*",
            "definition": "**/node_modules/**/*"
          }
        ],
        "forceRemove": [
          {
            "file": "**/src/**/*",
            "definition": "**/*.scss.d.ts"
          }
        ],
      }
    ]
  }
}
```

### Options

* `remove`
  * Default: `["**/node_modules/@types/react/index.d.ts"]`
  * Type: Array of `Rule`
  * Description: If mulitple definitions exist and one of the definitions matches any `Rule`, remove that definiton.

* `forceRemove`
  * Default: `[]`
  * Type: Array of `Rule`
  * Description: If one of the definitions matches any `Rule`, remove that definiton.

### Rule

Rule is a string of glob pattern or `{ file, definition }`

* `file` is a string of glob pattern which matches the file path you're coding
* `definition` is a string of glob pattern which matches the paht of deifnition file.

And see [minimatch](https://github.com/isaacs/minimatch) for more details of glob pattern.


## Purpose

Due to this [issue](https://github.com/microsoft/TypeScript/issues/37816), Cmd+click of JSX component will show 2 definitions. One of the definition is `FunctionComponent` of react. This behavior is not desired. So let's remove that definition, just remain the correct one.
