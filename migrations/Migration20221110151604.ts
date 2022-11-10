import { Migration } from '@mikro-orm/migrations';

export class Migration20221110151604 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `auditory` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `type` varchar(255) not null, `size` int not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `department` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `description` TEXT not null, `competencies` json not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `position` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `first_name` varchar(255) not null, `middle_name` varchar(255) not null, `last_name` varchar(255) not null, `photo` varchar(255) null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user_positions` (`user_id` int unsigned not null, `position_id` int unsigned not null, primary key (`user_id`, `position_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_positions` add index `user_positions_user_id_index`(`user_id`);');
    this.addSql('alter table `user_positions` add index `user_positions_position_id_index`(`position_id`);');

    this.addSql('alter table `user_positions` add constraint `user_positions_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `user_positions` add constraint `user_positions_position_id_foreign` foreign key (`position_id`) references `position` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user_positions` drop foreign key `user_positions_position_id_foreign`;');

    this.addSql('alter table `user_positions` drop foreign key `user_positions_user_id_foreign`;');

    this.addSql('drop table if exists `auditory`;');

    this.addSql('drop table if exists `department`;');

    this.addSql('drop table if exists `position`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `user_positions`;');
  }

}
