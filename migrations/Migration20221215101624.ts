import { Migration } from '@mikro-orm/migrations';

export class Migration20221215101624 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `auditory` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `type` varchar(255) not null, `size` int not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `company` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `description` text not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `department` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `description` text null, `competencies` json not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `employee` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `first_name` varchar(255) not null, `middle_name` varchar(255) not null, `last_name` varchar(255) not null, `photo` varchar(255) null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `position` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `employee_positions` (`employee_id` int unsigned not null, `position_id` int unsigned not null, primary key (`employee_id`, `position_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `employee_positions` add index `employee_positions_employee_id_index`(`employee_id`);');
    this.addSql('alter table `employee_positions` add index `employee_positions_position_id_index`(`position_id`);');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `login` varchar(255) not null, `password_hash` varchar(255) not null, `role` varchar(255) not null, `status` varchar(255) not null, `company_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add index `user_company_id_index`(`company_id`);');

    this.addSql('alter table `employee_positions` add constraint `employee_positions_employee_id_foreign` foreign key (`employee_id`) references `employee` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `employee_positions` add constraint `employee_positions_position_id_foreign` foreign key (`position_id`) references `position` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `user` add constraint `user_company_id_foreign` foreign key (`company_id`) references `company` (`id`) on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop foreign key `user_company_id_foreign`;');

    this.addSql('alter table `employee_positions` drop foreign key `employee_positions_employee_id_foreign`;');

    this.addSql('alter table `employee_positions` drop foreign key `employee_positions_position_id_foreign`;');

    this.addSql('drop table if exists `auditory`;');

    this.addSql('drop table if exists `company`;');

    this.addSql('drop table if exists `department`;');

    this.addSql('drop table if exists `employee`;');

    this.addSql('drop table if exists `position`;');

    this.addSql('drop table if exists `employee_positions`;');

    this.addSql('drop table if exists `user`;');
  }

}
