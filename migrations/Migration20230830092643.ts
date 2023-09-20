import { Migration } from '@mikro-orm/migrations';

export class Migration20230830092643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `photo` add `photo_date` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `photo` drop `photo_date`;');
  }

}
