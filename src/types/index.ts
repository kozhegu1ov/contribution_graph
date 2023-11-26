export type DatesContributions = {
  [key: string]: string | number;
} | null;

export interface IPrevDates {
  id: number;
  date: string;
  contribution: number;
}
