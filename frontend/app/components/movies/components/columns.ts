import type { ColumnDef } from "@tanstack/vue-table";
import type { Movie } from "~/types/movies";

import DataTableRowActions from './DataTableRowActions.vue'
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

const convertMinutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: 'title',
    header: 'Название',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('title')),
  },
  {
    accessorKey: 'lengthMinutes',
    header: 'Продолжительность',
    cell: ({ row }) => h('div', { class: 'capitalize' }, convertMinutesToTime(row.getValue('lengthMinutes'))),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Рейтинг', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('rating')),
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]