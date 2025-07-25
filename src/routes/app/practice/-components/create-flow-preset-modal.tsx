import Spinner from '@/components/spinner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAppForm } from '@/hooks/form'
import { api } from '@convex/_generated/api'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

interface CreateFlowPresetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const casualPresetSchema = z.object({
  name: z.string().min(3).max(15),
  range: z.object({
    min: z.coerce.number().positive(),
    max: z.coerce.number().positive(),
  }).refine(data => data.max > data.min, { message: 'Max must be greater than min'}),
  quantity: z.object({
    min: z.coerce.number().gt(3),
    max: z.coerce.number().gt(3),
  }).refine(data => data.max > data.min, { message: 'Max must be greater than min'}),
  timeInterval: z.coerce.number().positive(),
  duration: z.coerce.number().gte(5),
})

const parseNumericValues = (values: z.infer<typeof casualPresetSchema>) => {
  return {
    ...values,
    range: {
      min: Number(values.range.min),
      max: Number(values.range.max),
    },
    quantity: {
      min: Number(values.quantity.min),
      max: Number(values.quantity.max),
    },
    timeInterval: Number(values.timeInterval),
    duration: Number(values.duration),
  };
};

const CreateFlowPresetModal = ({
  open,
  onOpenChange,
}: CreateFlowPresetModalProps) => {
  const createCasualPreset = useMutation(api.presets.createPreset)
  const [isCreating, setIsCreating] = useState(false)
  const form = useAppForm({
    defaultValues: {
      name: '',
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
    } as z.infer<typeof casualPresetSchema>,
    validators: { onChange: casualPresetSchema }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="dialog"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Create New Preset</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const values = parseNumericValues(form.state.values)
            console.log(values);
            
            try {
              setIsCreating(true)
              await createCasualPreset({ ...values, type: 'flow' })
              toast.success('Preset created successfully')
              onOpenChange(false)
              setIsCreating(false)
            } catch {
              setIsCreating(false)
              toast.error('Unable to create preset')
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <form.AppField
              name="name"
              children={(field) => <field.TextField type="text" />}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Number Range
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">From</p>
                <form.AppField
                  name="range.min"
                  children={(field) => <field.TextField inputMode='numeric' type="number" />}
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

          <form.AppForm>
            <form.SubscribeButton className="w-full">
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Creating...
                </div>
              ) : (
                'Create'
              )}
            </form.SubscribeButton>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFlowPresetModal
