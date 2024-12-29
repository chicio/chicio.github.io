type TransientProps<T> = {
  [K in keyof T as `$${K}`]: T[K];
};
