import React from 'react'
import * as Accordion from '@boopoom/accordion'
import { useArgs } from 'storybook/preview-api'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'multi-select',
      options: ['React', 'Solid', 'Vue', 'Svelte'],
    },
    defaultValue: {},
    onValueChange: {},
  },
  args: {
    value: ['React'],
  },
} satisfies Meta<typeof Accordion.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleValueChange = (newValue: (string | number)[]) => {
      updateArgs({ value: newValue })
      args.onValueChange?.(newValue)
    }

    return (
      <Accordion.Root {...args} value={value} onValueChange={handleValueChange}>
        {['React', 'Solid', 'Vue', 'Svelte'].map((item) => [
          <Accordion.Item key={item} value={item}>
            <Accordion.ItemTrigger>
              {item}
              <Accordion.ItemIndicator>ItemIndicator</Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemPanel>{item} Panel</Accordion.ItemPanel>
          </Accordion.Item>,
        ])}
      </Accordion.Root>
    )
  },
}
