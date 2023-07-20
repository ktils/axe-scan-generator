"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingLibrary = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
function testingLibrary(_options) {
    return (_, _context) => {
        const sourceTemplates = schematics_1.url('./files');
        return applyWithOverwrite(sourceTemplates, [
            schematics_1.template(Object.assign(Object.assign({}, _options), core_1.strings)),
            schematics_1.move(core_1.normalize(_options.path)),
        ]);
    };
}
exports.testingLibrary = testingLibrary;
// https://stackoverflow.com/a/53230034
function applyWithOverwrite(source, rules) {
    return (tree, _context) => {
        const rule = schematics_1.mergeWith(schematics_1.apply(source, [
            ...rules,
            schematics_1.forEach((fileEntry) => {
                if (tree.exists(fileEntry.path)) {
                    tree.overwrite(fileEntry.path, fileEntry.content);
                    return null;
                }
                return fileEntry;
            }),
        ]));
        return rule(tree, _context);
    };
}
/*
example: https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * /
`;

export function testingLibraryComponent(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    (tree: Tree, _context: SchematicContext) => {
      tree.getDir(options.sourceDir).visit((filePath) => {
        if (!filePath.endsWith('.ts')) {
          return;
        }
        const content = tree.read(filePath);
        if (!content) {
          return;
        }

        // Prevent from writing license to files that already have one.
        if (content.indexOf(licenseText) == -1) {
          tree.overwrite(filePath, licenseText + content);
        }
      });
      return tree;
    },
  ]);
}
*/
//# sourceMappingURL=index.js.map