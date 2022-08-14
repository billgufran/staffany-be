import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { BaseTimestamp } from "./baseTimestamp";
import Shift from "./shift";

@Entity()
export default class Week extends BaseTimestamp {
  @PrimaryColumn()
  id: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  publishedDate: string;

  @Column({
    nullable: true,
    default: false,
  })
  isPublished: boolean;

  @OneToMany(() => Shift, (shift) => shift.week)
  shifts: Shift[];
}
