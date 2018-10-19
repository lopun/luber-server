import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;
  @Column({ type: "double precision", default: 0 })
  lat: number;
  @Column({ type: "double precision", default: 0 })
  lng: number;
  @Column({ type: "text" })
  address: string;
  @Column({ type: "boolean", default: false })
  isFav: boolean;

  // typeORM에서 자체적으로 제공하는 기능이다. 원래 place같은곳에서 user의 정보를 얻고싶으면
  // Place.findOne({id: ...}, {relations: "user"})이런식으로 해야했지만 (typeORM은 relation들을 자동으로 넣어주지 않는다.)
  // userId라는 이름으로 넣어주게 되면 자동으로 userId라는 필드를 불러올 수 있게 된다.
  // 고로 쓸데없는 user의 모든 필드들을 가져올 필요가 없어지는것!
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.places)
  user: User;

  @CreateDateColumn()
  createdAt: string;
  @CreateDateColumn()
  updatedAt: string;
}

export default Place;
