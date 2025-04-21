import type {Meta, StoryObj} from '@storybook/react';

import {Sort} from '../components/Sort/Sort';

const meta: Meta<typeof Sort> = {
    component: Sort,
    title: 'Example/Sort',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};