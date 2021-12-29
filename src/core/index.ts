/**
 * 解析一段 ArrayBuffer 为 string
 * @param arr 
 * @param start 
 * @param length 
 * @returns 
 */
export const arrayBuffer2String = (
  arr: ArrayBuffer,
  start: number,
  length: number = -1
) => {
  if (length === -1) {
    length = arr.byteLength
  }

  const strSlice = arr.slice(start, start + length)
  if (TextDecoder) {
    const decoder = new TextDecoder()
    return decoder.decode(strSlice)
  } else {
    const charArr: string[] = []
    const u32Arr = new Uint8Array(strSlice)
    const u32Length = u32Arr.length
    for (let i = 0; i < u32Length; i++) {
      charArr.push(String.fromCharCode(u32Arr[i]))
    }
    return charArr.join('')
  }
}

/**
 * 根据 DataView 中两个高低位的 u32 数值读取 u64 数值
 * @param dv 
 * @param byteOffset 从何处读起
 * @param littleEndian 是否读小端序，默认小端序
 * @returns 
 */
export const getUint64 = (
  dv: DataView,
  byteOffset: number,
  littleEndian: boolean = true
) => {
  const left = dv.getUint32(byteOffset, littleEndian)
  const right = dv.getUint32(byteOffset + 4, littleEndian)
  const combined = littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right

  if (!Number.isSafeInteger(combined))
    console.warn(combined, '已超过最大安全整数，精度可能丢失')

  return combined;
}

export const getGlbHeader = (buffer: ArrayBuffer) => {
  const magic = arrayBuffer2String(buffer, 0, 4)
  if (magic !== 'glTF') {
    throw '不是 glTF 格式'
  }

  const dataView = new DataView(buffer)
  const versionNumber = dataView.getUint32(4, true)
  const glbByteLength = dataView.getUint32(8, true)

  return {
    magic,
    versionNumber,
    glbByteLength
  }
}

export const getGltfObjFromGlb = (glbBuffer: ArrayBuffer) => {
  const dataView = new DataView(glbBuffer)
  const chunk0ByteLength = dataView.getUint32(12, true)
  // const chunk0Type = dataView.getUint32(16, true)
  const chunk0JSONStr = arrayBuffer2String(glbBuffer, 20, chunk0ByteLength)
  const gltfObj = JSON.parse(chunk0JSONStr)
  return gltfObj
}

export const getBinaryDataFromGlb = (glbBuffer: ArrayBuffer) => {
  const dataView = new DataView(glbBuffer)
  const chunk0ByteLength = dataView.getUint32(12, true)
  const chunk1ByteLength = dataView.getUint32(20 + chunk0ByteLength, true)
  const start = 20 + chunk0ByteLength + 8
  const end = start + chunk1ByteLength
  const chunk1Data = glbBuffer.slice(start, end)
  return chunk1Data
}

export const saveGlb2Gltf = (glbBuffer: ArrayBuffer) => {
  
}
