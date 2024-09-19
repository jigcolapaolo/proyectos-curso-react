import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as expected', async () => {
    const user = userEvent.setup()  // Inicializar usuario simulado
    const app = render(<App />)

    const textareaFrom = app.getByPlaceholderText('Introducir texto')

    // El usuario ingresa 'Hola mundo', deberia mostrarse 'Hello world
    await user.type(textareaFrom, 'Hola mundo')
    const result = await app.findAllByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

    expect(result).toBeTruthy()
})