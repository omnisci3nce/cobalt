import { useForm } from '@mantine/form'
import { Button, Textarea, TextInput, InputWrapper, Box, Stack, Progress, useMantineTheme, Group, Text } from '@mantine/core'
import { useState } from 'react'
import { createVideo, uploadVideo } from '../services/videos.service'
import { useMutation, useQueryClient } from 'react-query'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
console.log(IMAGE_MIME_TYPE)

interface FormValues {
  name: string;
  description: string;
  file: File | undefined; // values that may be undefined cannot be inferred
}

// const dropzoneChildren = (status: DropzoneStatus) => (
//   <Group position="center" spacing="xl" style={{ minHeight: 80, pointerEvents: 'none' }}>
//     {/* <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} /> */}
//     <div>
//       <Text size='lg'>{status.accepted ? 'File ready' : 'Drag images here or click to select files'}</Text>
//     </div>
//   </Group>
// )

export default function UploadForm({ onSuccess } : { onSuccess: () => void }) {
  // const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null) // TODO: use react-query mutation?
  const theme = useMantineTheme()

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
    console.log(values)
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
            {/* <Dropzone
              onDrop={(files) => {
                console.log(files)
                form.setFieldValue('file', files[0])
              }}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={3 * 1024 ** 3}
              accept={['video/mp4']}
            >
              {(status) => dropzoneChildren(status)}
            </Dropzone> */}
            <input type='file' onChange={(event) => event.target.files && form.setFieldValue('file', event.target.files[0])} />
          </InputWrapper>


          <Button type='submit' color='gray'>Submit</Button>
          {uploadProgress && <Progress value={uploadProgress} label={`${uploadProgress}%`} size='lg' />}
        </Stack>
      </form>

    </Box>
  )
}