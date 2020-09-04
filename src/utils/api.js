const BASE_URL = 'https://sozluk.gov.tr'

const getHomeData = async () => {
  const response = await fetch(`${BASE_URL}/icerik`)
  const pureHomeData = await response.json()
  return await pureHomeData
}

const getDetailData = async (keyword) => {
  const response = await fetch(`${BASE_URL}/gts/ara=${keyword}`)
  const pureDetailData = await response.json()
  return await pureDetailData
}

export { getDetailData, getHomeData }
