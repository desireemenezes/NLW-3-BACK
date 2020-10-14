import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOng1602618325212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // realiza alterações no banco ** cria tabela - deleta - altera
        await queryRunner.createTable(new Table({
            name: 'ongs',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar'

                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // desfaz metodo up
        await queryRunner.dropTable('ongs')
    }

}
