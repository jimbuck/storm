
export interface IScorable
{
  score: number;
}

export interface IRecord extends IScorable
{
  id: number;
  iteration: number;
  success: boolean;
  params: any;
  result: any;
  time: Date;
}