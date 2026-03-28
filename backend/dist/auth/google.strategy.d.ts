import { Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(config: ConfigService);
    validate(_: string, __: string, profile: Profile): Promise<{
        googleId: any;
        email: any;
        name: any;
        avatar: any;
    }>;
}
export {};
