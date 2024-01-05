import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { PostItItemsEntity } from './PostItItemsEntity';

@Entity({ name: "users" })
export class UsersEntity extends BaseEntity {
    @PrimaryColumn("uuid")
    uid!: string;

    @Column()
    username!: string;

    @Column()
    password?: string;

    @Column({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(type => PostItItemsEntity, postItItem => postItItem.user)
    postItItems!: PostItItemsEntity[];

    @BeforeInsert()
    private beforeInsert() {
        this.uid = this.uid ? this.uid : uuid();
        this.createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this.updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}