import React, {useEffect, useState} from 'react'
import {Student} from "../Student/Student"

import './StudentsList.css'
import axios from "axios";
import {Loading} from "../Loading/Loading";

export const StudentsList = () => {
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filtered, setFiltered] = useState([])
    const [filterType, setFilterType] = useState('')

    const loadStudents = async () => {
        setLoading(true)
        const results = await axios.get('https://www.hatchways.io/api/assessment/students')
        const studentsList = results.data.students.map(student => {
            if (!student.tags) {
                student['tags'] = []
            }
            return student
        })
        setStudents(studentsList)
        setFiltered(studentsList)
        setLoading(false)
    }

    useEffect(async () => {
       await loadStudents()
    }, [])

    useEffect(() => {
        if (filterType === 'name') {
            setFiltered(searchByName(search))
        } if (filterType === 'tag') {
            setFiltered(searchByTag(search))
        } if (search === '') {
            setFilterType('')
            setFiltered(students)
        }
    }, [search, filterType]);

    const searchByName = () => {
        return students.filter((student) => {
            const fullName = `${student.firstName} ${student.lastName}`
            if (fullName.toLowerCase().includes(search.toLowerCase())) {
                return student
            }
        })
    }

    const searchByTag = () => {
        const results = students.filter((student) => {
            if (student.tags.length > 0) {
                for (let i = 0; i < student.tags.length; i++) {
                    if (student.tags[i].toLowerCase().includes(search.toLowerCase())) {
                        return student
                    }
                }
            }
        })

        return results
    }

    const addTag = (id, tag) => {
        const founded = students.find(student => student.id === id)

        if (!founded.tags) {
            founded['tags'] = [tag]
        } else {
            founded.tags.push(tag)
        }

        setStudents(
            students.map((student, index) => {
                return student.id === id ? founded : student
            }))
    }

    const removeTag = (id, tag) => {
        const founded = students.find(student => student.id === id)

        for (let i = 0; founded.tags.length; i++) {
            if (founded.tags[i] === tag) {
                founded.tags.splice(i, 1)
            }
        }

        setStudents(
            students.map((student, index) => {
                return student.id === id ? founded : student
            }))
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <section className='card'>
                <div className='card-header'>
                    <input data-testid="searchByName" type="text" className="search-input" placeholder="Search by name" onChange={(e) => {
                        setSearch(e.target.value)
                        setFilterType('name')
                    }}/>

                    <input type="text" className="search-input" placeholder="Search by tag" onChange={(e) => {
                        setSearch(e.target.value)
                        setFilterType('tag')
                    }}/>
                </div>

                <div className='card-body'>
                    {
                        filtered.map((student) => {
                            return (
                                <div
                                    data-testid={`student-${student.id}`}
                                    key={student.id}>
                                    <Student student={student} addTag={addTag} removeTag={removeTag} />
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}