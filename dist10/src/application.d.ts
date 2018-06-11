import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { Booter, Binding } from '@loopback/boot';
import { juggler, Repository, Class } from '@loopback/repository';
declare const MattePistachioApiApplication_base: (new (...args: any[]) => {
    [x: string]: any;
    projectRoot: string;
    bootOptions?: import("../node_modules/@loopback/boot/dist8/src/interfaces").BootOptions | undefined;
    boot(): Promise<void>;
    booters(...booterCls: import("../node_modules/@loopback/context/dist8/src/value-promise").Constructor<Booter>[]): Binding<any>[];
    component(component: import("../node_modules/@loopback/context/dist8/src/value-promise").Constructor<{}>): void;
    mountComponentBooters(component: import("../node_modules/@loopback/context/dist8/src/value-promise").Constructor<{}>): void;
}) & (new (...args: any[]) => {
    [x: string]: any;
    repository(repo: Class<Repository<any>>): void;
    getRepository<R extends Repository<any>>(repo: Class<R>): Promise<R>;
    dataSource(dataSource: juggler.DataSource, name?: string | undefined): void;
    component(component: Class<{}>): void;
    mountComponentRepository(component: Class<{}>): void;
}) & typeof RestApplication;
export declare class MattePistachioApiApplication extends MattePistachioApiApplication_base {
    constructor(options?: ApplicationConfig);
    start(): Promise<void>;
}
export {};