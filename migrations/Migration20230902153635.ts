import { Migration } from '@mikro-orm/migrations';

export class Migration20230902153635 extends Migration {

  async up(): Promise<void> {

    this.addSql('alter table `department` add `address` varchar(255) not null, add `phones` json not null, add `email` varchar(255) not null;');
  }

  async down(): Promise<void> {

    this.addSql('alter table `department` drop `address`;');
    this.addSql('alter table `department` drop `phones`;');
    this.addSql('alter table `department` drop `email`;');
  }

}
