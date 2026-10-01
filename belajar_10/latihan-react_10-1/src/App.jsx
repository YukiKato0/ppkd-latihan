import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import DataPeserta from './components/DataPeserta'
import { Peserta } from './components/isiData'
import FormPeserta from './components/FormPeserta'
import './App.css'

function App () {
  const [count, setCount] = useState(0)
  const [isPeserta, setIsPeserta] = useState(Peserta)
  const [isPesertaEdit, setPesertaEdit] = useState(null)

  const handleSimpan = dataForm => {
    if (isPesertaEdit) {
      setIsPeserta(prev =>
        prev.map(item => (item.id === isPesertaEdit.id ? dataForm : item))
      )
      setPesertaEdit(undefined)
    } else {
      const dataBaru = { ...dataForm, id: Date.now() }
      setIsPeserta(prev => [...prev, dataBaru])
    }
  }

  const handleStartEdit = item => {
    setPesertaEdit(item)
  }

  const handleHapus = id => {
    setIsPeserta(prev => prev.filter(p => p.id !== id))

    if (isPesertaEdit?.id === id) {
      setPesertaEdit(undefined)
    }
  }

  return (
    <>
      <section id='center'>
        <div className='hero'>
          <img src={heroImg} className='base' width='170' height='179' alt='' />
          <img src={reactLogo} className='framework' alt='React logo' />
          <img src={viteLogo} className='vite' alt='Vite logo' />
        </div>

        <FormPeserta
          key={isPesertaEdit?.id || 'form-tambah'}
          onSimpan={handleSimpan}
          pesertaEdit={isPesertaEdit}
        />

        <div style={{ width: '100%' }}>
          {isPeserta.map(item => (
            <DataPeserta
              key={item.id}
              peserta={item}
              onEdit={() => handleStartEdit(item)}
              onHapus={handleHapus}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type='button'
            className='counter'
            onClick={() => setCount(count => count + 1)}
          >
            Tambah {count}
          </button>
          <button
            type='button'
            className='counter'
            disabled={count === 0}
            onClick={() => setCount(count => count - 1)}
          >
            Kurang {count}
          </button>
          <button
            type='button'
            className='counter'
            disabled={count === 0}
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </section>
    </>
  )
}

export default App
