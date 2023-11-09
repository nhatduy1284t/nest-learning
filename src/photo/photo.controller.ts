import { Controller,Get } from '@nestjs/common';

@Controller('photo')
export class PhotoController {

    @Get()
    getUser() {
      return "Get photos";
    }
}
