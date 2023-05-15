import { Migration } from '@mikro-orm/migrations';

export class Migration20230214152226 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `full_name` varchar(255) null, add `roles` text not null;');
    this.addSql('alter table `user` drop `role`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` add `role` varchar(255) not null;');
    this.addSql('alter table `user` drop `full_name`;');
    this.addSql('alter table `user` drop `roles`;');
  }

}
