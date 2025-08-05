'use client'

import { useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

export default function IceCreamForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    flavor: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const res = await fetch('/api/ice-cream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await res.json()

    if (!res.ok) {
      alert(`Error: ${result.error}`)
      return
    }

    alert(result.message)
    // Optionally reset the form
    setFormData({ name: '', date: '', flavor: '' })
  } catch (err) {
    alert('Something went wrong')
    console.error(err)
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Favorite Ice Cream Flavor
        </label>
        <RadioGroup.Root
          name="flavor"
          value={formData.flavor}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, flavor: value }))}
          className="flex flex-col space-y-2"
          required
        >
          {['Vanilla', 'Chocolate', 'Strawberry'].map((flavor) => (
            <div key={flavor} className="flex items-center space-x-2">
              <RadioGroup.Item
                value={flavor}
                id={flavor}
                className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-transparent"
              />
              <label htmlFor={flavor} className="text-sm text-gray-700">
                {flavor}
              </label>
            </div>
          ))}
        </RadioGroup.Root>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  )
}
