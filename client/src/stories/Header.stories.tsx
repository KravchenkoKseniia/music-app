import type {Meta, StoryObj} from '@storybook/react';

import {Header} from '../components/Header/Header';

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Example/Header',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};