import { useState } from 'react'

export default function FormPeserta ({ onSimpan, pesertaEdit }) {
  const [namaPeserta, setNamaPeserta] = useState(pesertaEdit?.nama || '')
  const [jurusanPeserta, setJurusanPeserta] = useState(
    pesertaEdit?.jurusan || ''
  )

  const handleSimpan = e => {
    e.preventDefault()

    onSimpan({
      nama: namaPeserta,
      jurusan: jurusanPeserta
    })

    setNamaPeserta('')
    setJurusanPeserta('')
  }

  return (
    <>
      <h3>{pesertaEdit ? 'Edit Peserta' : 'Tambah Peserta'}</h3>

      <form
        onSabmit={handleSimpan}
        method='post'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      >
        <input
          type='text'
          value={namaPeserta}
          onChange={e => {
            setNamaPeserta(e.target.value)
          }}
          placeholder='Nama Peserta'
        />
        <input
          type='text'
          value={jurusanPeserta}
          onChange={e => {
            setJurusanPeserta(e.target.value)
          }}
          placeholder='Jurusan'
        />
        <button type='submit' className='counter' onClick={handleSimpan}>
          {pesertaEdit ? 'Edit' : 'Simpan'}
        </button>
      </form>
    </>
  )
}
