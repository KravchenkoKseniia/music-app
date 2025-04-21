import type {Meta, StoryObj} from '@storybook/react';
import {NotificationElement} from '../components/NotificationElement/NotificationElement';



const meta: Meta<typeof NotificationElement> = {
    component: NotificationElement,
    tags: ['autodocs'],
    args: {
        message: 'Some message is here',
        level: 'info'
    },
    title: 'Example/Notification',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
    args: {
        message: 'Some message is here',
        level: 'error'
    }
};

export const Info: Story = {
    args: {
        message: 'Some message is here',
        level: 'info'
    }
};

export const Warning: Story = {
    args: {
        message: 'Some message is here',
        level: 'warning'
    }
};

export const Success: Story = {
    args: {
        message: 'Some message is here',
        level: 'success'
    }
};