import React from 'react'

const CourseRow = ({course, index}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{course.name}</td>
      <td>{course.teacher_name}</td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        {course.status ? <button  data-toggle="modal"  title="Trash" className="pd-setting-ed" data-target={`#del` + index}><i className="fa fa-unlock" aria-hidden="true"></i></button>
        : <button  data-toggle="modal"  title="Trash" className="pd-setting-ed" data-target={`#del` + index}><i className="fa fa-lock" aria-hidden="true" style={{color: 'red'}}></i></button>}
      </td>
    </tr>
  )
}

export default CourseRow