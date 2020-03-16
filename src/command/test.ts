import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import * as childProcess from 'child_process';

interface Options extends JsonObject {
    command: string;
    args: string[];
}

export default createBuilder(( options: Options, context: BuilderContext ): Promise<BuilderOutput> => {
    const child = childProcess.spawn(options.command, options.args);

    context.reportStatus(`Executing "${options.command}"...`);

    child.stdout.on('data', data => {
        context.logger.info(data.toString());
    });
    child.stderr.on('data', data => {
        context.logger.error(data.toString());
    });

    return new Promise(resolve => {
        context.reportStatus(`Done.`);
        child.on('close', code => {
            resolve({success: code === 0});
        });
    });
});
