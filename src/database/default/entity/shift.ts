import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Exclusion,
} from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";
import Week from "./week";

@Entity()
@Exclusion(
  "clash_shift_constraint",
  `USING gist (tsrange("startTime", "endTime", '()'::text) WITH &&)`
)
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
    type: "timestamp",
  })
  startTime: string;

  @Column({
    type: "timestamp",
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
  @JoinColumn({ name: "weekId" })
  week: Week;
}
