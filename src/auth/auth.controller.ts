/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtPayload, UserDetails } from 'src/utils/types';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  // /api/auth/google/login
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    //@ts-ignore
    const payload: JwtPayload = { email: req.user.email };
    const { accessToken, refreshToken } = this.AuthService.getToken(payload);

    const user = await this.AuthService.validateUser({
      //@ts-ignore
      ...req.user,
      refreshToken,
    } as UserDetails);

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    res.redirect(process.env.DOMAIN);
  }

  // api/auth/refresh
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { refreshToken, email } = req.user as JwtPayload;

    console.log(refreshToken, email);

    // const user = await this.AuthService.findByRefreshToken(email, refreshToken);
    // const token = this.AuthService.getToken({ email });
    // await this.AuthService.updateRefreshToken(user, token.refreshToken);

    // res.cookie('access-token', token.accessToken);
    // res.cookie('refresh-token', token.refreshToken);

    // res.redirect(process.env.DOMAIN);

    return 'hello';
  }
}