import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateEventPostDto {
  @IsUUID()
  @IsOptional() // DB保存時に生成する場合はOptional
  id?: string;

  @IsUUID()
  @IsNotEmpty()
  uid: string; // システムユーザー等のID

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  category: string; // スクレイピングで取れない場合はデフォルト値など

  @IsDate()
  @IsNotEmpty()
  postTime: Date;

  @IsDate()
  @IsNotEmpty()
  postLimit: Date; // 掲載期限（イベント開催日などから算出）

  @IsString()
  @IsOptional()
  place: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsUUID()
  @IsNotEmpty()
  chatRoomId: string; // 新規生成したUUIDを入れる
}
