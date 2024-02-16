import { Migration } from '@mikro-orm/migrations';

export class Migration20230614225605 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `direction` (`id` int unsigned not null auto_increment primary key, `number` varchar(255) not null, `type` varchar(255) not null, `name` varchar(255) not null, `features` json not null, `profiles` json not null, `forms` json not null, `price` int not null, `exams` json not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('create table `faq` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `first_name` varchar(255) not null, `middle_name` varchar(255) not null, `last_name` varchar(255) not null, `email` varchar(255) not null, `question` varchar(255) not null, `answer` varchar(255) null, `respondent` varchar(255) null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `photo` add `created_at` datetime not null default now();');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `direction`;');
    this.addSql('drop table if exists `faq`;');
    this.addSql('alter table `photo` drop `created_at`;');
  }

}
