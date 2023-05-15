import { Migration } from '@mikro-orm/migrations';

export class Migration20230330130709 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `photo` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `path` varchar(255) not null, `type` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `department_employees` (`department_id` int unsigned not null, `employee_id` int unsigned not null, primary key (`department_id`, `employee_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `department_employees` add index `department_employees_department_id_index`(`department_id`);');
    this.addSql('alter table `department_employees` add index `department_employees_employee_id_index`(`employee_id`);');

    this.addSql('alter table `department_employees` add constraint `department_employees_department_id_foreign` foreign key (`department_id`) references `department` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `department_employees` add constraint `department_employees_employee_id_foreign` foreign key (`employee_id`) references `employee` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `employee` add `photo_id` int unsigned null, add `works_since` int null;');
    this.addSql('alter table `employee` add constraint `employee_photo_id_foreign` foreign key (`photo_id`) references `photo` (`id`) on update cascade on delete set null;');
    this.addSql('alter table `employee` change `photo` `description` varchar(255) null;');
    this.addSql('alter table `employee` add unique `employee_photo_id_unique`(`photo_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `employee` drop foreign key `employee_photo_id_foreign`;');

    this.addSql('drop table if exists `photo`;');

    this.addSql('drop table if exists `department_employees`;');

    this.addSql('alter table `employee` drop index `employee_photo_id_unique`;');
    this.addSql('alter table `employee` drop `photo_id`;');
    this.addSql('alter table `employee` drop `works_since`;');
    this.addSql('alter table `employee` change `description` `photo` varchar(255) null;');
  }

}
