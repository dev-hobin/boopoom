import React from 'react'
import * as Accordion from '@boopoom/accordion'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Accordion.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: ['React', 'Solid', 'Vue', 'Svelte'].map((item) => [
      <Accordion.Item key={item} value={item}>
        <Accordion.ItemTrigger value={item}>
          {item}
          <Accordion.ItemIndicator asChild value={item}>
            ItemIndicator
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>
        <Accordion.ItemPanel value={item}>{item} Panel</Accordion.ItemPanel>
      </Accordion.Item>,
    ]),
  },
}
