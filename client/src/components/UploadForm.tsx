import { useForm } from '@mantine/form'
import { Button, Textarea, TextInput, InputWrapper, Box, Stack, Progress } from '@mantine/core'
import { useState } from 'react'
import { createVideo, uploadVideo } from '../services/videos.service'
import { useMutation, useQueryClient } from 'react-query'

interface FormValues {
  name: string;
  description: string;
  file: File | undefined; // values that may be undefined cannot be inferred
}

export default function UploadForm({ onSuccess } : { onSuccess: () => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)

  const queryClient = useQueryClient()
  const createMutation = useMutation(createVideo)

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      file: undefined
    },
    validate: {
      name: (value) => (value.length <= 2 ? 'Video name must be over 2 characters' : value.length > 64 ? 'Video name must be 64 characters or less' : null)
    }
  })


  const onSubmitForm = async (values: FormValues) => {
    if (!values.file) {
      throw Error('You must provide a file to upload')
    }
    // Create video entity
    const videoId = await createMutation.mutateAsync({ name: values.name, description: values.description })
    console.log(`Created video with id: ${videoId}`)

    // Start file upload
    await uploadVideo(videoId, values.file, setUploadProgress)
    console.log('Finished file upload')

    queryClient.invalidateQueries('videos')
    onSuccess()
  }

  return (
    <Box p='md'>
      <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
        <Stack >

          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps('name')}
            required
          />
          <Textarea label='Description' />
          <InputWrapper label='File' required>
            <input type='file' onChange={(event) => event.target.files && form.setFieldValue('file', event.target.files[0])} />
          </InputWrapper>
          <Button type='submit' color='gray'>Submit</Button>
          {uploadProgress && <Progress value={uploadProgress} label={`${uploadProgress}%`} size='lg' />}
        </Stack>
      </form>

    </Box>
  )
}