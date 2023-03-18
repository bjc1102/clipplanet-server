import expire from 'src/utils/getExpires';

interface CookieOptions {
  expires: Date;
  sameSite: 'none';
  secure: boolean;
  domain: string;
}

const cookieCommonOptions = (
  tokenName: 'refresh-token' | 'token',
): CookieOptions => ({
  expires: expire(tokenName),
  sameSite: 'none',
  secure: process.env.NODE_ENV === 'production',
  domain: '.clip-planet.site',
});

export default cookieCommonOptions;
