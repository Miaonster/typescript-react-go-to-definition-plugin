Typescript React Go To Definition Plugin
===

## Feature

* Remove react definition of arrow function

## Before

![before](./document/before.jpg)

## After

![before](./document/after.png)

## Usage

Instal VSCode extension

## Purpose

Due to this [issue](https://github.com/microsoft/TypeScript/issues/37816), Cmd+click of JSX component will show 2 definitions. One of the definition is `FunctionComponent` of react. This behavior is not desired. So let's remove that definition, just remain the correct one.