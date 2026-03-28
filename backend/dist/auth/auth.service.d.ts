import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userModel;
    private readonly userService;
    private readonly jwtService;
    private readonly config;
    constructor(userModel: Model<UserDocument>, userService: UserService, jwtService: JwtService, config: ConfigService);
    register(user: any): Promise<{
        user: {
            name: any;
            email: any;
        };
        message: string;
    }>;
    login(user: any, res: any): Promise<{
        message: string;
        user: {
            email: string;
            role: string;
            userId: import("mongoose").Types.ObjectId;
            name: string;
        };
    }>;
    setCookies(payload: any, res: any): void;
    refresh(req: any, res: any): Promise<{
        message: string;
    }>;
    logout(res: any): {
        message: string;
    };
    validateUser(googleUser: any, res: any): Promise<{
        message: string;
        user: {
            email: string;
            role: string;
            userId: import("mongoose").Types.ObjectId;
            name: string;
        };
    }>;
}
