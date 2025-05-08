import { DEFAULT_PAGE_SIZE } from 'src/constants/contants';

export interface PaginatedResult<T> {
  rows: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
  transformRows?: (rows: any[]) => any[];
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage =
      Number(options?.perPage || defaultOptions?.perPage) || DEFAULT_PAGE_SIZE;
    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, rows] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);
    const meta = {
      total,
      lastPage,
      currentPage: page,
      perPage,
    };

    if (options?.transformRows) {
      return {
        rows: options.transformRows(rows),
        meta,
      };
    }

    return {
      rows,
      meta,
    };
  };
};

export const paginate: PaginateFunction = paginator({
  perPage: DEFAULT_PAGE_SIZE,
});
