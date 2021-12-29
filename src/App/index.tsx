import React from 'react'
import { Upload, Button } from '@douyinfe/semi-ui'
import { IconUpload } from '@douyinfe/semi-icons'

const App = () => {
  return (
    <Upload action=''>
      <Button icon={<IconUpload />}>
        上传 *.gltf/*.glb
      </Button>
    </Upload>
  )
}

export default App
