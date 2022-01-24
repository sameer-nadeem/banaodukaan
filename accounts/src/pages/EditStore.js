import React from 'react'
import EditStoreForm from '../components/Forms/EditStoreForm'
const EditStore = () => {
  //form rendered from the components/forms directory
  return (
    <div style={{
      width: "100%",
      padding: 70,
    }}>
      <EditStoreForm />
    </div>
  )
}

export default EditStore
