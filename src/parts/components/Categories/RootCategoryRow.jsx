import React from 'react'
import AddEditCategoryModal from '../Modals/AddEditCategoryModal'
import DeleteCategoryModal from '../Modals/DeleteCategoryModal'

const RootCategoryRow = () => {
  return (
    <tr>
      <td>1</td>
      <td>Web Development Book</td>
      {/* Xem danh sách lĩnh vực con với href chính là index của lĩnh vực cha*/}
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <a role="button" data-toggle="collapse" data-parent="#accordion"
          href="#1" aria-expanded="true" aria-controls="collapse0">
          <i class="fa fa-eye" aria-hidden="true"></i>
        </a>
      </td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <button data-toggle="modal" title="Edit" className="pd-setting-ed" data-target="#PrimaryModalalert"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <AddEditCategoryModal />
        <button data-toggle="modal" title="Trash" className="pd-setting-ed" data-target="#WarningModalalert"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        <DeleteCategoryModal />
      </td>
    </tr>
  )
}

export default RootCategoryRow