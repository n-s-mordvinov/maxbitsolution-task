import type { ColumnDef } from "@tanstack/vue-table";
import type { Cinemas } from "~/types/cinemas";

import DataTableRowActions from './DataTableRowActions.vue'

export const columns: ColumnDef<Cinemas>[] = [
  {
    accessorKey: 'name',
    header: 'Кинотеатр',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('name')),
  },
  {
    accessorKey: 'address',
    header: 'Адрес',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('address')),
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]