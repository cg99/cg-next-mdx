import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import Draggable from 'react-draggable'
import { RiDeleteBin2Line } from 'react-icons/ri'
import Layout from '../../components/dashboard/Layout'
import { ICategory } from '../../utils/interface/ICategory'
import {
    closestCenter,
    DndContext,
    DragOverlay,
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

import { SortableItem } from '../../components/dashboard/draggable/SortableItem';
import { Item } from '../../components/dashboard/draggable/Item';

import { Draggable } from '../../components/dashboard/draggable/Draggable';
import DraggableList from 'react-draggable-lists'

const Menu: NextPage = () => {
    const [categories, setCategories] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
            setLoading(false);
        })();
    }, []);

    const deleteCategory = async (id: number) => {
        // delete from menu
        await axios.delete(`/api/menu/?id=${id}`);
        setCategories(categories.filter(category => category?._id !== id));
    }

    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <Layout>
            <h1>Menu</h1>
            <div>
                {/* <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={categories}
                        strategy={verticalListSortingStrategy}
                    >
                        {categories?.map((category, id) => (
                            <SortableItem key={id} id={id} category={category} />
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? <Item id={activeId} /> : null}
                    </DragOverlay>
                </DndContext> */}

                <div style={{ width: 300, margin: '0 auto' }}>
                    {categories && !loading && <DraggableList width={300} height={50} rowSize={1}>
                        {categories?.map((category, id) => (
                            <div key={category?._id} style={{ width: 300, height: 50, background: 'green' }}>
                                {category?.title}
                            </div>
                        ))}
                    </DraggableList>
                    }
                </div>
            </div>
        </Layout >
    )

    function handleDragStart(event) {
        const { active } = event;

        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCategories((categories) => {
                const oldIndex = categories.indexOf(active.id);
                const newIndex = categories.indexOf(over.id);

                return arrayMove(categories, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }
}

export default Menu