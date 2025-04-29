import type {Meta, StoryObj} from '@storybook/react';

import {SearchInput} from '../components/SearchInput/SearchInput';

const meta: Meta<typeof SearchInput> = {
    component: SearchInput,
    title: 'Example/SearchInput',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};