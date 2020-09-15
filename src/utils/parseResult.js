import ResultItemModel from '../components/model'

const parseResult = (result) => {
  const parsed = {
    id: result.madde_id,
    telaffuz: result.telaffuz ?? undefined,
    lisan: result.lisan ?? undefined,
    birlesikler: result.birlesikler
      ? result.birlesikler.split(', ').map((b) => ({ title: b, id: b }))
      : [],
    birlesiklerTest: result.birlesikler
      ? result.birlesikler
          .split(', ')
          .map((text) => new ResultItemModel('birlesikler', text, text))
      : [],
    atasozu: (result.atasozu ?? []).map((a) => ({
      id: a.madde_id,
      title: a.madde
    })),
    atasozuTest: (result.atasozu ?? []).map(
      (text) => new ResultItemModel('atasozu', text, text)
    ),
    anlamlar: (result.anlamlarListe ?? []).map((a) => ({
      id: a.anlam_id,
      anlam_sira: a.anlam_sira,
      anlam: a.anlam,
      ozellik: a.ozelliklerListe
        ? a.ozelliklerListe.map((o) => o.tam_adi).join(', ')
        : 'isim',
      ornek: (a.orneklerListe ?? []).map((o) => ({
        id: o.ornek_id,
        ornek: o.ornek,
        yazar: (o.yazar ?? []).map((y) => y.tam_adi).join(', ')
      }))
    }))
  }
  // console.log(parsed.birlesiklerTest)
  // console.log(parsed, 'parsed value')
  // console.log(parsed.birlesikler.length)
  // console.log(
  //   (parsed.telaffuz === undefined || parsed.lisan === '') &&
  //     parsed.birlesikler.length === 0 &&
  //     parsed.atasozu.length > 0
  // )

  return parsed
}

export default parseResult
