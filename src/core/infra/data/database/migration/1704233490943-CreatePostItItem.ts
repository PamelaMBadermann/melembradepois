import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostItItems1704233490943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "postItItems",
                columns: [
                    {
                        name: "uid",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "title",
                        type: "varchar(50)",
                    },
                    {
                        name: "description",
                        type: "varchar(250)"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("postItItems");
    }

}
