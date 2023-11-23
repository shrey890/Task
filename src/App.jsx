import { useEffect, useState } from "react"
const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('formData')) || [])
  const [editIndex, setEditIndex] = useState(null)
  const [inputs, setInputs] = useState({ name: '', email: '', phone: '' })
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data))
  }, [data])
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex === null) {
      setData([...data, inputs]);
    } else {
      const newData = [...data]
      newData[editIndex] = inputs
      setData(newData)
      setEditIndex(null)
    }
    setInputs({ name: '', email: '', phone: '' })
  };
  const handleDelete = (index) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }
  const handleEdit = (index) => {
    setInputs(data[index])
    setEditIndex(index)
  }
  return (
    <div style={ { marginLeft: '450px' } }>
      <form onSubmit={ handleSubmit }>
        <input type="text" id="name" required placeholder="name" value={ inputs.name } onChange={ e => setInputs({ ...inputs, name: e.target.value }) } />
        <br /><br />
        <input type="email" id="email" required placeholder="email" value={ inputs.email } onChange={ e => setInputs({ ...inputs, email: e.target.value }) } />
        <br /><br />
        <input type="text" id="phone" required placeholder="Phone No." value={ inputs.phone } onChange={ e => setInputs({ ...inputs, phone: e.target.value }) } />
        <br /><br />
        <button>{ editIndex === null ? 'Submit' : 'Update' }</button>
      </form>
      <br />
      <table cellPadding='3' cellSpacing='5' border='3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { data.map((item, index) => (
            <tr key={ index }>
              <td>{ item.name }</td>
              <td>{ item.email }</td>
              <td>{ item.phone }</td>
              <td>
                <button onClick={ () => handleEdit(index) }>Edit</button>
                <button onClick={ () => handleDelete(index) }>Delete</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
export default App
