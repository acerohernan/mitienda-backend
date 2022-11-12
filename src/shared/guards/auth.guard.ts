import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const bearer = request.headers['authorization'];

    if (!bearer)
      throw new UnauthorizedException('You need to authenticate yourself');

    const token = bearer.split(' ')[1];

    try {
      const decode: any = jwt.verify(token, process.env.JWT_SECRET);
      const payload = {
        user_id: decode['sub'],
        store_id: decode['store'],
      };
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('You token is invalid');
    }

    return true;
  }
}
