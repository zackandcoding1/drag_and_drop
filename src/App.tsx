import { useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { Column } from './Column';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done'},
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Projeto de Pesquisa',
    description: 'Coletar requisitos e criar documentação inicial',
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Criar componente biblioteca',
    status: 'TODO',
  },
  {
    id: '3',
    title: 'Integração de API',
    description: 'Implementar endpoints de API REST',
    status: 'IN_PROGRESS'
  }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  return <div className='p-4'>
    <div className='flex gap-8'>
      {COLUMNS.map((column) => {
        return (
          <Column 
            key={column.id} 
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        );
      })}
    </div>
  </div>;
}