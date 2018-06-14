"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const sequence_1 = require("./sequence");
/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const user_repository_1 = require("./repositories/user.repository");
/* tslint:enable:no-unused-variable */
class MattePistachioApiApplication extends boot_1.BootMixin(repository_1.RepositoryMixin(rest_1.RestApplication)) {
    constructor(options) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        var databaseName = null;
        var databasePassword = 'HorcruX8!';
        var databaseUsername = 'root';
        if (environment == 'lawrence') {
            databaseName = 'gthread123';
        }
        if (environment == 'jeff') {
            databaseName = 'hello';
        }
        var environment = process.env.NODE_ENV;
        var dataSourceConfig = new repository_1.juggler.DataSource({
            name: 'db',
            connector: 'loopback-connector-mysql',
            host: 'localhost',
            port: 3306,
            database: databaseName,
            user: databaseUsername,
            password: databasePassword
        });
        this.dataSource(dataSourceConfig);
        this.repository(user_repository_1.UserRepository);
    }
    async start() {
        await super.start();
        const server = await this.getServer(rest_1.RestServer);
        const port = await server.get(rest_1.RestBindings.PORT);
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Try http://127.0.0.1:${port}/ping`);
    }
}
exports.MattePistachioApiApplication = MattePistachioApiApplication;
//# sourceMappingURL=application.js.map