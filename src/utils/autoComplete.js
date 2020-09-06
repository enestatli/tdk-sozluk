import * as autoComplete from '../assets/autocomplete.json'

const data = autoComplete.data.map((item, index) => ({ ...item, id: index }))

const getSuggestions = (keyword) => {
  return data.filter((item) =>
    item.madde.includes(keyword.toLocaleLowerCase('tr'))
  )
}

export { getSuggestions }
