export default function DataPeserta ({ peserta, onEdit, onHapus }) {
  return (
    <div
      style={{
        border: '1px solid white',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        boxShadow: '0 0 6px white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>
          {peserta.nama}
        </h3>
        <p>{peserta.jurusan}</p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px'
        }}
      >
        <button onClick={() => onEdit(peserta.id)}>Edit</button>
        <button onClick={() => onHapus(peserta.id)}>Hapus</button>
      </div>
    </div>
  )
}
