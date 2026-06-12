import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="glass-panel p-6 mb-4 rounded-xl cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-[var(--color-neon-blue)] transition-colors flex items-center justify-between"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{content.title}</h3>
        <p className="text-gray-300">{content.desc}</p>
      </div>
      <div className="text-[var(--color-neon-blue)] text-3xl opacity-50 ml-4">
        ☰
      </div>
    </div>
  );
};

export default function Resume() {
  const [items, setItems] = useState([
    { id: '1', title: 'Experience', desc: 'AI Intern at Internship Studio. Implemented Face Recognition System using PCA & ANN.' },
    { id: '2', title: 'Hackathons', desc: 'Top 3 at Regalia 2026 (Built ANONYMI) & Top 15 at MEGA HACKATHON 2026 (Built UnitySOS).' },
    { id: '3', title: 'Certifications', desc: 'Google Gemini Certified, Google Cloud ADK Skill Badge, & Python Certified.' },
    { id: '4', title: 'Community', desc: 'Member of the Google Cloud and NVIDIA community program.' },
    { id: '5', title: 'Education', desc: 'B.Tech in AI/ML - Expected 2029' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section className="py-20 px-8 w-full min-h-screen flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h2 className="text-4xl font-bold font-mono text-[var(--color-neon-blue)] mb-6 text-center">
          Interactive Resume
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Drag and drop the puzzle pieces to rearrange my resume!
        </p>
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item} />
            ))}
          </SortableContext>
        </DndContext>

        <div className="mt-12 text-center">
          <a href="#" className="px-8 py-3 bg-[var(--color-neon-blue)] text-black font-bold rounded-full hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] inline-block">
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
