import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {PageItem, Pagination} from '../components/Pagination/Pagination';


const PaginationDemo = () => {
    return <Pagination>
        <>
            <PageItem isActive={true}>1</PageItem>
            <PageItem isActive={false}>2</PageItem>
            <PageItem isActive={false}>3</PageItem>
        </>
    </Pagination>;
};

const meta: Meta<typeof Pagination> = {
    component: PaginationDemo,
    tags: ['autodocs'],
    title: 'Example/Pagination',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};