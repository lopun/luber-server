import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  OneToOne
} from "typeorm";

import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @Column({ nullable: true })
  passengerId: number;

  @ManyToOne(type => User, user => user.chatsAsPassenger)
  passenger: User;

  @OneToOne(type => Ride, ride => ride.chat)
  ride: Ride;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne(type => User, user => user.chatsAsDriver)
  driver: User;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;
}

export default Chat;
