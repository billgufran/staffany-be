export interface ICreateShift {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  isPublished: boolean;
}

export interface IUpdateShift {
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  weekId? : string;
  isPublished?: boolean;
}