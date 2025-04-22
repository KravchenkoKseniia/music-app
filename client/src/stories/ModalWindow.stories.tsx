import type {Meta, StoryObj} from '@storybook/react';

import {ModalWindow} from '../components/ModalWindow/ModalWindow';

const meta: Meta<typeof ModalWindow> = {
    component: ModalWindow,
    title: 'Example/ModalWindow',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};