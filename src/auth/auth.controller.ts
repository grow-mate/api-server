import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/sign-up-request-dto';
import { SignInRequestDto } from './dto/sign-in-request-dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpResponseDto } from './dto/sign-up-response-dto';
import { SignInResponseDto } from './dto/sign-in-response-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: '회원가입 API' })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SignUpResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpRequestDto) {
    return this.authService.signUp({
      email: signUpDto.email,
      username: signUpDto.username,
      password: signUpDto.password,
    });
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 성공 시, access token을 발급합니다.',
  })
  @ApiOkResponse({ description: '로그인 성공', type: SignInResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInRequestDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth()
  @ApiTags('Auth')
  @ApiOperation({
    summary: '프로필 조회 API',
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
