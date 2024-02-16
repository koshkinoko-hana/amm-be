import { Migration } from '@mikro-orm/migrations';

export class Migration20230814102521 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `employee_department_position` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `employee_id` int unsigned not null, `position_id` int unsigned not null, `department_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `employee_department_position` add index `employee_department_position_employee_id_index`(`employee_id`);');
    this.addSql('alter table `employee_department_position` add index `employee_department_position_position_id_index`(`position_id`);');
    this.addSql('alter table `employee_department_position` add index `employee_department_position_department_id_index`(`department_id`);');

    this.addSql('alter table `employee_department_position` add constraint `employee_department_position_employee_id_foreign` foreign key (`employee_id`) references `employee` (`id`) on update cascade;');
    this.addSql('alter table `employee_department_position` add constraint `employee_department_position_position_id_foreign` foreign key (`position_id`) references `position` (`id`) on update cascade;');
    this.addSql('alter table `employee_department_position` add constraint `employee_department_position_department_id_foreign` foreign key (`department_id`) references `department` (`id`) on update cascade on delete set null;');

    this.addSql('drop table if exists `department_employees`;');

    this.addSql('drop table if exists `employee_positions`;');

    this.addSql('alter table `photo` modify `created_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('create table `department_employees` (`department_id` int unsigned not null, `employee_id` int unsigned not null, primary key (`department_id`, `employee_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `department_employees` add index `department_employees_department_id_index`(`department_id`);');
    this.addSql('alter table `department_employees` add index `department_employees_employee_id_index`(`employee_id`);');

    this.addSql('create table `employee_positions` (`employee_id` int unsigned not null, `position_id` int unsigned not null, primary key (`employee_id`, `position_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `employee_positions` add index `employee_positions_employee_id_index`(`employee_id`);');
    this.addSql('alter table `employee_positions` add index `employee_positions_position_id_index`(`position_id`);');

    this.addSql('alter table `department_employees` add constraint `department_employees_department_id_foreign` foreign key (`department_id`) references `department` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `department_employees` add constraint `department_employees_employee_id_foreign` foreign key (`employee_id`) references `employee` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `employee_positions` add constraint `employee_positions_employee_id_foreign` foreign key (`employee_id`) references `employee` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `employee_positions` add constraint `employee_positions_position_id_foreign` foreign key (`position_id`) references `position` (`id`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `employee_department_position`;');

    this.addSql('alter table `photo` modify `created_at` datetime not null default CURRENT_TIMESTAMP;');
  }

}
