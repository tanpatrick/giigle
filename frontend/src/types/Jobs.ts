export type Job = {
  description: string;
  id: string;
  location: JobLocation;
  title: string;
};

export type JobLocation = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type JobsResponse = {
  items: Job[];
};
