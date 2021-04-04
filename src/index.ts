// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as ts from 'typescript/lib/tsserverlibrary';
import { ReactGoToDefinitionPlugin } from './plugin';

export = (mod: { typescript: typeof ts }) =>
    new ReactGoToDefinitionPlugin(mod.typescript);
