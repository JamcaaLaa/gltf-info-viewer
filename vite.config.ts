import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import usePluginImports from 'vite-plugin-importer'

export default defineConfig({
  base: '/gltf-info-viewer/',
  plugins: [
    reactRefresh(),
    usePluginImports({
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    })
  ]
})
