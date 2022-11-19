import {
    BuilderContext,
    BuilderOutput,
    BuilderRun,
    createBuilder,
    targetFromTargetString
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
    devServerTarget: string;
    wdioConfig: string;
    wdioOptions: {};
    port: number;
    host: string;
    disableHostCheck: boolean;
}

export const runWdioTest =  async ( options: Options, context: BuilderContext ): Promise<BuilderOutput> => {
    if(!isWdioInstalled()) {
        context.logger.error("@wdio/cli not installed. Can not run command. Exiting.");
        context.reportStatus('Failed');
        return Promise.resolve({"success": false, "error": "@wdio/cli not installed. Can not run command. Exiting."})
    }

    let builderRun: BuilderRun | undefined;
    let builderOutput: BuilderOutput;
    if(options.devServerTarget) {
        const devServerTargetOptions: any = {port: options.port, host: options.host, disableHostCheck: options.disableHostCheck}
        Object.keys(devServerTargetOptions).forEach(key => devServerTargetOptions[key] === undefined && delete devServerTargetOptions[key])

        builderRun = await (context.scheduleTarget(targetFromTargetString(options.devServerTarget),devServerTargetOptions));
        builderOutput = await builderRun.result;
        if(!builderOutput.target) {
            return Promise.resolve({"success": false, "error": `${options.devServerTarget} failed. Can not run command. Exiting`})
        }
    }
    const Launcher = require('@wdio/cli').default;
    const wdio = new Launcher(options.wdioConfig, options.wdioOptions);

    return wdio.run().then((code: number) => {
        if (builderRun) process.exit(code);
        context.reportStatus(`Done.`);
        return { 'success': code === 0}
    }, (error: any) => {
        if (builderRun) process.exit(1);
        context.reportStatus(`Failed.`);
        context.logger.error('Launcher failed to start the test', error.stacktrace)
        return { 'success': false }
    })
}

export default createBuilder(runWdioTest);

function isWdioInstalled(): boolean {
    try {
        // @ts-ignore
        const Launcher = require('@wdio/cli').default;
        return true;
    } catch (err) {
        return false;
    }
}
