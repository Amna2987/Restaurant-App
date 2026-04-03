"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const user_service_1 = require("../user/user.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    userModel;
    userService;
    jwtService;
    config;
    constructor(userModel, userService, jwtService, config) {
        this.userModel = userModel;
        this.userService = userService;
        this.jwtService = jwtService;
        this.config = config;
    }
    async register(user) {
        console.log('service', user);
        if (user.name == '' || user.email == '' || user.password == '' || user.confirmPassword == '') {
            throw new common_1.BadRequestException('All fields are required');
        }
        const existingUser = await this.userService.findUser(user.email);
        if (existingUser)
            throw new common_1.BadRequestException('User already exist');
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userService.createUser({
            name: user.name,
            email: user.email,
            password: hashPassword,
        });
        return { user: { name: user.name, email: user.email }, message: 'User registered successfully' };
    }
    async login(user, res) {
        console.log('login service', user);
        if (user.email == '' || user.password == '') {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        const loginUser = await this.userService.findUser(user.email);
        if (!loginUser)
            throw new common_1.UnauthorizedException('Invalid Credentials');
        const isMatched = await bcrypt.compare(user.password, loginUser.password);
        console.log('user find', loginUser, isMatched);
        if (!isMatched)
            throw new common_1.BadRequestException('Invalid Credentials');
        const payload = {
            userId: loginUser._id,
            email: loginUser.email,
            role: loginUser.role,
            name: loginUser.name
        };
        await this.setCookies(payload, res);
        return { message: 'User loggedin successfully', user: {
                email: loginUser.email,
                role: loginUser.role,
                userId: loginUser._id,
                name: loginUser.name,
            }, };
    }
    setCookies(payload, res) {
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES'),
        });
        const isProd = this.config.getOrThrow('NODE_ENV') === 'production';
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: isProd,
            maxAge: 15 * 60 * 1000,
            path: '/',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }
    async refresh(req, res) {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('No refresh token');
        }
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            res.clearCookie('access_token', { path: '/' });
            res.clearCookie('refresh_token', { path: '/' });
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const newAccessToken = this.jwtService.sign({
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
            name: payload.name
        });
        const isProd = this.config.getOrThrow('NODE_ENV') === 'production';
        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
            maxAge: 15 * 60 * 1000,
        });
        return { message: 'Access token refreshed' };
    }
    logout(res) {
        const isProd = this.config.getOrThrow('NODE_ENV') === 'production';
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
        });
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
        });
        return { message: 'Logged out successfully' };
    }
    async validateUser(googleUser, res) {
        console.log('vali user', googleUser);
        let user = await this.userModel.findOne({ googleId: googleUser.googleId });
        console.log('vali user', user);
        if (!user) {
            user = await this.userModel.create(googleUser);
        }
        console.log('vali user 2', user);
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        };
        await this.setCookies(payload, res);
        return { message: 'User loggedin successfully with google', user: {
                email: user.email,
                role: user.role,
                userId: user._id,
                name: user.name
            }, };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map