import { Migration } from '@mikro-orm/migrations';

export class Migration20221117142739 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` modify `photo` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` modify `photo` varchar(255) not null;');
  }

}
