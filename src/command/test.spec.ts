import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema, logging } from '@angular-devkit/core';
import { join } from 'path';
import * as Module from 'module';

describe('Command Runner Builder', () => {
    let architect: Architect;
    let architectHost: TestingArchitectHost;
    let logger: logging.Logger;
    let logs: string[];

    beforeEach(async () => {
        const registry = new schema.CoreSchemaRegistry();
        registry.addPostTransform(schema.transforms.addUndefinedDefaults);

        // TestingArchitectHost() takes workspace and current directories.
        // Since we don't use those, both are the same in this case.
        architectHost = new TestingArchitectHost(__dirname, __dirname);
        architect = new Architect(architectHost, registry);

        // This will either take a Node package name, or a path to the directory
        // for the package.json file.
        await architectHost.addBuilderFromPackage(join(__dirname, '../..'));

        logger = new logging.Logger('');
        logs = [];
        logger.subscribe(ev => logs.push(ev.message));

    });

    it('raises an error when wdio is not installed', async () => {
        const run = await architect.scheduleBuilder('@migalons/angular-wdio-builder:test', {}, { logger });
        const output = await run.result;
        await run.stop();
        expect(output.success).toBe(false);
        expect(logs.toString()).toContain('@wdio/cli not installed');
    });

    describe('wdio version compatibility', () => {
        const originalLoad = (Module as any)._load;
        let launcherArgs: any[];

        function FakeLauncher(this: any, ...args: any[]) {
            launcherArgs = args;
            this.run = () => Promise.resolve(0);
        }

        function stubWdioCli(moduleShape: any) {
            (Module as any)._load = (request: string, parent: any, isMain: boolean) => {
                if (request === '@wdio/cli') {
                    return moduleShape;
                }
                return originalLoad.call(Module, request, parent, isMain);
            };
        }

        afterEach(() => {
            (Module as any)._load = originalLoad;
        });

        it('resolves the Launcher from a default export (wdio@7 CJS shape)', async () => {
            stubWdioCli({ default: FakeLauncher });

            const run = await architect.scheduleBuilder('@migalons/angular-wdio-builder:test', {}, { logger });
            const output = await run.result;
            await run.stop();

            expect(output.success).toBe(true);
            expect(launcherArgs.length).toBeGreaterThan(0);
        });

        it('resolves the Launcher from a named export (wdio@8.46+/@9 CJS shape)', async () => {
            stubWdioCli({ Launcher: FakeLauncher });

            const run = await architect.scheduleBuilder('@migalons/angular-wdio-builder:test', {}, { logger });
            const output = await run.result;
            await run.stop();

            expect(output.success).toBe(true);
            expect(launcherArgs.length).toBeGreaterThan(0);
        });
    });

});
