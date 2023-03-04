import { Injectable ,UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ApiService } from "../api.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private apiService: ApiService,
    ) {
        super({
            secretOrKey : "rahasia",
            usernameField:'email',
            passwordField: 'password'
        });
    }
    async validate(username:string,password:string,payload:any):Promise<any>{
        const data = await this.apiService.validateUser(username,password);
        if(!data){
            throw new UnauthorizedException()
        }
        return data;
    }
    
}