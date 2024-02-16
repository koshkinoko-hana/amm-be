import { Migration } from '@mikro-orm/migrations';

export class Migration20230723121955 extends Migration {

  async up(): Promise<void> {

    this.addSql('alter table `department` add `head_id` int unsigned not null;');
    this.addSql('alter table `department` add constraint `department_head_id_foreign` foreign key (`head_id`) references `employee` (`id`) on update cascade;');
    this.addSql('alter table `department` add index `department_head_id_index`(`head_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `department` drop foreign key `department_head_id_foreign`;');

    this.addSql('alter table `department` drop index `department_head_id_index`;');
    this.addSql('alter table `department` drop `head_id`;');
  }

}
