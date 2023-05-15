import { Migration } from '@mikro-orm/migrations';

export class Migration20230515123311 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `news` (`slug` varchar(255) not null, `name` varchar(255) not null, `description` varchar(255) null, `article` text null, `photo_id` int unsigned null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`slug`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `news` add unique `news_photo_id_unique`(`photo_id`);');

    this.addSql('alter table `news` add constraint `news_photo_id_foreign` foreign key (`photo_id`) references `photo` (`id`) on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `news`;');
  }

}
