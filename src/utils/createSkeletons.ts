/**
 * Generates an array of partial objects to be used as skeletons.
 * T is the model type (e.g., Event, Dining, or Accommodation).
 */
export type Skeleton = {
  isSkeleton: boolean;
  id: string;
};

export default function createSkeletons(count: number): Skeleton[] {
  return Array.from({ length: count }, (_, index) => ({
    isSkeleton: true,
    id: `skeleton-${index}`,
  }));
}
