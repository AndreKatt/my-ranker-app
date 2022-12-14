import { 
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestAuth } from './types';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
	private readonly logger = new Logger(ControllerAuthGuard.name);
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request: RequestAuth = context.switchToHttp().getRequest();

		this.logger.debug(`Checken for auth token on requestt body`, request.body);

		const { accessToken } = request.body;

		try {
			const payload = this.jwtService.verify(accessToken);
			// append user and poll to socket
			request.userID = payload.sub;
			request.pollID = payload.pollID;
			request.name = payload.name;
			return true;
		} catch {
			throw new ForbiddenException('Invalid authorisation token');
		}
	}
}