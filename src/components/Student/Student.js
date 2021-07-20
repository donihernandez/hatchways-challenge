import React, {useRef, useState} from 'react'
import './Student.css'
import { PlusSmIcon, MinusSmIcon, XIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

export const Student = ({ student, addTag, removeTag }) => {

    const [open, setOpen] = useState(false)
    const [tag, setTag] = useState('')
    const inputTag = useRef()

    const getAverage = () => {
        let total = 0;
        for (let i = 0; i < student.grades.length; i++) {
            total += parseFloat(student.grades[i])
        }
        return total / student.grades.length;
    }

    const addNewTag = (e) => {
        e.preventDefault()
        addTag(student.id, tag)
        inputTag.current.value = ''
    }

    return (
        <article className="student-item">
            <div className="student-item-img">
                <img src={student.pic} alt={student.firstName}/>
            </div>
            <div className="student-item-data">
                <div className="student-item-name">
                    <h2>{ student.firstName } { student.lastName }</h2>
                </div>
                <div className="student-item-description">
                    <p>Email: { student.email }</p>
                    <p>Company: { student.company }</p>
                    <p>Skill: { student.skill }</p>
                    <p>Average: { getAverage() }%</p>

                    <div className="student-item-tags">
                        {
                            student.tags.map((tag, index) => {
                                return (
                                    <div key={index} className="student-item-tag">
                                        <span>{ tag }</span> <XIcon style={{ cursor: 'pointer' }} height="15px" width="15px" onClick={() => removeTag(student.id, tag)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <form onSubmit={(e) => addNewTag(e)}>
                            <input ref={inputTag} type="text" className="student-item-tags-input" placeholder="Add a tag" onChange={(e) => setTag(e.target.value)}/>
                        </form>
                    </div>

                    {
                        open ?
                            student.grades.map((grade, index) => {
                                return (
                                    <div className="student-item-grade" key={index}>Test {index + 1}: { grade }%</div>
                                )
                            })
                            : ''
                    }

                </div>
            </div>
            <div className="student-item-details">
                {
                    open ? <MinusSmIcon height="60px" width="60px" onClick={() => setOpen(false)}/> : <PlusSmIcon height="60px" width="60px" onClick={() => setOpen(true)}/>
                }
            </div>
        </article>
    )
}

Student.propTypes = {
    student: PropTypes.object.isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
}