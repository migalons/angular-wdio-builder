import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema, logging } from '@angular-devkit/core';
import { join } from 'path';

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

});
