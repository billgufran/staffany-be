import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";
import Week from "./week";

@Entity()
export default class Shift extends BaseTimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "date",
  })
  date: string;

  @Column({
    type: "time",
  })
  startTime: string;

  @Column({
    type: "time",
  })
  endTime: string;

  @Column({
    nullable: true,
    default: false,
    name: "isPublished",
  })
  isPublished: boolean;

  // add column explicitly here
  @Column({
    nullable: true,
    name: "weekId",
  })
  weekId: string;

  @ManyToOne((type) => Week)
  @JoinColumn([
    { name: "weekId", referencedColumnName: "id" },
    // { name: "isPublished", referencedColumnName: "id" },
  ])
  week: Week;

  // @ManyToOne(() => Week, (week) => week.shifts)
  // week: Week;
}
