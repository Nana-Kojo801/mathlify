import { useActions } from '@/components/game-modes/flow-game/flow-game-store'
import { Button } from '@/components/ui/button'
import { useAppForm } from '@/hooks/form'
import { useNavigate } from '@tanstack/react-router'
import { Play } from 'lucide-react'
import { z } from 'zod'

export const flowSettingsSchema = z.object({
  range: z
    .object({
      min: z.coerce.number().positive(),
      max: z.coerce.number().positive(),
    })
    .refine((data) => data.max > data.min, {
      message: 'Max must be greater than min',
    }),
  quantity: z
    .object({
      min: z.coerce.number().gte(3),
      max: z.coerce.number().gt(3),
    })
    .refine((data) => data.max > data.min, {
      message: 'Max must be greater than min',
    }),
  timeInterval: z.coerce.number().positive(),
  duration: z.coerce.number().gte(5),
})

const FlowSettings = () => {
  const { init } = useActions()
  const navigate = useNavigate()
  const form = useAppForm({
    defaultValues: {
      range: {
        min: 1,
        max: 9,
      },
      quantity: {
        min: 3,
        max: 6,
      },
      timeInterval: 1,
      duration: 7,
    } as z.infer<typeof flowSettingsSchema>,
    validators: { onChange: flowSettingsSchema },
    onSubmit: ({ value: difficulty }) => {
      init(difficulty)
      navigate({ to: '/app/practice/flow' })
    },
  })

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Flow Settings</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <div>
          <label className="text-sm font-medium mb-2 block">Number Range</label>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">From</p>
              <form.AppField
                name="range.min"
                children={(field) => <field.TextField type="number" />}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">To</p>
              <form.AppField
                name="range.max"
                children={(field) => <field.TextField type="number" />}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Quantity of Numbers
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Minimum</p>
              <form.AppField
                name="quantity.min"
                children={(field) => <field.TextField type="number" />}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Maximum</p>
              <form.AppField
                name="quantity.max"
                children={(field) => <field.TextField type="number" />}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Time Interval (seconds)
          </label>
          <form.AppField
            name="timeInterval"
            children={(field) => <field.TextField type="number" />}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Total Time (seconds)
          </label>
          <form.AppField
            name="duration"
            children={(field) => <field.TextField type="number" />}
          />
        </div>
        <Button className="w-full">
          <Play /> Start
        </Button>
      </form>
    </section>
  )
}

export default FlowSettings
