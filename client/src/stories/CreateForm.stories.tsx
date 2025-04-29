import type {Meta, StoryObj} from '@storybook/react';

import {CreateForm} from '../components/CreateForm/CreateForm';

const meta: Meta<typeof CreateForm> = {
    component: CreateForm,
    title: 'Example/CreateForm',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};