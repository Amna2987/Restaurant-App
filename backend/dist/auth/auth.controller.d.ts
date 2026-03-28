import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    register(dto: registerDto): Promise<{
        user: {
            name: any;
            email: any;
        };
        message: string;
    }>;
    login(dto: loginDto, res: any): Promise<{
        message: string;
        user: {
            email: string;
            role: string;
            userId: import("mongoose").Types.ObjectId;
            name: string;
        };
    }>;
    refresh(req: any, res: any): Promise<{
        message: string;
    }>;
    logout(res: any): {
        message: string;
    };
    googleAuth(): Promise<void>;
    googleCallback(req: any, res: Response): Promise<void>;
    me(req: any): any;
}
