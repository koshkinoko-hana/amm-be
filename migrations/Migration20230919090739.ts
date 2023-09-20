import { Migration } from '@mikro-orm/migrations';

export class Migration20230919090739 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `album` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `description` text null, `date` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `photo` add `album_id` int unsigned null;');
    this.addSql('alter table `photo` add constraint `photo_album_id_foreign` foreign key (`album_id`) references `album` (`id`) on update cascade on delete set null;');
    this.addSql('alter table `photo` drop `photo_date`;');
    this.addSql('alter table `photo` add index `photo_album_id_index`(`album_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `photo` drop foreign key `photo_album_id_foreign`;');

    this.addSql('drop table if exists `album`;');

    this.addSql('alter table `photo` add `photo_date` datetime null;');
    this.addSql('alter table `photo` drop index `photo_album_id_index`;');
    this.addSql('alter table `photo` drop `album_id`;');
  }

}
