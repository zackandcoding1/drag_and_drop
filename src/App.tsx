import { useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { Column } from './Column';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';

const COLUMNS: ColumnType[] = [
  { id: 'AVAILABLE', title: 'Disponível' },
  { id: 'UNAVAILABLE', title: 'Indisponível' },
  { id: 'CHECKING', title: 'Verificar' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'PC-01',
    description: 'IPv4:  192.168.56.1',
    status: 'AVAILABLE',
  },
  {
    id: '2',
    title: 'PC-02',
    description: 'IPv4:  192.168.56.2',
    status: 'AVAILABLE',
  },
  {
    id: '3',
    title: 'PC-03',
    description: 'IPv4:  192.168.56.3',
    status: 'CHECKING'
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map(task =>
        task.id === taskId
          ? {
            ...task,
            status: newStatus,
          }
          : task,
      )
    );
  }

  return <div className='p-4'>
    <div className='flex gap-8'>
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => {
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}
      </DndContext>
    </div>
  </div>;
}