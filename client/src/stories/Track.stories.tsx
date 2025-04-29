import type {Meta, StoryObj} from '@storybook/react';

import {Track} from '../components/Track/Track';

const meta: Meta<typeof Track> = {
    component: Track,
    title: 'Example/Track',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};