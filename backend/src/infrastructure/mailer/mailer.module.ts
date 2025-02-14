import { Module } from "@nestjs/common";
import { TikeeMailerRepository } from "./mailer-tikee";
import { MailerRepository } from "src/application/Common/interfaces/mailer.repository";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { IHttpService } from "../Common/Http/IHttpService";
import { HttpService } from "../Common/Http/HttpService";

@Module({
 imports: [
   ConfigModule,
 ],
 providers: [
   {
     provide: MailerRepository,
     useClass: TikeeMailerRepository,
   },
   {
     provide: IHttpService,
     useClass: HttpService,
   },
   TikeeMailerRepository 
 ],
 exports: [MailerRepository, TikeeMailerRepository]
})
export class MailerModule {}