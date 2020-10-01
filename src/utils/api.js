const BASE_URL = 'https://sozluk.gov.tr'
const autoCompleteUrl = 'https://sozluk.gov.tr/autocomplete.json'

const getHomeData = async () => {
  const response = await fetch(`${BASE_URL}/icerik`)
  const pureHomeData = await response.json()
  return await pureHomeData
}

const getDetailData = async (keyword) => {
  const response = await fetch(`${BASE_URL}/gts?ara=${keyword}`)
  const pureDetailData = await response.json()
  return pureDetailData
}

const getSoundCode = async (k) => {
  const response = await fetch(`${BASE_URL}/yazim?ara=${k}`)
  const data = await response.json()
  return await data
}

const getAtasozuDeyim = async (k) => {
  const response = await fetch(`${BASE_URL}/atasozu?ara=${k}`)
  const data = await response.json()
  return data
}

const getWordsList = async (keyword) => {
  const response = await fetch(autoCompleteUrl)
  const d = await response.json()
  const data = d.map((item, index) => ({ ...item, id: index }))
  const f = data.filter((item) => {
    return item.madde.startsWith(keyword.toLocaleLowerCase('tr'))
  })
  return f
}

export {
  getDetailData,
  getHomeData,
  getSoundCode,
  getAtasozuDeyim,
  getWordsList
}
