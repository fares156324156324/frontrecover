import { Pagination } from "ngx-easy-table";

export class User {
  public id?: string;
  public username?: string;
  public email: string;

  constructor (input: any) {
    if (input.id) {
      this.id = input.id;
    }

    this.email = input.email;
    this.username = input.username;

  }

  getFullName() {
    return `${this.username}`.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  prepareFilterSearch(pagination: Pagination, globalFilter?: string) {
    const filter: any = this.getFilter(globalFilter);
    filter.limit = pagination.limit;
    filter.page = pagination.offset;
    return filter;
  }

  getFilter(globalFilter?: string) {
    const filter: any = {};
    return filter;
  }
}
