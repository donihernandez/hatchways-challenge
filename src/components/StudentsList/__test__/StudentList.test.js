import React from 'react'
import { render, screen} from '@testing-library/react'
import { StudentsList } from '../StudentsList'
import "@testing-library/jest-dom/extend-expect"
import axios from 'axios'
import {BrowserRouter} from "react-router-dom";

const MockStudentsList = () => {
    return (
        <BrowserRouter>
            <StudentsList />
        </BrowserRouter>
    )
}

describe('Students List Component', () => {
    test('Should check when no data if there is a loading component', () => {
        render(<StudentsList />)
        const loadingElement = screen.getByText('Loading...')
        expect(loadingElement).toBeInTheDocument()
    })

    test('Should check if the student list is loading correctly', async () => {
        render(<MockStudentsList />)
        const studentDivElement = await screen.findByTestId('student-1')
        expect(studentDivElement).toBeInTheDocument()
    })
})