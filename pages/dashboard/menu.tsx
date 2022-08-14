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

const Menu: NextPage = () => {
    const [categories, setCategories] = useState<any>([]);
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
    const [items, setItems] = useState(['1', '2', '3']);
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
                <DndContext
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
                            <SortableItem key={id} id={id} />
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? <Item id={activeId} /> : null}
                    </DragOverlay>
                </DndContext>
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
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }
}

export default Menu