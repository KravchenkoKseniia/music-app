import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../components/Button/Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Example/Button',
    tags: ['autodocs'],
    argTypes: {
        onClick: {action: 'clicked'},
        type: {
            options: ['default', 'inverse'],
            control: {type: 'select'},
        },
        title: {
            control: {type: 'text'},
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'Button',
        type: 'default',
    },
};

export const Inverse: Story = {
    args: {
        title: 'Button',
        type: 'inverse',
    },
};