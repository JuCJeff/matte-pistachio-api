"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findUser(jwt) {
        //Make endpoints secure
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
        //Find users
        return await this.userRepo.find();
    }
    async findUserById(id, jwt) {
        //Make endpoints secure
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
        //Check for valid ID
        let userExists = !!(await this.userRepo.count({ id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`Unfortunately user ID ${id} does not exist in our system.`);
        }
        //Find user by ID
        return await this.userRepo.findById(id);
    }
    //Passing user information EXAMPLE
    async getUserInformation(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            return jwtBody.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async updateProfile(body) {
        var update = body.user;
        var user = await this.userRepo.findById(update.id);
        let check = await bcrypt.compare(body.user.password, user.password);
        console.log(check);
        if (check) {
            user.firstname = update.firstname;
            user.lastname = update.lastname;
            user.email = update.email;
            user.username = update.username;
            user.phonenumber = update.phonenumber;
            user.id = update.id;
            if (body.newpassword.length > 0) {
                let newestpassword = await bcrypt.hash(body.newpassword, 10);
                user.password = newestpassword;
            }
            else {
                body.newpassword = user.password;
            }
            await this.userRepo.save(user);
            console.log("info updated");
            var jwt = jsonwebtoken_1.sign({
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    username: user.username,
                    phonenumber: user.phonenumber,
                },
                anything: "hello"
            }, 'shh', {
                issuer: 'auth.ix.co.za',
                audience: 'ix.co.za',
            });
            return {
                token: jwt
            };
        }
        else {
            throw new rest_1.HttpErrors.Unauthorized("password is invalid");
        }
    }
};
__decorate([
    rest_1.get('/user'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    rest_1.get('/user/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserById", null);
__decorate([
    rest_1.get('/me'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInformation", null);
__decorate([
    rest_1.put('/user/settings'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map