import { Migration } from '@mikro-orm/migrations';

export class Migration20240110161546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `photo` add `link_resource` varchar(255) not null;');
    this.addSql('alter table `photo` modify `title` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `photo` modify `title` varchar(255) not null;');
    this.addSql('alter table `photo` drop `link_resource`;');
  }

}
